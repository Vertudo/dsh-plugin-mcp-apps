#!/bin/sh
# Install dsh-plugin-mcp-apps on another machine, from npm, a git URL or a tarball.
#
#   sh scripts/install-remote.sh                            # npm, profile web
#   sh scripts/install-remote.sh dsh-plugin-mcp-apps web
#   sh scripts/install-remote.sh https://github.com/xiaoqin422/dsh-plugin-mcp-apps web
#   sh scripts/install-remote.sh ./dsh-plugin-mcp-apps-0.5.6.tgz web
#
# Needs a DSH install (`dsh` on PATH). Does the same three things as
# scripts/install.sh: pnpm add through the official forwarder, register the
# bundle in `dsh.profile.bundles`, and drop a legacy hand-written insert so the
# plugin cannot be composed twice. Restart dsh yourself afterwards.
set -eu

SPEC=${1:-dsh-plugin-mcp-apps}
PROFILE=${2:-${DSH_PROFILE:-web}}
DSH_HOME=${DSH_HOME:-/data}
PROFILE_DIR="$DSH_HOME/profiles/$PROFILE"
PKG=dsh-plugin-mcp-apps

command -v dsh >/dev/null 2>&1 || { echo "dsh is not on PATH: install DSH first" >&2; exit 2; }
if [ ! -f "$PROFILE_DIR/package.json" ]; then
	echo "==> initializing profile '$PROFILE'"
	dsh plugin --profile "$PROFILE" --help >/dev/null 2>&1 || true
fi
[ -f "$PROFILE_DIR/package.json" ] || { echo "profile '$PROFILE' could not be initialized at $PROFILE_DIR" >&2; exit 2; }

STAMP=$(date +%Y%m%d-%H%M%S)
cp -a "$PROFILE_DIR/package.json" "$PROFILE_DIR/package.json.bak-$STAMP"

echo "==> dsh plugin --profile $PROFILE add $SPEC"
dsh plugin --profile "$PROFILE" add "$SPEC"

echo "==> register $PKG in dsh.profile.bundles"
node - "$PROFILE_DIR/package.json" "$PKG" <<'NODE'
const fs = require("fs");
const [file, name] = process.argv.slice(2);
const data = JSON.parse(fs.readFileSync(file, "utf8"));
data.dsh = data.dsh || {};
data.dsh.profile = data.dsh.profile || {};
if (!Array.isArray(data.dsh.profile.bundles)) data.dsh.profile.bundles = [];
if (!data.dsh.profile.bundles.includes(name)) data.dsh.profile.bundles.push(name);
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
NODE

echo
echo "installed into profile '$PROFILE'. restart dsh to load it:"
echo "  docker restart dsh     # or however this host runs dsh"
echo "  then hard-reload the browser page"
echo "backup: $PROFILE_DIR/package.json.bak-$STAMP"