#!/usr/bin/env python3
"""
ALLSHORES Executive Meeting Room - Front Wall Dual Display Elevation (Rev. 2).

Redraws the Rev. 1 front wall on the same sheet as the rear wall elevation.
All equipment sizes and mounting heights are carried from Rev. 1; nothing on
this wall has been field-measured yet, which the notes state.

Rev. 1 labels 17" clear at each side and 206" overall, which leaves 1/4"
unaccounted for across the pair (17 + 85 7/8 + 85 7/8 + 17 = 205 3/4). That
quarter inch is drawn as a gap between the displays so both 17" callouts stay
exact - see DISP_GAP.
"""
from fractions import Fraction as F
from elevation_sheet import Sheet, frac

# ------------------------------------------------- field dims (from Rev. 1)
WALL_W, WALL_H = F(206), F(106)

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
CAM_BTM = CAM_LENS_CL - CAM_H / 2                     # lens taken at body center
CAM_TOP = CAM_BTM + CAM_H

CRED_H = F(33) + F(1, 4)
CRED_W = WALL_W                                       # shown full width

# the wall sits lower on the sheet than the rear wall's, to clear the second
# dimension chain carrying the display centerlines
s = Sheet(WALL_W, WALL_H, y0=172)
P, X, Y, L = s.P, s.X, s.Y, s.L
FLOOR, X0, Y0 = s.FLOOR, s.X0, s.Y0

s.border()
# bottom-left is credenza and top-left is only 5 1/8" of wall, so the wall name
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

# -------------------------------------------------------------------- camera
cx0 = X(WALL_W / 2 - CAM_W / 2)
s.box(cx0, Y(CAM_TOP), L(CAM_W), L(CAM_H), width=1.8, fill="#ffffff")
cam_mid = (Y(CAM_TOP) + Y(CAM_BTM)) / 2
s.label(cx0 + L(CAM_W) + P(96), cam_mid,
        'AVer CAM570 4K DUAL LENS\nLENS CL 46" AFF', 280, 62)
s.seg(cx0 + L(CAM_W), cam_mid, cx0 + L(CAM_W) + P(14), cam_mid, "#6a6a6a", 0.9)

# ------------------------------------------------------------------ credenza
s.box(X(0), Y(CRED_H), L(CRED_W), L(CRED_H), width=2.0, fill="#f4f2ee")
s.label(X(WALL_W / 2), Y(CRED_H) + L(CRED_H) / 2, "CREDENZA", 320, 60)

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

s.hdim(0, WALL_W, FLOOR + P(90), frac(WALL_W))

s.vdim(0, WALL_H, X0 - P(122), frac(WALL_H), X(0))
DIMX = d1x - P(46)
s.vdim(0, DISP_BTM, DIMX, frac(DISP_BTM) + " AFF", d1x)
s.vdim(DISP_BTM, DISP_TOP, DIMX, frac(DISP_H), d1x)
s.vdim(DISP_TOP, WALL_H, DIMX, frac(WALL_H - DISP_TOP), d1x)

RDIM = X(WALL_W) + P(60)
s.vdim(0, CRED_H, RDIM, frac(CRED_H), X(WALL_W), side="right")
s.vdim(CRED_H, DISP_BTM, RDIM, frac(DISP_BTM - CRED_H), X(WALL_W), side="right")

# ------------------------------------------------------- equipment schedule
BAND = FLOOR + P(150)
s.schedule(["ITEM", "EQUIPMENT", "SIZE", "MOUNTING"],
           [("1", '(2) 98" SAMSUNG', '85 7/8" W x 48 7/8" H', 'BTM 52" AFF'),
            ("2", "XTM1U + FCAXV1U", '42 3/4" x 24 1/2"', "CENTERED, EACH DISPLAY"),
            ("3", "AVER CAM570 4K DUAL LENS", '6 3/4" W x 7 1/2" H', 'LENS CL 46" AFF'),
            ("4", "CREDENZA", '33 1/4" H x FULL WIDTH', "FLOOR")],
           X0 - P(122), BAND, P(720), 220)

