#!/bin/bash
# wda-setup.sh — Bootstrap WebDriverAgent on iPhone 16 Pro Max
# Part of GlacierEQ/mobile-mcp APEX device config
#
# Prerequisites:
#   - Xcode + Command Line Tools installed
#   - iPhone 16 Pro Max connected via USB and trusted
#   - Valid Apple Developer account (free or paid)

set -euo pipefail

BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${BLUE}[WDA]${NC} $1"; }
ok()  { echo -e "${GREEN}[OK]${NC}  $1"; }
warn(){ echo -e "${YELLOW}[WARN]${NC} $1"; }
die() { echo -e "${RED}[ERR]${NC}  $1"; exit 1; }

log "iPhone 16 Pro Max — WebDriverAgent Setup"
log "=========================================="

# 1. Check Xcode
if ! xcode-select -p &>/dev/null; then
  die "Xcode command line tools not found. Run: xcode-select --install"
fi
ok "Xcode: $(xcode-select -p)"

# 2. List connected devices
log "Connected iOS devices:"
xcrun xctrace list devices 2>&1 | grep -E '(iPhone|iPad)' || warn "No devices found — ensure USB trust is accepted"

# 3. Detect UDID
UDID=$(xcrun xctrace list devices 2>&1 | grep 'iPhone 16 Pro Max' | head -1 | grep -oE '[0-9A-Fa-f-]{25,}' | head -1 || true)
if [[ -z "$UDID" ]]; then
  warn "Could not auto-detect UDID. Set it manually in device-profile.json and mcp-config.json"
  warn "Run: xcrun xctrace list devices"
else
  ok "Detected UDID: $UDID"
  # Inject UDID into device-profile.json
  PROFILE="$(dirname "$0")/device-profile.json"
  if command -v jq &>/dev/null; then
    jq --arg udid "$UDID" '.device.udid = $udid' "$PROFILE" > /tmp/dp_tmp.json && mv /tmp/dp_tmp.json "$PROFILE"
    ok "Updated device-profile.json with UDID"
  else
    warn "jq not installed — update device-profile.json manually with UDID: $UDID"
  fi
fi

# 4. Install WDA via idb or xcodebuild
log "Checking for idb (Facebook IDB)..."
if command -v idb &>/dev/null; then
  ok "idb found: $(idb --version)"
  log "Connecting to device via idb..."
  idb connect "$UDID" 2>/dev/null || warn "idb connect failed — trying xcodebuild fallback"
else
  warn "idb not installed. Install with: brew tap facebook/fb && brew install idb-companion"
fi

# 5. WDA via appium or standalone
log "Checking for Appium WDA..."
if command -v appium &>/dev/null; then
  ok "Appium found: $(appium --version)"
  log "Appium XCUITest driver WDA will be used automatically"
else
  warn "Appium not found. mobile-mcp uses its own WDA bundled via mobilenext"
  log "The @mobilenext/mobile-mcp package bundles WDA — no separate install needed for basic use"
fi

# 6. Port forward
log "Setting up port forward: localhost:8100 → device:8100"
if [[ -n "$UDID" ]]; then
  # Kill existing iproxy on 8100
  pkill -f "iproxy 8100" 2>/dev/null || true
  if command -v iproxy &>/dev/null; then
    iproxy 8100 8100 "$UDID" &
    IPROXY_PID=$!
    ok "iproxy started (PID $IPROXY_PID) — port 8100 forwarded"
    echo $IPROXY_PID > /tmp/iproxy-iphone16pm.pid
  elif command -v cfgutil &>/dev/null; then
    warn "iproxy not found. Install libimobiledevice: brew install libimobiledevice"
  else
    warn "No USB port-forward tool found. Install: brew install libimobiledevice"
  fi
fi

# 7. Verify WDA health
log "Waiting for WDA to come online at localhost:8100..."
for i in {1..15}; do
  if curl -sf http://localhost:8100/status &>/dev/null; then
    ok "WDA is live at http://localhost:8100/status"
    break
  fi
  sleep 2
  echo -n "."
done

echo ""
log "Setup complete. Next steps:"
echo "  1. Run: npx @mobilenext/mobile-mcp@latest --list-devices"
echo "  2. Verify your UDID in device-profile.json and mcp-config.json"
echo "  3. Add mcp-config.json to your MCP client (Claude Desktop, Cursor, etc.)"
echo "  4. Use apex-prompts/full-access.md as your master orchestration prompt"
