# APEX Media Capture — iPhone 16 Pro Max

Prompts for controlling the camera, microphone, and screen recording on iPhone 16 Pro Max via MCP.

---

## Take a Photo via Camera App

```
Using mobile-mcp on iPhone 16 Pro Max:

1. mobile_launch_app: com.apple.camera
2. Wait 1500ms for camera to initialize (screenshot to confirm)
3. Ensure in Photo mode (use mobile_list_elements_on_screen to check mode selector)
4. Tap the shutter button — it's at approximately (478, 820) in portrait mode
   OR use mobile_list_elements_on_screen to find element with label "Take Photo"
5. Confirm photo was taken (thumbnail appears bottom-left at ~(40, 820))
6. Return to Files/Photos to retrieve the captured image

For burst/ProRAW/48MP: tap and hold the shutter button instead.
```

---

## Start Screen Recording

```
To start screen recording on iPhone 16 Pro Max:

1. Open Control Center: swipe down from top-right (936, 5) → (936, 300)
2. mobile_list_elements_on_screen — find "Screen Recording" button
3. Tap it (3-second countdown begins)
4. A red pill appears in the Dynamic Island when recording is active
5. To stop: tap the red Dynamic Island pill → confirm stop in dialog

Note: MCP screenshot tools will still work during screen recording.
Output is saved to Photos > Recents.
```

---

## Voice Memo / Audio Capture

```
To record audio via Voice Memos:

1. mobile_launch_app: com.apple.VoiceMemos
2. Screenshot to confirm app state
3. Tap the large red record button (center-bottom ~(478, 820))
4. Speak / capture audio
5. Tap stop (same button position when recording)
6. The recording auto-saves and appears in the list
7. To export: tap the recording → three-dot menu → Share
```
