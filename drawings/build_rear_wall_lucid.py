#!/usr/bin/env python3
"""
ALLSHORES Executive Meeting Room - Rear Wall Single Display Elevation (Rev. 3).

Equipment (manufacturer dimensions):
  Display  Samsung QM85C / LH85QMCEBGCXGO, 1904.3 x 1085.3 mm = 75" x 42 3/4"
  Mount    Chief Fusion LTM1U, 34 3/4" W x 17" H
  Camera   AVer CAM570 4K dual lens, 170.8 x 190.5 mm = 6 3/4" x 7 1/2",
           on the factory wall mount bracket, centered above the display
"""
from fractions import Fraction as F
from elevation_sheet import Sheet, frac, ftin

# ---------------------------------------------------------------- field dims
WALL_W = F(224) + F(1, 2)                             # 18'-8 1/2", field-measured
WALL_H = F(106) + F(3, 8)                             # 8'-10 3/8", field-measured

DISP_W, DISP_H = F(75), F(42) + F(3, 4)               # Samsung QM85C
DISP_BTM = F(52)                                      # matches the front wall
DISP_L = (WALL_W - DISP_W) / 2                        # centered on wall
DISP_TOP = DISP_BTM + DISP_H

MOUNT_W, MOUNT_H = F(34) + F(3, 4), F(17)             # Chief Fusion LTM1U

CAM_W, CAM_H = F(6) + F(3, 4), F(7) + F(1, 2)         # AVer CAM570
CAM_GAP = F(1)                                        # clear above display top
CAM_BTM = DISP_TOP + CAM_GAP                          # the number that gets mounted to
CAM_TOP = CAM_BTM + CAM_H

AFF_CLUSTER = F(65) + F(11, 16)                       # A and B
DATA_AFF = F(65) + F(15, 16)                          # C sits 1/4" proud of A/B
LV_X, SW_X, DATA_X = F(118) + F(29, 32), F(126) + F(9, 32), F(132) + F(25, 32)
P4_X, P4_AFF = F(47) + F(19, 32), F(48) + F(7, 32)
TS_X, TS_AFF = F(49) + F(15, 16), F(62) + F(15, 32)   # CL; 4'-0 13/16" was the left edge

# DOOR_X and DOOR_H are field-measured to the OUTSIDE of the casing. Casing face
# is assumed, so it shifts only the leaf inside the assembly - every dimension
# that matters to the AV scope is taken to the casing and stays exact.
DOOR_X, DOOR_H, DOOR_LEAF = F(169) + F(15, 16), F(94) + F(1, 2), F(36)
CASING = F(2)
DOOR_W = DOOR_LEAF + 2 * CASING

SZ = {"lv": (F(9, 2), F(9, 2)), "sw": (F(11, 4), F(9, 2)), "data": (F(9, 2), F(9, 2)),
      "p4": (F(8) + F(3, 16), F(9, 2)), "ts": (F(9, 2), F(13, 4))}

s = Sheet(WALL_W, WALL_H)
P, X, Y, L = s.P, s.X, s.Y, s.L
FLOOR, X0, Y0 = s.FLOOR, s.X0, s.Y0

s.border()
s.wall("REAR WALL")

# ---------------------------------------------------------------------- door
s.box(X(DOOR_X), Y(DOOR_H), L(DOOR_W), L(DOOR_H), width=1.8, fill="#f4f2ee")
s.box(X(DOOR_X + CASING), Y(DOOR_H - CASING), L(DOOR_LEAF), L(DOOR_H - CASING),
      "#9a9a9a", 0.9)
s.box(X(DOOR_X + CASING + DOOR_LEAF) - P(24), Y(36) - P(6), P(12), P(12),
      "#1a1a1a", 1.4, sh="circle")
s.label(X(DOOR_X + DOOR_W / 2), Y(DOOR_H) + P(30), "DOOR", 250, 52)
s.label(X(DOOR_X + DOOR_W / 2), Y(DOOR_H) + P(62), '36" LEAF  |  7\'-10 1/2" HIGH', 330, 45)

# ------------------------------------------------------------------- display
dx, dy, dw, dh = X(DISP_L), Y(DISP_TOP), L(DISP_W), L(DISP_H)
s.box(dx, dy, dw, dh, width=2.2, fill="#ffffff")
s.label(dx + dw / 2, dy + P(30), '85" SAMSUNG QMC  |  LH85QMCEBGCXGO', 660, 70)
s.label(dx + dw / 2, dy + P(60), '75" W x 42 3/4" H  |  BTM 52" AFF', 620, 54)

