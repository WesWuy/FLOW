#!/usr/bin/env python3
"""
ALLSHORES Executive Boardroom - Network Patch List (Rev. 1).

Every CAT6 connection in the room, split by where it terminates:

  FIELD DROPS    leave the rack, land on the patch panel, patch to a switch
  RACK INTERNAL  device to switch inside the rack, no patch panel involved
  POINT TO POINT USB extension - home run, must NOT touch the switch

That split is the whole point of the sheet. The patch panel only ever sees
field cable, so panel size is driven by the drop count (14), not by the switch
port count (28).

Switch assignment follows the two-switch recommendation:
  SW-1  NETGEAR GSM4212UX (in stock) - 8x Ultra90 PoE++, 2x 1G, 2x SFP+
  SW-2  NETGEAR 24-port M4250 (to be ordered) - rack gear and non-PoE field

Rows needing a decision before rough-in are highlighted; every one of them is
also spelled out on the ASSUMPTIONS tab.
"""
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

FONT = "Arial"
HDR_FILL = PatternFill("solid", fgColor="1F3864")
SEC_FILL = PatternFill("solid", fgColor="D9E2F3")
FLAG_FILL = PatternFill("solid", fgColor="FFF2CC")   # confirm before rough-in
SPARE_FILL = PatternFill("solid", fgColor="F2F2F2")
WARN_FILL = PatternFill("solid", fgColor="FCE4D6")   # not on the equipment list
THIN = Side(style="thin", color="BFBFBF")
BORDER = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)

# --------------------------------------------------------------- field drops
# (panel_port, cable_id, location, device, cable, poe, switch_port, note, tag)
#   tag: "" | "flag" | "spare" | "warn"
FIELD = [
    (1, "CLG-01", "Ceiling - mic position 1", "Shure MXA925 (1 of 2)", "CAT6",
     "PoE 802.3af", "SW-1 P1", "4x4 ceiling tile detail TBC by others", "flag"),
    (2, "CLG-02", "Ceiling - mic position 2", "Shure MXA925 (2 of 2)", "CAT6",
     "PoE 802.3af", "SW-1 P2", "4x4 ceiling tile detail TBC by others", "flag"),
    (3, "CLG-03", "Ceiling - room centre", "SPARE", "CAT6",
     "-", "-", "Pull, terminate, leave dark", "spare"),
    (4, "FW-01", 'Front wall - 98" display 1', "DM-NVX-D30C via HDMI, or D30 box",
     "CAT6", "PoE+ 802.3at", "SW-1 P3", "See NVX topology assumption", "flag"),
    (5, "FW-02", 'Front wall - 98" display 2', "DM-NVX-D30C via HDMI, or D30 box",
     "CAT6", "PoE+ 802.3at", "SW-1 P4", "See NVX topology assumption", "flag"),
    (6, "FW-03", "Front wall - camera position", "AVer CAM570 (1 of 2) - control",
     "CAT6", "-", "SW-2 P19", "Camera VIDEO is USB, separate run", ""),
    (7, "FW-04", "Front wall - credenza", "SPARE", "CAT6",
     "-", "-", "Pull, terminate, leave dark", "spare"),
    (8, "RW-01", 'Rear wall - LV box, 9\'-10 29/32" / 5\'-5 11/16" AFF',
     'DM-NVX-D30 box - 85" display', "CAT6", "PoE+ 802.3at", "SW-1 P5",
     "Decoder at the display - 42 ft from rack", ""),
    (9, "RW-02", "Rear wall - above display", "AVer CAM570 (2 of 2) - control",
     "CAT6", "-", "SW-2 P20", "Camera VIDEO is USB, separate run", ""),
    (10, "RW-03", "Rear wall - LV box", "SPARE", "CAT6",
     "-", "-", "Pull, terminate, leave dark", "spare"),
    (11, "TBL-01", "Table - centre floor box", "Lenovo IP Controller",
     "CAT6", "PoE 802.3af", "SW-1 P6", "Table touch panel", ""),
    (12, "TBL-02", "Table - centre floor box", "DM-NVX-E30 box - BYOD input",
     "CAT6", "PoE+ 802.3at", "SW-1 P7", "See NVX topology assumption", "flag"),
    (13, "TBL-03", "Table - centre floor box", "SPARE", "CAT6",
     "-", "-", "Pull, terminate, leave dark", "spare"),
    (14, "LAN-01", "House LAN demarc", "Client network uplink", "CAT6",
     "-", "SW-2 P21", "Coordinate VLAN and IP scheme with client IT", "flag"),
]

