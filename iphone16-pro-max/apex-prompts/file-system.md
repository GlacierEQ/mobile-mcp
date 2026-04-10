# APEX File System Access — iPhone 16 Pro Max

Prompts for navigating the on-device file system via the **Files app**, **Shortcuts**, and **iCloud Drive** through the MCP server.

---

## Access iOS File System via Files App

```
Using mobile-mcp on iPhone 16 Pro Max:

1. Launch the Files app: mobile_launch_app with bundleId "com.apple.DocumentsApp"
2. Take a screenshot to see current state
3. Navigate to iCloud Drive / On My iPhone as needed
4. Use mobile_list_elements_on_screen to read the file/folder tree
5. To copy a file path: long-press the file → Get Info → read the path from the info sheet

Target directories of interest:
- On My iPhone/: local device storage
- iCloud Drive/: synced cloud files
- Downloads/: browser downloads
- Shortcuts/: automation script outputs

Report the full folder tree from the root of "On My iPhone".
```

---

## Export File via AirDrop / Share Sheet

```
To export a file from iPhone 16 Pro Max:
1. Navigate to the file in Files app
2. Long press the file (mobile_long_press_on_screen_at_coordinates at the file element)
3. When share sheet appears, use mobile_list_elements_on_screen to find AirDrop / Copy
4. Tap AirDrop to send to Mac, or tap Copy to place in clipboard
5. Confirm completion with screenshot
```

---

## Run a Shortcut for File Operations

```
To run an iOS Shortcut that accesses the file system:
1. mobile_launch_app: com.apple.shortcuts
2. Locate the target shortcut by name using mobile_list_elements_on_screen
3. Tap the shortcut to run it
4. Monitor progress with periodic screenshots
5. Read the output/result from screen

Useful pre-built shortcuts for file access:
- "Save to Files" — saves clipboard content to a chosen path
- "Get File" — retrieves file contents and returns as text
- Custom APEX shortcuts can be triggered by name
```
