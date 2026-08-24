#!/usr/bin/env python3
"""
ALLSHORES Executive Meeting Room - Front Wall Dual Display Elevation (Rev. 3).

Rev. 3 carries the field measurements: wall height, countertop height, overall
length, and the four wall device positions. Rev. 1's four dimensions
(80 1/2", 4", 48", 39 3/4") read as a chain of device centerlines - adding the
33 3/4" remainder to the right-hand wall closes it exactly on 206".

Device AFF is derived rather than measured directly: the tape in the field photo
is hooked on the countertop (the credenza blocks a floor-hooked tape against
this wall face), reading 31 5/8" to the receptacle centerline, so
33 1/4 + 31 5/8 = 64 7/8" AFF. That independently agrees with Rev. 1 drawing
the devices inside the display outlines. It is starred on the sheet.
"""
from fractions import Fraction as F
from elevation_sheet import Sheet, frac, ftin

# --------------------------------------------------------------- field dims
WALL_W = F(206)                                       # measured on the counter
WALL_H = F(106) + F(1, 2)                             # measured floor to ceiling

DISP_W, DISP_H = F(85) + F(7, 8), F(48) + F(7, 8)     # 98" Samsung
DISP_BTM = F(52)
DISP_TOP = DISP_BTM + DISP_H
MARGIN = F(17)                                        # clear at each side wall
DISP_GAP = WALL_W - 2 * MARGIN - 2 * DISP_W           # falls out at 1/4"
D1_L = MARGIN
D2_L = MARGIN + DISP_W + DISP_GAP
ARRAY_W = 2 * DISP_W + DISP_GAP
D1_CL, D2_CL = D1_L + DISP_W / 2, D2_L + DISP_W / 2

MOUNT_W, MOUNT_H = F(42) + F(3, 4), F(24) + F(1, 2)   # XTM1U + FCAXV1U

CAM_W, CAM_H = F(6) + F(3, 4), F(7) + F(1, 2)         # AVer CAM570
CAM_LENS_CL = F(46)                                   # per Rev. 1
CAM_BTM = CAM_LENS_CL - CAM_H / 2
CAM_TOP = CAM_BTM + CAM_H

CRED_H = F(33) + F(1, 4)                              # to top of stone
COUNTER = F(1) + F(1, 4)                              # stone thickness, indicative
CRED_W = WALL_W

DEV_AFF = CRED_H + F(31) + F(5, 8)                    # 64 7/8", derived - see docstring
A_X = F(80) + F(1, 2)
B_X = A_X + F(4)
C_X = B_X + F(48)
D_X = C_X + F(39) + F(3, 4)
DEV_W, DEV_H = F(2) + F(3, 4), F(9, 2)                # single-gang plate

# the wall sits lower on the sheet than the rear wall's, to clear the second
# dimension chain carrying the display centerlines
s = Sheet(WALL_W, WALL_H, y0=172)
P, X, Y, L = s.P, s.X, s.Y, s.L
FLOOR, X0, Y0 = s.FLOOR, s.X0, s.Y0

s.border()
# bottom-left is credenza and top-left is only 5 5/8" of wall, so the wall name
# sits in the open band between the displays and the credenza, clear of the
# height dimension column
s.wall("FRONT WALL", label_at=(X(30), Y(42)))

# ------------------------------------------------------------------ displays
d1x, d2x = X(D1_L), X(D2_L)
dy, dw, dh = Y(DISP_TOP), L(DISP_W), L(DISP_H)
for dxx in (d1x, d2x):
    s.box(dxx, dy, dw, dh, width=2.2, fill="#ffffff")
    s.label(dxx + dw / 2, dy + P(30), '98" SAMSUNG', 560, 70)
    s.label(dxx + dw / 2, dy + P(60), '85 7/8" W x 48 7/8" H  |  BTM 52" AFF', 660, 54)
    mx, my = dxx + (dw - L(MOUNT_W)) / 2, dy + P(88)
    s.box(mx, my, L(MOUNT_W), L(MOUNT_H), "#4a4a4a", 1.4, "dashed")
    s.label(mx + L(MOUNT_W) / 2, my + P(26), "XTM1U + FCAXV1U", 440, 50)
    s.label(mx + L(MOUNT_W) / 2, my + P(52), '42 3/4" x 24 1/2"', 360, 46)

# ------------------------------------------------------------------- devices
TAG = P(22)
def device(cx, letter, tag_dx=0.0):
    x, y = X(cx) - L(DEV_W) / 2, Y(DEV_AFF) - L(DEV_H) / 2
    s.box(x, y, L(DEV_W), L(DEV_H), width=1.6, fill="#ffffff")
    tcx, tcy = X(cx) + tag_dx, y + L(DEV_H) + P(16) + TAG / 2
    s.seg(X(cx), y + L(DEV_H), tcx, tcy - TAG / 2, "#9a9a9a", 0.8, "dashed")
    s.box(tcx - TAG / 2, tcy - TAG / 2, TAG, TAG, width=1.4, fill="#ffffff",
          text=letter, sh="circle")