# ------------------------------------------------------------- rack internal
# (cable_id, device, ru, switch_port, poe, note, tag)
RACK = [
    ("R-01", "Crestron DM-NVX-E30C - chassis slot 1", "U12-13", "SW-2 P1", "-",
     "Each NVX card has its own rear LAN port", ""),
    ("R-02", "Crestron DM-NVX-E30C - chassis slot 2", "U12-13", "SW-2 P2", "-", "", ""),
    ("R-03", "Crestron DM-NVX-E30C - chassis slot 3", "U12-13", "SW-2 P3", "-", "", ""),
    ("R-04", "Crestron DM-NVX-E30C - chassis slot 4", "U12-13", "SW-2 P4", "-", "", ""),
    ("R-05", "Crestron DM-NVX-D30C - chassis slot 5", "U12-13", "SW-2 P5", "-", "", ""),
    ("R-06", "Crestron DM-NVX-D30C - chassis slot 6", "U12-13", "SW-2 P6", "-", "", ""),
    ("R-07", "Crestron CP4 control processor", "U11", "SW-2 P7", "-", "", ""),
    ("R-08", "Crestron USB-SW-400", "U10", "SW-2 P8", "-", "Control / configuration", ""),
    ("R-09", "Shure IntelliMix P300", "U9", "SW-2 P9", "-",
     "Control plus AES67 / Dante audio to the mics", ""),
    ("R-10", "Crestron AMP-X300 (1 of 2)", "U7", "SW-2 P10", "-", "", ""),
    ("R-11", "Crestron AMP-X300 (2 of 2)", "U7", "SW-2 P11", "-", "", ""),
    ("R-12", "Lenovo ThinkSmart Core Gen 2", "U5", "SW-2 P12", "-",
     "Teams Rooms host", ""),
    ("R-13", "AVer HUB30", "U4", "SW-2 P13", "-",
     "Confirm the HUB30 has a control LAN port", "flag"),
    ("R-14", "Crestron AM3-212 AirMedia receiver", "U3", "SW-2 P14", "-",
     "Listed twice on the equipment list - drawn as one", "flag"),
    ("R-15", "WattBox WB-800-IPVM-6 (1 of 2)", "0U rear", "SW-2 P15", "-",
     "Qty may drop - see 2nd floor exclusion", "flag"),
    ("R-16", "WattBox WB-800-IPVM-6 (2 of 2)", "0U rear", "SW-2 P16", "-",
     "Qty may drop - see 2nd floor exclusion", "flag"),
    ("R-17", "WattBox WB-250-IPW-2 (1 of 2)", "0U rear", "SW-2 P17", "-",
     "Qty may drop - see 2nd floor exclusion", "flag"),
    ("R-18", "WattBox WB-250-IPW-2 (2 of 2)", "0U rear", "SW-2 P18", "-",
     "Qty may drop - see 2nd floor exclusion", "flag"),
    ("R-19", "SW-1 to SW-2 inter-switch link", "U15-16", "SFP+ to SFP+", "-",
     "10G DAC or fibre - do not trunk over copper", ""),
]

# ------------------------------------------------------------ point to point
# (cable_id, run, cable, note)
P2P = [
    ("USB-01", "Front camera position to rack (AVer HUB30)",
     "USB 3.0 active, or extender over CAT6",
     "Approx. 12 ft - within active-cable range"),
    ("USB-02", "Rear wall camera to rack (AVer HUB30)",
     "USB extender over CAT6 x1 or x2, or fibre",
     "Approx. 42 ft - EXCEEDS USB 3.0 PASSIVE LIMIT. NO EXTENDER ON THE "
     "EQUIPMENT LIST."),
    ("HDMI-01", 'Rack to 98" display 1',
     "HDMI, or NVX decoder at display",
     "Short run from the credenza directly below - see NVX assumption"),
    ("HDMI-02", 'Rack to 98" display 2',
     "HDMI, or NVX decoder at display",
     "Short run from the credenza directly below - see NVX assumption"),
]