mx, my = dx + (dw - L(MOUNT_W)) / 2, dy + P(81)
s.box(mx, my, L(MOUNT_W), L(MOUNT_H), "#4a4a4a", 1.4, "dashed")
s.label(mx + L(MOUNT_W) / 2, my + P(24), "CHIEF FUSION LTM1U", 440, 48)
s.label(mx + L(MOUNT_W) / 2, my + P(48), '34 3/4" x 17"', 340, 44)

# -------------------------------------------------------------------- camera
cx0 = X(WALL_W / 2 - CAM_W / 2)
s.box(cx0, Y(CAM_TOP), L(CAM_W), L(CAM_H), width=1.8, fill="#ffffff")
cam_mid = (Y(CAM_TOP) + Y(CAM_BTM)) / 2
s.label(cx0 + L(CAM_W) + P(94), cam_mid,
        'AVer CAM570 4K DUAL LENS\nON FACTORY BRACKET  |  BTM 95 3/4" AFF', 270, 62)
s.seg(cx0 + L(CAM_W), cam_mid, cx0 + L(CAM_W) + P(14), cam_mid, "#6a6a6a", 0.9)

# ------------------------------------------------------------------- devices
def device(key, cx, aff):
    w, h = SZ[key]
    x, y = X(cx) - L(w) / 2, Y(aff) - L(h) / 2
    s.box(x, y, L(w), L(h), width=1.6, fill="#ffffff")
    return y, L(h)

TAG = P(22)
for key, kx, aff, letter in (("lv", LV_X, AFF_CLUSTER, "A"), ("sw", SW_X, AFF_CLUSTER, "B"),
                             ("data", DATA_X, DATA_AFF, "C")):
    y, h = device(key, kx, aff)
    s.seg(X(kx), y + h, X(kx), y + h + P(16), "#9a9a9a", 0.8, "dashed")
    s.box(X(kx) - TAG / 2, y + h + P(16), TAG, TAG, width=1.4, fill="#ffffff",
          text=letter, sh="circle")

for key, kx, aff, letter, d in (("p4", P4_X, P4_AFF, "D", -1), ("ts", TS_X, TS_AFF, "E", 1)):
    device(key, kx, aff)
    w = L(SZ[key][0])
    ccx = X(kx) + d * (w / 2 + P(20))
    s.box(ccx - TAG / 2, Y(aff) - TAG / 2, TAG, TAG, width=1.4, fill="#ffffff",
          text=letter, sh="circle")

# ---------------------------------------------------------------- dimensions
TOP1 = Y0 - P(64)
s.hdim(0, DISP_L, TOP1, frac(DISP_L), Y(WALL_H))
s.hdim(DISP_L, DISP_L + DISP_W, TOP1, frac(DISP_W), dy)
s.hdim(DISP_L + DISP_W, DOOR_X, TOP1, frac(DOOR_X - DISP_L - DISP_W), dy)
s.hdim(DOOR_X, DOOR_X + DOOR_W, TOP1, frac(DOOR_W), Y(DOOR_H))
s.hdim(DOOR_X + DOOR_W, WALL_W, TOP1, frac(WALL_W - DOOR_X - DOOR_W), Y(WALL_H))

BOT0, BOT1, BOT2 = FLOOR + P(40), FLOOR + P(100), FLOOR + P(156)
s.hdim(LV_X, SW_X, BOT0, frac(SW_X - LV_X), Y(AFF_CLUSTER))
s.hdim(SW_X, DATA_X, BOT0, frac(DATA_X - SW_X))
s.hdim(0, P4_X, BOT1, frac(P4_X), Y(P4_AFF))
s.hdim(P4_X, LV_X, BOT1, frac(LV_X - P4_X), Y(AFF_CLUSTER))
s.hdim(LV_X, DATA_X, BOT1, frac(DATA_X - LV_X))
s.hdim(DATA_X, WALL_W, BOT1, frac(WALL_W - DATA_X), Y(AFF_CLUSTER))
s.label(X(WALL_W / 2), BOT1 + P(30), "EXISTING DEVICE CENTERLINES FROM LEFT WALL", 900, 43)
s.hdim(0, WALL_W, BOT2, frac(WALL_W))