# A and B are only 4" apart, so their tags are splayed to either side
device(A_X, "A", -P(6))
device(B_X, "B", P(6))
device(C_X, "C")
device(D_X, "D")

# -------------------------------------------------------------------- camera
cx0 = X(WALL_W / 2 - CAM_W / 2)
s.box(cx0, Y(CAM_TOP), L(CAM_W), L(CAM_H), width=1.8, fill="#ffffff")
cam_mid = (Y(CAM_TOP) + Y(CAM_BTM)) / 2
s.label(cx0 + L(CAM_W) + P(96), cam_mid,
        'AVer CAM570 4K DUAL LENS\nLENS CL 46" AFF', 280, 62)
s.seg(cx0 + L(CAM_W), cam_mid, cx0 + L(CAM_W) + P(14), cam_mid, "#6a6a6a", 0.9)

# ------------------------------------------------------------------ credenza
s.box(X(0), Y(CRED_H), L(CRED_W), L(CRED_H), width=2.0, fill="#f4f2ee")
s.box(X(0), Y(CRED_H), L(CRED_W), L(COUNTER), "#6a6a6a", 1.4, fill="#d8d4ce")
s.label(X(WALL_W / 2), Y(CRED_H - COUNTER) + L(CRED_H - COUNTER) / 2,
        'CREDENZA  |  STONE TOP 33 1/4" AFF', 520, 60)

# ---------------------------------------------------------------- dimensions
TOP0, TOP1 = Y0 - P(64), Y0 - P(118)
s.hdim(0, D1_L, TOP0, frac(MARGIN), Y(WALL_H))
s.hdim(D1_L, D1_L + ARRAY_W, TOP0, frac(ARRAY_W), dy)
s.hdim(D1_L + ARRAY_W, WALL_W, TOP0, frac(MARGIN), Y(WALL_H))

# display centerlines - what the mount installer actually sets out from
s.hdim(0, D1_CL, TOP1, frac(D1_CL), Y(WALL_H))
s.hdim(D1_CL, D2_CL, TOP1, frac(D2_CL - D1_CL))
s.hdim(D2_CL, WALL_W, TOP1, frac(WALL_W - D2_CL), Y(WALL_H))
for cl in (D1_CL, D2_CL):
    s.seg(X(cl), dy, X(cl), Y(DISP_BTM), "#9a9a9a", 0.7, "dashed")

BOT0, BOT1, BOT2 = FLOOR + P(40), FLOOR + P(100), FLOOR + P(156)
s.hdim(A_X, B_X, BOT0, frac(B_X - A_X), Y(DEV_AFF))
s.hdim(B_X, C_X, BOT0, frac(C_X - B_X))
s.hdim(0, A_X, BOT1, frac(A_X), Y(DEV_AFF))
s.hdim(A_X, C_X, BOT1, frac(C_X - A_X))
s.hdim(C_X, D_X, BOT1, frac(D_X - C_X), Y(DEV_AFF))
s.hdim(D_X, WALL_W, BOT1, frac(WALL_W - D_X), Y(WALL_H))
s.label(X(WALL_W / 2), BOT1 + P(30), "EXISTING DEVICE CENTERLINES FROM LEFT WALL", 900, 43)
s.hdim(0, WALL_W, BOT2, frac(WALL_W))

s.vdim(0, WALL_H, X0 - P(122), frac(WALL_H), X(0))
DIMX = d1x - P(46)
s.vdim(0, DISP_BTM, DIMX, frac(DISP_BTM) + " AFF", d1x)
s.vdim(DISP_BTM, DISP_TOP, DIMX, frac(DISP_H), d1x)
s.vdim(DISP_TOP, WALL_H, DIMX, frac(WALL_H - DISP_TOP), d1x)

RDIM = X(WALL_W) + P(60)
s.vdim(0, CRED_H, RDIM, frac(CRED_H), X(WALL_W), side="right")
s.vdim(CRED_H, DISP_BTM, RDIM, frac(DISP_BTM - CRED_H), X(WALL_W), side="right")

# ----------------------------------------------------------- device schedule
BAND = FLOOR + P(200)
s.schedule(["KEY", "EXISTING WALL DEVICE", "FROM LEFT WALL (CL)", "AFF (CL)"],
           [("A", "20A DUPLEX RECEPTACLE", ftin(A_X), ftin(DEV_AFF) + "  *"),
            ("B", "WALL BOX - TYPE TBC", ftin(B_X), ftin(DEV_AFF) + "  *"),
            ("C", "20A DUPLEX RECEPTACLE", ftin(C_X), ftin(DEV_AFF) + "  *"),
            ("D", "WALL BOX - TYPE TBC", ftin(D_X), ftin(DEV_AFF) + "  *")],
           X0 - P(122), BAND, P(720), 200)