ASSUMPTIONS = [
    ("NVX topology",
     "The equipment list carries 6 chassis cards (4x E30C, 2x D30C) and 4 box "
     "endpoints (2x E30, 2x D30) for 3 sources and 3 displays. That does not "
     "balance. This list assumes the 2x D30C cards feed the two 98\" displays "
     "over short HDMI from the credenza directly below, one D30 box sits at "
     "the 85\" rear display, one E30 box serves the table BYOD input, and the "
     "remaining endpoints are spare. CONFIRM before rough-in - it changes "
     "which drops carry PoE."),
    ("Rear camera USB extension",
     "The rear CAM570 is roughly 42 ft from the rack. USB 3.0 will not run "
     "that distance passively. An extender - CAT6 or fibre - is required and "
     "does NOT appear on the equipment list. Same class of gap as the shade "
     "control. Pull the CAT6 for it now either way."),
    ("USB extender cable must not be patched",
     "USB-02 is a point-to-point run. If someone patches it into the switch "
     "it will not work and may be misread as a faulty extender. Label both "
     "ends DO NOT PATCH and keep it off the patch panel if practical."),
    ("Switch split",
     "SW-1 is the NETGEAR GSM4212UX already in stock: 8x Ultra90 PoE++ (720W), "
     "2x 1G copper, 2x SFP+. It carries the 7 PoE field devices with 1 spare "
     "PoE port. SW-2 is a 24-port M4250 still to be ordered and carries the "
     "rack gear plus non-PoE field drops. One switch alone cannot do this - "
     "28 ports are needed."),
    ("SW-2 spare capacity is thin",
     "21 of 24 ports used leaves 3 spare. If the WattBox quantities hold and "
     "anything is added later, specify the 48-port M4250 instead."),
    ("PoE budget is heavily oversubscribed",
     "Measured need is roughly 150W: 2 mics at ~13W, NVX endpoints at ~25W, "
     "touch panel at ~13W. The GSM4212UX supplies 720W. Nothing here needs "
     "Ultra90. Fine to use the in-stock unit, but do not buy a second."),
    ("Fan noise",
     "The GSM4212UX is fanless only below 45W of PoE draw. At ~150W the fans "
     "will run, inside a closed credenza cabinet in the boardroom. The "
     "AC-RRF7 roof fan is already specified so this is not new, but verify "
     "the acoustic result before the room is signed off."),
    ("WattBox quantities",
     "2x WB-800-IPVM-6 and 2x WB-250-IPW-2 appear on the list. Second floor "
     "equipment is excluded per direction, so some of these may belong to "
     "that room. Each one consumes a switch port - confirm the boardroom "
     "count."),
    ("AVer HUB30 control port",
     "Allowed one switch port here. Confirm the HUB30 actually presents a "
     "control LAN interface; if not, SW-2 gains a spare port."),
    ("Patch panel size",
     "14 field drops against a 24-port panel. The 24-port is correct and "
     "leaves healthy spare. Rack gear does not pass through the panel, so "
     "the 28 switch ports do not drive panel size."),
    ("Cable type",
     "CAT6 assumed throughout per the equipment list. If any run exceeds "
     "295 ft, or 1G proves insufficient for NVX at the chosen bit rate, "
     "revisit. All runs here are well inside that."),
]


def style_header(ws, row, ncols):
    for c in range(1, ncols + 1):
        cell = ws.cell(row=row, column=c)
        cell.font = Font(name=FONT, size=10, bold=True, color="FFFFFF")
        cell.fill = HDR_FILL
        cell.alignment = Alignment(horizontal="center", vertical="center",
                                   wrap_text=True)
        cell.border = BORDER


def style_row(ws, row, ncols, tag):
    fill = {"flag": FLAG_FILL, "spare": SPARE_FILL, "warn": WARN_FILL}.get(tag)
    for c in range(1, ncols + 1):
        cell = ws.cell(row=row, column=c)
        cell.font = Font(name=FONT, size=10)
        cell.alignment = Alignment(vertical="top", wrap_text=True)
        cell.border = BORDER
        if fill:
            cell.fill = fill


def title(ws, text, ncols, sub=None):
    ws.cell(row=1, column=1, value="ALLSHORES  |  EXECUTIVE BOARDROOM")
    ws.cell(row=1, column=1).font = Font(name=FONT, size=13, bold=True,
                                         color="1F3864")
    ws.cell(row=2, column=1, value=text)
    ws.cell(row=2, column=1).font = Font(name=FONT, size=11, bold=True)
    if sub:
        ws.cell(row=3, column=1, value=sub)
        ws.cell(row=3, column=1).font = Font(name=FONT, size=9, italic=True,
                                             color="595959")


