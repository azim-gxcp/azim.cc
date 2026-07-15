#!/usr/bin/env bash
# Deploy the azim.cc API server to production (Hostinger VPS, AlmaLinux 10).
#
# Reality (verified 2026-07-15):
#   - Code lives at /var/www/azim.cc/server (root-owned).
#   - The API runs under the systemd unit `azim-api.service` (NOT pm2), listening
#     on 127.0.0.1:3001, fronted by nginx at https://api.azim.cc.
#   - The remote steps need root (root-owned files + systemctl), so the SSH user
#     must be root or able to run passwordless sudo.
#
# Requires SSH access to $DEPLOY_HOST (default: vps5 — see ~/.ssh/config).
# Note: from networks where outbound port 22 is blocked, run this from a
# Hostinger Browser Terminal or a network with SSH egress.
#
# Env overrides:
#   DEPLOY_HOST   - SSH host alias (default: vps5)
#   PROJECT_DIR   - project root on the server (default: /var/www/azim.cc)
#   API_BASE      - public API base URL for verification (default: https://api.azim.cc)
set -euo pipefail

HOST="${DEPLOY_HOST:-vps5}"
API_BASE="${API_BASE:-https://api.azim.cc}"
PROJECT_DIR="${PROJECT_DIR:-/var/www/azim.cc}"

echo "==> Deploying to $HOST ($PROJECT_DIR)"

ssh -o BatchMode=yes "$HOST" "PROJECT_DIR='$PROJECT_DIR' bash -s" <<'REMOTE'
set -euo pipefail

PROJ="${PROJECT_DIR:-/var/www/azim.cc}"

# Fall back to a search if the expected path is missing.
if [ ! -d "$PROJ/server" ]; then
  echo "WARN: $PROJ/server not found; searching for the azim-cc-api project..." >&2
  FOUND=$(grep -rl '"azim-cc-api"' /var/www /srv /opt /root /home 2>/dev/null \
    --include=package.json | head -1 | xargs -r dirname | sed 's:/server$::')
  [ -n "$FOUND" ] && PROJ="$FOUND"
fi

if [ ! -d "$PROJ/server" ]; then
  echo "ERROR: could not locate the azim.cc server on $(hostname)" >&2
  exit 1
fi
echo "Project: $PROJ"

# Privileged ops: the project is root-owned and systemctl needs root.
SUDO=""
if [ "$(id -u)" -ne 0 ]; then
  if sudo -n true 2>/dev/null; then
    SUDO="sudo -n"
  else
    echo "ERROR: not root and passwordless sudo is unavailable — run the deploy as root." >&2
    exit 1
  fi
fi

# Pull latest code if this is a git checkout; otherwise deploy the on-disk code.
# (Content/posts on this box are synced by a separate path, not necessarily git.)
if [ -d "$PROJ/.git" ]; then
  $SUDO git -C "$PROJ" pull --ff-only || echo "WARN: git pull failed; continuing with on-disk code" >&2
else
  echo "No .git at $PROJ — deploying on-disk code as-is."
fi

cd "$PROJ/server"
$SUDO npm install
$SUDO npm run build

# Restart the systemd service and confirm it came back up.
$SUDO systemctl restart azim-api
sleep 2
if $SUDO systemctl is-active --quiet azim-api; then
  echo "Restarted via systemd: azim-api (active)"
else
  echo "ERROR: azim-api is not active after restart. Recent logs:" >&2
  $SUDO systemctl status azim-api --no-pager -l | head -20 >&2
  $SUDO journalctl -u azim-api -n 30 --no-pager >&2 || true
  exit 1
fi
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
elif [ "$PROBE" = "502" ]; then
  echo "==> FAIL: 502 from nginx — the API process is down. Check: journalctl -u azim-api -n 50" >&2
  exit 1
else
  echo "==> WARN: unexpected status $PROBE — check server logs (journalctl -u azim-api)." >&2
  exit 1
fi
