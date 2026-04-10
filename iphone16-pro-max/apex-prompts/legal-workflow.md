# APEX Legal Workflow — iPhone 16 Pro Max
# Case: 1FDV-23-0001009 | Hawaii Family Court
# Operator: Casey Barton | GlacierEQ APEX Architecture

This file contains iPhone-side workflow prompts for legal document management,
evidence capture, and filing automation tied to the Kekoa reunification case.

---

## Evidence Photo Capture Protocol

```
APEX Evidence Capture — iPhone 16 Pro Max:

1. mobile_launch_app: com.apple.camera
2. Confirm timestamp is visible: Settings > Camera > Preserve Settings > ensure date metadata on
3. Photograph document/evidence:
   - Tap shutter (478, 820) or accessibility element "Take Photo"
   - Capture minimum 3 frames per document page
4. After capture, open Photos:
   mobile_launch_app: com.apple.mobileslideshow
5. Navigate to Recents, long-press new photos → Share → Save to Files
6. Save to: iCloud Drive/APEX-Legal/Evidence/[DATE]-[DESCRIPTION]/
7. Return screenshot of saved files as confirmation

Naming convention: YYYYMMDD_[SUBJECT]_[SEQUENCE].jpg
Example: 20260409_CourtOrder_001.jpg
```

---

## Court Document Review (PDF)

```
To review a court PDF on iPhone 16 Pro Max:

1. mobile_open_url: open the document URL or navigate via Files app
2. If in Files: tap to open in Quick Look viewer
3. Use mobile_take_screenshot at each page
4. Use mobile_swipe_on_screen (up) to advance pages
5. For each page:
   - Screenshot
   - mobile_list_elements_on_screen to extract any selectable text
   - Report key findings: dates, case numbers, orders, parties named
6. Compile a structured summary:
   - Case number
   - Hearing dates
   - Orders issued
   - Deadlines
   - Required actions
```

---

## Send Secure Message (Signal/ProtonMail)

```
To send a secure legal communication from iPhone 16 Pro Max:

SIGNAL:
1. mobile_launch_app: org.whispersystems.signal
2. mobile_list_elements_on_screen → find target contact
3. Tap contact → compose message
4. mobile_type_keys: [message text]
5. Tap Send button
6. Screenshot confirmation

PROTONMAIL:
1. mobile_launch_app: com.protonmail.ProtonMail (or open_url: https://mail.proton.me)
2. Tap Compose
3. Fill To, Subject, Body using mobile_type_keys
4. Tap Send → screenshot confirmation

Always screenshot the sent confirmation as evidence of transmission.
```

---

## Record Incident Video

```
For time-stamped incident documentation:

1. mobile_launch_app: com.apple.camera
2. Swipe to VIDEO mode (swipe left from Photo mode)
3. Tap record button (red circle, ~(478, 820))
4. Capture the incident
5. Tap stop
6. Immediately: open Photos → select video → tap Share → Save to Files
7. Save to: iCloud Drive/APEX-Legal/Incidents/[DATE]/
8. Note: iOS embeds GPS + timestamp metadata in video — preserve originals

Do NOT edit or trim the original — always work on copies.
```