def widths(ws, cols):
    for i, w in enumerate(cols, start=1):
        ws.column_dimensions[get_column_letter(i)].width = w


wb = Workbook()

# =========================================================== 1 - field drops
ws = wb.active
ws.title = "Field Drops"
title(ws, "NETWORK PATCH LIST - FIELD DROPS (via patch panel)",
      8, "Rev. 1  |  26/08/24  |  WW  |  Shaded rows need a decision before "
         "rough-in - see ASSUMPTIONS tab")
hdr = ["PANEL\nPORT", "CABLE ID", "LOCATION", "DEVICE / TERMINATION", "CABLE",
       "PoE", "SWITCH PORT", "NOTES"]
r = 5
for c, h in enumerate(hdr, start=1):
    ws.cell(row=r, column=c, value=h)
style_header(ws, r, len(hdr))
for i, row in enumerate(FIELD):
    rr = r + 1 + i
    for c, v in enumerate(row[:-1], start=1):
        ws.cell(row=rr, column=c, value=v)
    style_row(ws, rr, len(hdr), row[-1])
last_field = r + len(FIELD)

rr = last_field + 2
ws.cell(row=rr, column=1, value="Ports 15-24 spare on the 24-port panel.")
ws.cell(row=rr, column=1).font = Font(name=FONT, size=9, italic=True)
ws.cell(row=rr + 1, column=1,
        value="LEGEND:  yellow = confirm before rough-in   |   grey = spare "
              "drop, pull and terminate   |   PoE column drives which switch "
              "the drop patches to.")
ws.cell(row=rr + 1, column=1).font = Font(name=FONT, size=9, italic=True)
widths(ws, [8, 11, 34, 34, 10, 14, 13, 40])
ws.freeze_panes = "A6"

# ========================================================= 2 - rack internal
ws2 = wb.create_sheet("Rack Internal")
title(ws2, "NETWORK PATCH LIST - RACK INTERNAL (device to switch, no panel)",
      6, "These do NOT consume patch panel ports. Patch cords inside the "
         "cabinet only.")
hdr2 = ["CABLE ID", "DEVICE", "RU", "SWITCH PORT", "PoE", "NOTES"]
r = 5
for c, h in enumerate(hdr2, start=1):
    ws2.cell(row=r, column=c, value=h)
style_header(ws2, r, len(hdr2))
for i, row in enumerate(RACK):
    rr = r + 1 + i
    for c, v in enumerate(row[:-1], start=1):
        ws2.cell(row=rr, column=c, value=v)
    style_row(ws2, rr, len(hdr2), row[-1])
widths(ws2, [11, 42, 11, 15, 8, 44])
ws2.freeze_panes = "A6"

# ======================================================== 3 - point to point
ws3 = wb.create_sheet("Point to Point")
title(ws3, "POINT TO POINT RUNS - NOT SWITCHED", 4,
      "USB and HDMI runs. These must NOT be patched into a network switch.")
hdr3 = ["CABLE ID", "RUN", "CABLE", "NOTES"]
r = 5
for c, h in enumerate(hdr3, start=1):
    ws3.cell(row=r, column=c, value=h)
style_header(ws3, r, len(hdr3))
for i, row in enumerate(P2P):
    rr = r + 1 + i
    for c, v in enumerate(row, start=1):
        ws3.cell(row=rr, column=c, value=v)
    style_row(ws3, rr, len(hdr3), "warn" if "NO EXTENDER" in row[3] else "")
widths(ws3, [11, 44, 38, 52])
ws3.freeze_panes = "A6"

# ========================================================== 4 - port summary
ws4 = wb.create_sheet("Port Summary")
title(ws4, "SWITCH PORT COUNT", 4)
r = 5
for c, h in enumerate(["", "SW-1  GSM4212UX", "SW-2  24-PORT M4250", "TOTAL"],
                      start=1):
    ws4.cell(row=r, column=c, value=h)
style_header(ws4, r, 4)