s.notes([
    "NOTES",
    '1.  DISPLAYS SET OUT AS A PAIR - 17" CLEAR EACH SIDE, 1/4" BETWEEN DISPLAYS. BTM 52" AFF.',
    '2.  DISPLAY CENTERLINES 59 15/16" FROM EACH SIDE WALL, 86 1/8" CENTER TO CENTER.',
    "3.  ALL FOUR DEVICES A-D FALL BEHIND THE DISPLAYS. A AND C ARE 20A DUPLEX RECEPTACLES -",
    "     CONFIRM WHETHER THEY ARE ABANDONED, RELOCATED, OR FED THROUGH THE DISPLAY MOUNTS.",
    '4.  * DEVICE AFF IS DERIVED, NOT MEASURED FROM THE FLOOR: 31 5/8" ABOVE THE 33 1/4" COUNTER',
    '     = 64 7/8" AFF. CONFIRM BEFORE ROUGH-IN.',
    '5.  REV. 1 GIVES 17" EACH SIDE AND 206" OVERALL, LEAVING 1/4" ACROSS THE PAIR. IT IS DRAWN AS',
    '     THE GAP BETWEEN DISPLAYS; THE ALTERNATIVE IS 17 1/8" MARGINS WITH THE DISPLAYS TOUCHING.',
    '6.  CREDENZA 33 1/4" TO TOP OF STONE, FULL WALL WIDTH. CONFIRM BASE / TOE DETAIL AND COUNTER',
    "     PROJECTION - THE FIELD PHOTO SHOWS A SETBACK BELOW THE CABINET FACES.",
    '7.  AVER CAM570 LENS CL 46" AFF PER REV. 1. VERIFY THE LENS OFFSET ON THE FACTORY BRACKET.',
    '8.  WALL 206" x 106 1/2" FIELD-MEASURED. REAR WALL MEASURED 106 3/8" - CONFIRM THE 1/8".',
    "9.  ALL DIMENSIONS IN INCHES UNLESS NOTED."],
    X0 - P(122) + P(760), BAND, P(680), 280)

s.title_block(
    "ALLSHORES\nExecutive Meeting Room\nFront Wall\nDual Display Elevation",
    'SCALE: NTS\nWALL: 17\'-2" W x 8\'-10 1/2" H\nDISPLAY: (2) 98" SAMSUNG\n'
    "MOUNT: XTM1U + FCAXV1U\nCAMERA: AVER CAM570 BELOW DISPLAYS",
    "DATE CREATED: 26/08/24\nCREATED BY: WW\nRev. 3 - FIELD MEASURED")

out = "/home/user/FLOW/drawings/allshores-front-wall-dual-display.lucid.json"
s.dump(out, "Front Wall Elevation")

# ------------------------------------------------------------------- sanity
assert MARGIN + ARRAY_W + MARGIN == WALL_W
assert D1_CL + (D2_CL - D1_CL) + (WALL_W - D2_CL) == WALL_W
assert CRED_H + (DISP_BTM - CRED_H) + DISP_H + (WALL_H - DISP_TOP) == WALL_H
assert A_X + (B_X - A_X) + (C_X - B_X) + (D_X - C_X) + (WALL_W - D_X) == WALL_W
assert CAM_TOP <= DISP_BTM and CAM_BTM >= CRED_H
for k, v in zip("ABCD", (A_X, B_X, C_X, D_X)):
    assert (D1_L <= v <= D1_L + DISP_W) or (D2_L <= v <= D2_L + DISP_W), k
print(f"wrote {out} | {len(s.shapes)} shapes, {len(s.lines)} lines")
print(f"wall {frac(WALL_W)} x {frac(WALL_H)} | head clearance {frac(WALL_H-DISP_TOP)}")
print(f"vertical chain {frac(CRED_H)} + {frac(DISP_BTM-CRED_H)} + {frac(DISP_H)} + "
      f"{frac(WALL_H-DISP_TOP)} = {frac(WALL_H)}")
print(f"device chain {frac(A_X)} + {frac(B_X-A_X)} + {frac(C_X-B_X)} + {frac(D_X-C_X)} + "
      f"{frac(WALL_W-D_X)} = {frac(WALL_W)}")
print(f"devices at {frac(DEV_AFF)} AFF - all behind displays (BTM {frac(DISP_BTM)})")
print(f"content bottom {s.content_bottom():.0f} vs sheet inner {P(26)+s.SHEET_H-P(52):.0f}")