s.vdim(0, WALL_H, X0 - P(122), frac(WALL_H), X(0))
# display heights dimension against the display itself, not the sheet margin,
# so the floor-to-BTM dimension reads unambiguously
DIMX = dx - P(46)
s.vdim(0, DISP_BTM, DIMX, frac(DISP_BTM) + " AFF", dx)
s.vdim(DISP_BTM, DISP_TOP, DIMX, frac(DISP_H), dx)
s.vdim(DISP_TOP, WALL_H, DIMX, frac(WALL_H - DISP_TOP), dx)
s.vdim(0, DOOR_H, X(WALL_W) + P(60), frac(DOOR_H), X(DOOR_X + DOOR_W), side="right")

# ----------------------------------------------------------- device schedule
BAND = FLOOR + P(215)
s.schedule(["KEY", "EXISTING WALL DEVICE", "FROM LEFT WALL (CL)", "AFF (CL)"],
           [("A", "LV CABLE BOX", ftin(LV_X), ftin(AFF_CLUSTER)),
            ("B", "LIGHT SWITCH", ftin(SW_X), ftin(AFF_CLUSTER)),
            ("C", "DUAL-PORT DATA OUTLET", ftin(DATA_X), ftin(DATA_AFF)),
            ("D", "4x LIGHT SWITCH PANEL", ftin(P4_X), ftin(P4_AFF)),
            ("E", "THERMOSTAT", ftin(TS_X), ftin(TS_AFF))],
           X0 - P(122), BAND, P(720), 264)

s.notes([
    "NOTES",
    '1.  DISPLAY CENTERED ON WALL - 74 3/4" CLEAR EACH SIDE. BTM 52" AFF MATCHES THE FRONT-OF-ROOM DUAL DISPLAY WALL.',
    '2.  AVER CAM570 ON FACTORY WALL MOUNT BRACKET, CENTERED ON DISPLAY, 1" ABOVE DISPLAY TOP: BTM 95 3/4" AFF.',
    '3.  CAMERA LEAVES 3 1/8" TO CEILING; 4 1/8" IS THE MAXIMUM POSSIBLE AT BTM 52" AFF. CEILING IS FLAT AT 8\'-10 3/8".',
    "4.  DEVICES A, B AND C FALL BEHIND THE DISPLAY. LV BOX (A) IS INTENDED; RELOCATE LIGHT SWITCH (B) CLEAR OF DISPLAY.",
    '5.  DOOR: 36" LEAF, 7\'-10 1/2" HIGH. 14\'-1 15/16" IS TO THE OUTSIDE OF THE CASING; CASING FACE ASSUMED 2".',
    "6.  DEVICE DIMENSIONS ARE TO PLATE CENTERLINE. NO FURNITURE ON THIS WALL.",
    "7.  WALL AND DEVICE DIMENSIONS FIELD-MEASURED. DIMENSIONS IN INCHES UNLESS NOTED."],
    X0 - P(122) + P(760), BAND, P(680), 260)

s.title_block(
    "ALLSHORES\nExecutive Meeting Room\nRear Wall\nSingle Display Elevation",
    'SCALE: NTS\nWALL: 18\'-8 1/2" W x 8\'-10 3/8" H\nDISPLAY: (1) SAMSUNG QM85C 85"\n'
    "MOUNT: CHIEF FUSION LTM1U\nCAMERA: AVER CAM570 ABOVE DISPLAY",
    "DATE CREATED: 26/08/24\nCREATED BY: WW\nRev. 3 - FIELD MEASURED")

out = "/home/user/FLOW/drawings/allshores-rear-wall-single-display.lucid.json"
s.dump(out, "Rear Wall Elevation")

# ------------------------------------------------------------------- sanity
chain = DISP_L + DISP_W + (DOOR_X - DISP_L - DISP_W) + DOOR_W + (WALL_W - DOOR_X - DOOR_W)
assert chain == WALL_W, chain
assert CAM_TOP <= WALL_H, CAM_TOP
print(f"wrote {out} | {len(s.shapes)} shapes, {len(s.lines)} lines")
print(f"display {frac(DISP_L)} .. {frac(DISP_L+DISP_W)}  top {frac(DISP_TOP)} AFF")
print(f"camera  BTM {frac(CAM_BTM)} AFF  top {frac(CAM_TOP)}  head {frac(WALL_H-CAM_TOP)}")
print(f"disp R -> door casing {frac(DOOR_X-DISP_L-DISP_W)} | chain closes on {frac(chain)}")
print(f"content bottom {s.content_bottom():.0f} vs sheet inner {P(26)+s.SHEET_H-P(52):.0f}")
