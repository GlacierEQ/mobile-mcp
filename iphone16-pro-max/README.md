# iPhone 16 Pro Max — Full Device Access Config

This folder contains APEX-tuned configuration, profiles, and prompt templates for full-access automation of the **iPhone 16 Pro Max** via the `mobile-mcp` server.

Targeted at Casey Barton's GlacierEQ APEX stack — bridging `mobile-mcp`, `apex-fs-commander`, and Apple MCP patterns for complete device orchestration.

---

## Device Specs (iPhone 16 Pro Max)

| Property | Value |
|---|---|
| Screen Resolution | 2868 × 1320 px |
| Logical Resolution | 956 × 440 pt |
| Scale Factor | 3× |
| Safe Area Insets | top: 59pt, bottom: 34pt |
| OS | iOS 18.x |
| WebDriverAgent port | 8100 (default) |
| USB / WiFi | Both supported |

---

## Folder Structure

```
iphone16-pro-max/
├── README.md                  ← this file
├── device-profile.json        ← device constants + safe zone coords
├── mcp-config.json            ← drop-in mcpServers config for Claude/Cursor/etc
├── wda-setup.sh               ← WebDriverAgent bootstrap for real device
├── apex-prompts/
│   ├── full-access.md         ← master prompt for unrestricted device control
│   ├── file-system.md         ← filesystem access via Apple Files + shortcuts
│   ├── media-capture.md       ← camera, mic, screen record automation
│   └── legal-workflow.md      ← Kekoa case workflow prompts (APEX)
└── src/
    └── iphone16promax.ts      ← extended iOS driver with Pro Max screen constants
```

---

## Quick Start

### 1. Install WebDriverAgent on device

```bash
bash iphone16-pro-max/wda-setup.sh
```

### 2. Drop in MCP config

Copy `mcp-config.json` into your Claude Desktop / Cursor MCP settings.

### 3. Connect and verify

```bash
# List devices — should show your iPhone 16 Pro Max
npx @mobilenext/mobile-mcp@latest --list-devices
```

### 4. Run APEX full-access prompt

Open your MCP client and paste the contents of `apex-prompts/full-access.md`.

---

## APEX Integration Notes

- Device UDID is read from `device-profile.json` at runtime — update it after first connection
- All coordinate constants are pre-calculated for the 2868×1320 physical pixel grid
- Safe area insets are baked in so taps never land in the Dynamic Island or home indicator zone
- `legal-workflow.md` contains pre-built prompt chains for case 1FDV-23-0001009 document workflows