nf, nr = len(FIELD), len(RACK)
summary = [
    ("Field drops on this switch",
     f"=COUNTIF('Field Drops'!G6:G{5 + nf},\"SW-1*\")",
     f"=COUNTIF('Field Drops'!G6:G{5 + nf},\"SW-2*\")", "=B6+C6"),
    ("Rack internal on this switch",
     f"=COUNTIF('Rack Internal'!D6:D{5 + nr},\"SW-1*\")",
     f"=COUNTIF('Rack Internal'!D6:D{5 + nr},\"SW-2*\")", "=B7+C7"),
    ("PORTS USED", "=B6+B7", "=C6+C7", "=B8+C8"),
    ("Copper ports available", 10, 26, "=B9+C9"),
    ("SPARE", "=B9-B8", "=C9-C8", "=B10+C10"),
    ("", "", "", ""),
    ("PoE ports used",
     f"=COUNTIFS('Field Drops'!F6:F{5 + nf},\"PoE*\","
     f"'Field Drops'!G6:G{5 + nf},\"SW-1*\")",
     f"=COUNTIFS('Field Drops'!F6:F{5 + nf},\"PoE*\","
     f"'Field Drops'!G6:G{5 + nf},\"SW-2*\")", "=B12+C12"),
    ("PoE ports available", 8, 24, "=B13+C13"),
    ("PoE SPARE", "=B13-B12", "=C13-C12", "=B14+C14"),
]
for i, (lab, b, c, d) in enumerate(summary):
    rr = 6 + i
    ws4.cell(row=rr, column=1, value=lab)
    ws4.cell(row=rr, column=2, value=b)
    ws4.cell(row=rr, column=3, value=c)
    ws4.cell(row=rr, column=4, value=d)
    for cc in range(1, 5):
        cell = ws4.cell(row=rr, column=cc)
        bold = lab in ("PORTS USED", "SPARE", "PoE SPARE")
        cell.font = Font(name=FONT, size=10, bold=bold)
        cell.alignment = Alignment(horizontal="left" if cc == 1 else "center")
        if lab:
            cell.border = BORDER
        if bold:
            cell.fill = SEC_FILL

ws4.cell(row=17, column=1,
         value="Copper available: SW-1 = 8x PoE++ + 2x 1G. SW-2 = 24x PoE+ + "
               "2x 1G. SFP+ carries the inter-switch link and can carry the "
               "house uplink.")
ws4.cell(row=17, column=1).font = Font(name=FONT, size=9, italic=True)
ws4.cell(row=18, column=1,
         value="Patch panel: 14 field drops on a 24-port panel. Rack internal "
               "connections bypass the panel entirely.")
ws4.cell(row=18, column=1).font = Font(name=FONT, size=9, italic=True)
widths(ws4, [34, 20, 22, 12])

# =========================================================== 5 - assumptions
ws5 = wb.create_sheet("Assumptions")
title(ws5, "ASSUMPTIONS AND OPEN ITEMS", 2,
      "Every one of these affects the patch list. Resolve before rough-in.")
r = 5
for c, h in enumerate(["ITEM", "DETAIL"], start=1):
    ws5.cell(row=r, column=c, value=h)
style_header(ws5, r, 2)
for i, (k, v) in enumerate(ASSUMPTIONS):
    rr = r + 1 + i
    ws5.cell(row=rr, column=1, value=k)
    ws5.cell(row=rr, column=2, value=v)
    style_row(ws5, rr, 2, "")
    ws5.cell(row=rr, column=1).font = Font(name=FONT, size=10, bold=True)
widths(ws5, [30, 105])
ws5.freeze_panes = "A6"

out = "/home/user/FLOW/drawings/allshores-boardroom-patch-list.xlsx"
wb.save(out)

# -------------------------------------------------------------------- sanity
ports = [r[6] for r in FIELD if r[6] != "-"] + [r[3] for r in RACK]
switched = [p for p in ports if p.startswith(("SW-1 P", "SW-2 P"))]
assert len(switched) == len(set(switched)), "duplicate switch port assignment"
panel = [r[0] for r in FIELD]
assert panel == list(range(1, len(FIELD) + 1)), f"panel ports not sequential: {panel}"
sw1 = [p for p in switched if p.startswith("SW-1")]
sw2 = [p for p in switched if p.startswith("SW-2")]
assert len(sw1) <= 10, f"SW-1 over capacity: {len(sw1)}"
assert len(sw2) <= 26, f"SW-2 over capacity: {len(sw2)}"
print(f"wrote {out}")
print(f"field drops {len(FIELD)} on a 24-port panel | rack internal {len(RACK)}")
print(f"switch ports: SW-1 {len(sw1)}/10, SW-2 {len(sw2)}/26, total {len(switched)}")
print(f"point to point (not switched) {len(P2P)}")
