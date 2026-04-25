#!/usr/bin/env bash
# Deploy the API server to production.
#
# Requires SSH access to $DEPLOY_HOST (default: vps5 — see ~/.ssh/config).
# Note: from networks where outbound port 22 is blocked, run this from a
# Hostinger Browser Terminal or a network with SSH egress.
#
# Env overrides:
#   DEPLOY_HOST   - SSH host alias (default: vps5)
#   API_BASE      - public API base URL for verification (default: https://api.azim.cc)
set -euo pipefail

HOST="${DEPLOY_HOST:-vps5}"
API_BASE="${API_BASE:-https://api.azim.cc}"

echo "==> Deploying to $HOST"

ssh -o BatchMode=yes "$HOST" bash -s <<'REMOTE'
set -euo pipefail

# Locate the project. Try common paths, then fall back to a search.
PROJ=""
for c in ~/azim.cc /srv/azim.cc /opt/azim.cc /home/dev-azim/azim.cc; do
  if [ -f "$c/server/package.json" ] && grep -q '"azim-cc-api"' "$c/server/package.json"; then
    PROJ="$c"
    break
  fi
done

if [ -z "$PROJ" ]; then
  PROJ=$(grep -rl '"azim-cc-api"' ~ /srv /opt 2>/dev/null --include=package.json \
    | head -1 | xargs -r dirname | sed 's:/server$::')
fi

if [ -z "$PROJ" ] || [ ! -d "$PROJ/server" ]; then
  echo "ERROR: could not locate azim-cc-api project on $(hostname)" >&2
  exit 1
fi

echo "Project: $PROJ"
cd "$PROJ"
git pull --ff-only

cd server
npm install
npm run build

# Restart. Prefer a pm2 app matching azim/api; fall back to systemd; else fail.
if command -v pm2 >/dev/null 2>&1; then
  TARGET=$(pm2 jlist 2>/dev/null | grep -oE '"name":"[^"]+"' | sed 's/"name":"//;s/"$//' | grep -iE 'azim|api' | head -1 || true)
  if [ -n "$TARGET" ]; then
    pm2 restart "$TARGET" --update-env
    echo "Restarted via pm2: $TARGET"
    exit 0
  fi
fi

UNIT=$(systemctl list-units --type=service --state=running --no-legend 2>/dev/null \
  | awk '/azim|api-azim/ {print $1; exit}')
if [ -n "$UNIT" ]; then
  sudo -n systemctl restart "$UNIT" \
    || { echo "ERROR: 'sudo systemctl restart $UNIT' needs an interactive password — restart manually" >&2; exit 1; }
  echo "Restarted via systemd: $UNIT"
  exit 0
fi

echo "ERROR: no pm2 or systemd unit detected. Restart the API process manually." >&2
exit 1
REMOTE

echo "==> Verifying"
sleep 2
PROBE=$(curl -s -o /dev/null -w "%{http_code}" -X POST \
  "$API_BASE/api/admin/subscribers/00000000-0000-0000-0000-000000000000/activate")
echo "POST /api/admin/subscribers/.../activate -> $PROBE (expect 401)"

if [ "$PROBE" = "401" ]; then
  echo "==> Deploy verified."
elif [ "$PROBE" = "404" ]; then
  echo "==> FAIL: route still missing. Build or restart did not pick up new code." >&2
  exit 1
else
  echo "==> WARN: unexpected status $PROBE — check server logs." >&2
  exit 1
fi