s.notes([
    "NOTES",
    '1.  DISPLAYS SET OUT AS A PAIR - 17" CLEAR EACH SIDE, 1/4" BETWEEN DISPLAYS. BTM 52" AFF.',
    '2.  DISPLAY CENTERLINES 59 15/16" FROM EACH SIDE WALL, 86 1/8" CENTER TO CENTER.',
    '3.  REV. 1 GIVES 17" EACH SIDE AND 206" OVERALL, WHICH LEAVES 1/4" ACROSS THE PAIR. IT IS DRAWN AS',
    '     THE GAP BETWEEN DISPLAYS. CONFIRM - THE ALTERNATIVE IS 17 1/8" MARGINS WITH THE DISPLAYS TOUCHING.',
    '4.  AVER CAM570 CENTERED ON WALL BELOW THE DISPLAYS. LENS CL 46" AFF PER REV. 1; VERIFY THE LENS',
    "     OFFSET ON THE FACTORY BRACKET TO SET A MOUNTING HEIGHT.",
    '5.  CREDENZA SHOWN 33 1/4" HIGH x FULL WALL WIDTH - CONFIRM WIDTH AND SETBACK.',
    '6.  REV. 1 CARRIED FOUR DEVICE DIMENSIONS (80 1/2", 4", 48", 39 3/4"). THE DEVICES ARE NOT YET',
    "     IDENTIFIED, SO THEY ARE NOT SHOWN. THE REAR WALL SCHEDULE FORMAT IS READY FOR THEM.",
    '7.  WALL SIZE IS FROM REV. 1 AND NOT FIELD-MEASURED. THE REAR WALL MEASURED 8\'-10 3/8" FLOOR TO',
    '     CEILING - CONFIRM WHETHER THIS WALL IS 106" OR 106 3/8".',
    "8.  ALL DIMENSIONS IN INCHES UNLESS NOTED."],
    X0 - P(122) + P(760), BAND, P(680), 300)

s.title_block(
    "ALLSHORES\nExecutive Meeting Room\nFront Wall\nDual Display Elevation",
    'SCALE: NTS\nWALL: 17\'-2" W x 8\'-10" H\nDISPLAY: (2) 98" SAMSUNG\n'
    "MOUNT: XTM1U + FCAXV1U\nCAMERA: AVER CAM570 BELOW DISPLAYS",
    "DATE CREATED: 26/08/24\nCREATED BY: WW\nRev. 2")

out = "/home/user/FLOW/drawings/allshores-front-wall-dual-display.lucid.json"
s.dump(out, "Front Wall Elevation")

# ------------------------------------------------------------------- sanity
assert MARGIN + ARRAY_W + MARGIN == WALL_W
assert D1_CL + (D2_CL - D1_CL) + (WALL_W - D2_CL) == WALL_W
assert CRED_H + (DISP_BTM - CRED_H) + DISP_H + (WALL_H - DISP_TOP) == WALL_H
assert CAM_TOP <= DISP_BTM and CAM_BTM >= CRED_H, (CAM_BTM, CAM_TOP)
print(f"wrote {out} | {len(s.shapes)} shapes, {len(s.lines)} lines")
print(f"gap between displays {frac(DISP_GAP)} | array {frac(ARRAY_W)}")
print(f"display CLs {frac(D1_CL)} and {frac(D2_CL)}, {frac(D2_CL-D1_CL)} apart")
print(f"camera body {frac(CAM_BTM)} - {frac(CAM_TOP)} AFF (credenza top {frac(CRED_H)}, "
      f"display BTM {frac(DISP_BTM)})")
print(f"vertical chain {frac(CRED_H)} + {frac(DISP_BTM-CRED_H)} + {frac(DISP_H)} + "
      f"{frac(WALL_H-DISP_TOP)} = {frac(WALL_H)}")
print(f"content bottom {s.content_bottom():.0f} vs sheet inner {P(26)+s.SHEET_H-P(52):.0f}")
