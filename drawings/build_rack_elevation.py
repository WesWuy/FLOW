#!/usr/bin/env python3
"""
ALLSHORES Executive Boardroom - AV Rack Elevation (Rev. 2).

Front elevation of the equipment rack, drawn to rack units.

RU heights are manufacturer figures, not estimates:
  DMF-CI-8    2RU (3.47 in), 15.43 in deep
  AMP-X300    half-rack 1RU - two gang side by side in a single RU
  P300        half-rack 1RU
  CP4         1RU full width
  M4250-16XF  1RU (43.2 mm)

The originally listed SR-CAB-SLIDE-12U does not hold this equipment list. The
layout below needs 18U, and that is with the amplifiers ganged and the NVX
endpoints treated as field devices. See NOTES on the sheet.
"""
from fractions import Fraction as F
from elevation_sheet import Sheet, frac

RU = F(7, 4)                       # 1.75" per rack unit
RACK_U = 18
RACK_W = F(19)                     # EIA panel width
RACK_H = RACK_U * RU               # 31.5"

# (start_u, height_u, label, sub-label, kind)
#   kind: "gear" | "shelf" | "blank" | "manager"
LAYOUT = [
    (18, 1, "CAT6 PATCH PANEL - 24 PORT", "TO CEILING, TABLE AND DISPLAY LOCATIONS", "gear"),
    (17, 1, "HORIZONTAL CABLE MANAGER", "1U", "manager"),
    (16, 1, "NETGEAR M4250 SERIES", "PoE AV SWITCH - SKU TBC  (1 OF 2)", "gear"),
    (15, 1, "NETGEAR M4250 SERIES", "PoE AV SWITCH - SKU TBC  (2 OF 2)", "gear"),
    (14, 1, "HORIZONTAL CABLE MANAGER", "1U", "manager"),
    (12, 2, "CRESTRON DMF-CI-8", "8-SLOT NVX CARD CHASSIS - 6 OF 8 SLOTS USED", "gear"),
    (11, 1, "CRESTRON CP4", "4-SERIES CONTROL PROCESSOR", "gear"),
    (10, 1, "CRESTRON USB-SW-400", "4-INPUT USB SWITCHER", "gear"),
    (9,  1, "SHURE INTELLIMIX P300", "HALF-RACK, ON 1U TRAY", "gear"),
    (8,  1, "VENT / BLANK PANEL", "THERMAL BREAK", "blank"),
    (7,  1, "CRESTRON AMP-X300  x2", "HALF-RACK, GANGED IN ONE RU", "gear"),
    (6,  1, "VENT / BLANK PANEL", "THERMAL BREAK", "blank"),
    (5,  1, "LENOVO THINKSMART CORE GEN 2", "ON SR-SHELF-FIXED-1U", "shelf"),
    (4,  1, "AVER HUB30", "4K BYOM MATRIX SWITCHER - ON SR-SHELF-FIXED-1U", "shelf"),
    (3,  1, "CRESTRON AM3-212", "AIRMEDIA RECEIVER - ON SR-SHELF-FIXED-1U", "shelf"),
    (2,  1, "SR-SHELF-FIXED-1U", "SPARE / FUTURE", "shelf"),
    (1,  1, "VENT / BLANK PANEL", "INTAKE", "blank"),
]

FILL = {"gear": "#ffffff", "shelf": "#f4f2ee", "blank": "#eceae6", "manager": "#eceae6"}

s = Sheet(RACK_W, RACK_H, y0=150, x0=170, scale=38)
P, X, Y, L = s.P, s.X, s.Y, s.L
X0, Y0, FLOOR = s.X0, s.Y0, s.FLOOR

s.border()

# ----------------------------------------------------------------- rack frame
# rails sit outboard of the 19" panel face
RAIL = F(5, 8)
s.box(X(-RAIL), Y(RACK_H) - P(10), L(RACK_W + 2 * RAIL), L(RACK_H) + P(20),
      width=2.4, fill="#ffffff")
s.label(X(RACK_W / 2), Y(RACK_H) - P(30),
        'AV RACK - 18U  |  19" EIA  |  FRONT ELEVATION', 520, 46)

def u_top(start_u, h_u):
    return Y((start_u - 1 + h_u) * RU)

for start_u, h_u, label, sub, kind in LAYOUT:
    y, h = u_top(start_u, h_u), L(h_u * RU)
    s.box(X(0), y, L(RACK_W), h, width=1.6, fill=FILL[kind],
          style="dashed" if kind == "shelf" else "solid")
    s.label(X(RACK_W / 2), y + h / 2 - (P(9) if sub else 0), label, 640, 40)
    if sub:
        s.label(X(RACK_W / 2), y + h / 2 + P(11), sub, 660, 30)

# RU ruler down the left-hand rail
for n in range(1, RACK_U + 1):
    yb, yt = Y((n - 1) * RU), Y(n * RU)
    s.seg(X(-RAIL), yt, X(0), yt, "#c8c8c8", 0.7)
    s.label(X(-RAIL) - P(26), (yb + yt) / 2, f"U{n}", 60, 30)

# ------------------------------------------------------------------- schedule
SX, SY = 1180.0, Y0 - P(30)
rows = []
for start_u, h_u, label, sub, kind in LAYOUT:
    ru = f"U{start_u}" if h_u == 1 else f"U{start_u}-{start_u + h_u - 1}"
    rows.append((ru, label, sub))
s.schedule(["RU", "EQUIPMENT", "NOTES"], rows, SX, SY, 1150, 44 * (len(rows) + 1))

# --------------------------------------------------------------------- notes
s.notes([
    "NOTES",
    "1.  THE LISTED SR-CAB-SLIDE-12U WILL NOT HOLD THIS EQUIPMENT LIST. THIS LAYOUT NEEDS 18U.",
    "     RESIZE THE SLIDE-OUT RACK AND CABINET ACCORDINGLY.",
    "2.  RU HEIGHTS ARE MANUFACTURER FIGURES: DMF-CI-8 = 2RU; AMP-X300 AND P300 ARE HALF-RACK 1RU;",
    "     CP4 AND M4250-16XF ARE 1RU. THE TWO AMP-X300 GANG SIDE BY SIDE IN ONE RU.",
    "3.  DM-NVX-D30 (2) AND DM-NVX-E30 (2) ARE BOX ENDPOINTS AT FIELD LOCATIONS, NOT IN THIS RACK.",
    "     THE RACK-SIDE NVX IS THE 6 CARDS IN THE DMF-CI-8 (2x D30C + 4x E30C, 6 OF 8 SLOTS).",
    "4.  SWITCHES SHOWN AS PoE-CAPABLE M4250 PER DIRECTION. THE LISTED M4250-16XF IS ALL-FIBER SFP+",
    "     WITH NO COPPER PORTS. CONFIRM THE CORRECTED SKU - 1U EACH ASSUMED, WHICH SETS THE 18U.",
    "5.  WATTBOX WB-800-IPVM-6 (2) AND WB-250-IPW-2 (2) ARE 0U, REAR-RAIL OR VERTICAL MOUNT. IF FRONT",
    "     PANEL METERING IS WANTED, SUBSTITUTE THE 1U FACEPLATE SKU.",
    "6.  CRESTRON AM3-212 KIT APPEARS TWICE ON THE EQUIPMENT LIST. DRAWN AS ONE UNIT - CONFIRM QTY.",
    "7.  PATCH PANEL 24 PORT IS CORRECT PER THE PATCH LIST: 14 FIELD DROPS, 10 PORTS SPARE. RACK",
    "     EQUIPMENT PATCHES DIRECT TO THE SWITCHES AND DOES NOT PASS THROUGH THE PANEL.",
    "8.  CLOSED CABINET WITH A SLIDE-OUT RACK: AC-RRF7 ROOF FAN IS REQUIRED. VERIFY CABINET DEPTH",
    '     AGAINST THE DMF-CI-8 AT 15 7/16" DEEP PLUS SLIDE TRAVEL AND A SERVICE LOOP.',
    "9.  USB-SW-400 AND AVER HUB30 RU HEIGHTS NOT CONFIRMED - EACH ALLOWED A FULL 1U HERE."],
    SX, SY + 44 * (len(rows) + 1) + P(40), 1150, 320)

s.title_block(
    "ALLSHORES\nExecutive Boardroom\nAV Rack\nFront Elevation",
    'SCALE: NTS\nRACK: 18U x 19" EIA\nSLIDE-OUT IN CABINET\n'
    "ROOF FAN: AC INFINITY AC-RRF7\nPOWER: WATTBOX, REAR MOUNT",
    "DATE CREATED: 26/08/24\nCREATED BY: WW\nRev. 2")

out = "/home/user/FLOW/drawings/allshores-boardroom-rack.lucid.json"
s.dump(out, "AV Rack Elevation")

# -------------------------------------------------------------------- sanity
used = sum(h for _, h, _, _, _ in LAYOUT)
slots = sorted(u for st, h, _, _, _ in LAYOUT for u in range(st, st + h))
assert slots == list(range(1, RACK_U + 1)), f"gaps/overlaps: {slots}"
assert used == RACK_U, used
print(f"wrote {out} | {len(s.shapes)} shapes, {len(s.lines)} lines")
print(f"rack {RACK_U}U ({frac(RACK_H)} tall), every RU accounted for")
assert 1180 + 1150 < s.TB_X - 40, "schedule overruns the title block"
print(f"content bottom {s.content_bottom():.0f} vs sheet inner {P(26)+s.SHEET_H-P(52):.0f}")
print(f"schedule right edge {1180+1150} vs title block divider {s.TB_X:.0f}")
