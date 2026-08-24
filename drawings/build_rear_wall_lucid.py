#!/usr/bin/env python3
"""
ALLSHORES Executive Meeting Room - Rear Wall Single Display Elevation.

Emits Lucid Standard Import JSON. Field dimensions are held as exact
Fractions of an inch so the dimension chains close on the wall width
instead of drifting on floating point.

Equipment (manufacturer dimensions):
  Display  Samsung QM85C / LH85QMCEBGCXGO, 1904.3 x 1085.3 mm = 75" x 42 3/4"
  Mount    Chief Fusion LTM1U, 34 3/4" W x 17" H
  Camera   AVer CAM570 4K dual lens, 170.8 x 190.5 mm = 6 3/4" x 7 1/2",
           on the factory wall mount bracket, centered above the display
"""
import json
from fractions import Fraction as F

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

# ------------------------------------------------------------------- drawing
K = 1.6                       # canvas blow-up so Lucid's auto-fit type reads small
S = F(56, 10) * F(8, 5)       # px per inch
X0, Y0 = 190 * K, 132 * K
SHEET_W, SHEET_H = 1900 * K, 1200 * K
TB_X = 1540 * K

def P(v):   return v * K
def X(i):   return float(X0 + F(i) * S)
def Y(aff): return float(Y0 + (WALL_H - F(aff)) * S)
def L(i):   return float(F(i) * S)

FLOOR = Y(0)

def frac(v):
    v = F(v); whole, rem = int(v), v - int(v)
    if rem == 0:
        return f'{whole}"'
    return f'{whole} {rem.numerator}/{rem.denominator}"' if whole else f'{rem.numerator}/{rem.denominator}"'

def ftin(v):
    v = F(v); feet, rem = int(v // 12), v - int(v // 12) * 12
    whole, fr = int(rem), rem - int(rem)
    s = f"{feet}'-{whole}"
    if fr:
        s += f" {fr.numerator}/{fr.denominator}"
    return s + '"'

shapes, lines = [], []
n = [0]
def sid(p):
    n[0] += 1
    return f"{p}{n[0]}"

def box(x, y, w, h, stroke="#1a1a1a", width=1.5, style="solid", fill=None, text=None, sh="rectangle"):
    s = {"id": sid("s"), "type": sh,
         "boundingBox": {"x": round(x, 1), "y": round(y, 1), "w": round(w, 1), "h": round(h, 1)},
         "style": {"stroke": {"color": stroke, "width": width, "style": style},
                   "fill": {"type": "color", "color": fill or "#ffffff00"}},
         "text": text if text is not None else ""}   # empty shapes draw a "Text" placeholder
    shapes.append(s)
    return s["id"]

def label(cx, cy, txt, w, h):
    """Lucid scales text to fill its box, so h is what actually sets the type size."""
    shapes.append({"id": sid("t"), "type": "text",
                   "boundingBox": {"x": round(cx - w / 2, 1), "y": round(cy - h / 2, 1),
                                   "w": w, "h": h},
                   "text": txt})

def seg(x1, y1, x2, y2, color="#1a1a1a", width=1.2, style="solid", txt=None, side="top"):
    ln = {"id": sid("l"), "lineType": "straight",
          "endpoint1": {"type": "positionEndpoint", "style": "none",
                        "position": {"x": round(x1, 1), "y": round(y1, 1)}},
          "endpoint2": {"type": "positionEndpoint", "style": "none",
                        "position": {"x": round(x2, 1), "y": round(y2, 1)}},
          "stroke": {"color": color, "width": width, "style": style}}
    if txt:
        ln["text"] = [{"text": txt, "position": 0.5, "side": side}]
    lines.append(ln)

TICK = P(6)

def hdim(i1, i2, y, lab, ext_from=None):
    x1, x2 = X(i1), X(i2)
    if ext_from is not None:
        seg(x1, ext_from, x1, y + P(9), "#9a9a9a", 0.8)
        seg(x2, ext_from, x2, y + P(9), "#9a9a9a", 0.8)
    seg(x1, y, x2, y, "#1a1a1a", 1.2, txt=lab)
    seg(x1, y - TICK, x1, y + TICK, "#1a1a1a", 1.5)
    seg(x2, y - TICK, x2, y + TICK, "#1a1a1a", 1.5)

def vdim(a1, a2, x, lab, ext_to=None, side="left"):
    y1, y2 = Y(a1), Y(a2)
    if ext_to is not None:
        stub = x - P(9) if side == "left" else x + P(9)
        seg(stub, y1, ext_to, y1, "#9a9a9a", 0.8)
        seg(stub, y2, ext_to, y2, "#9a9a9a", 0.8)
    seg(x, y1, x, y2, "#1a1a1a", 1.2, txt=lab)
    seg(x - TICK, y1, x + TICK, y1, "#1a1a1a", 1.5)
    seg(x - TICK, y2, x + TICK, y2, "#1a1a1a", 1.5)

# --------------------------------------------------------------------- sheet
box(P(14), P(14), SHEET_W - P(28), SHEET_H - P(28), width=2.5)
box(P(26), P(26), SHEET_W - P(52), SHEET_H - P(52), width=1.2)
seg(TB_X, P(26), TB_X, SHEET_H - P(26), "#1a1a1a", 1.2)

# ---------------------------------------------------------------------- wall
box(X(0), Y(WALL_H), L(WALL_W), L(WALL_H), width=2.2, fill="#ffffff")
label(X(0) + P(90), FLOOR - P(26), "REAR WALL", 260, 52)

box(X(DOOR_X), Y(DOOR_H), L(DOOR_W), L(DOOR_H), width=1.8, fill="#f4f2ee")
box(X(DOOR_X + CASING), Y(DOOR_H - CASING), L(DOOR_LEAF), L(DOOR_H - CASING),
    "#9a9a9a", 0.9)
box(X(DOOR_X + CASING + DOOR_LEAF) - P(24), Y(36) - P(6), P(12), P(12),
    "#1a1a1a", 1.4, sh="circle")
label(X(DOOR_X + DOOR_W / 2), Y(DOOR_H) + P(30), "DOOR", 250, 52)
label(X(DOOR_X + DOOR_W / 2), Y(DOOR_H) + P(62), '36" LEAF  |  7\'-10 1/2" HIGH', 330, 45)

# ------------------------------------------------------------------- display
dx, dy, dw, dh = X(DISP_L), Y(DISP_TOP), L(DISP_W), L(DISP_H)
box(dx, dy, dw, dh, width=2.2, fill="#ffffff")
label(dx + dw / 2, dy + P(30), '85" SAMSUNG QMC  |  LH85QMCEBGCXGO', 660, 70)
label(dx + dw / 2, dy + P(60), '75" W x 42 3/4" H  |  BTM 52" AFF', 620, 54)

mx, my = dx + (dw - L(MOUNT_W)) / 2, dy + P(81)
box(mx, my, L(MOUNT_W), L(MOUNT_H), "#4a4a4a", 1.4, "dashed")
label(mx + L(MOUNT_W) / 2, my + P(24), "CHIEF FUSION LTM1U", 440, 48)
label(mx + L(MOUNT_W) / 2, my + P(48), '34 3/4" x 17"', 340, 44)

# -------------------------------------------------------------------- camera
cx0 = X(WALL_W / 2 - CAM_W / 2)
box(cx0, Y(CAM_TOP), L(CAM_W), L(CAM_H), width=1.8, fill="#ffffff")
cam_mid = (Y(CAM_TOP) + Y(CAM_BTM)) / 2
label(cx0 + L(CAM_W) + P(94), cam_mid,
      'AVer CAM570 4K DUAL LENS\nON FACTORY BRACKET  |  BTM 95 3/4" AFF', 270, 62)
seg(cx0 + L(CAM_W), cam_mid, cx0 + L(CAM_W) + P(14), cam_mid, "#6a6a6a", 0.9)

# ------------------------------------------------------------------- devices
def device(key, cx, aff):
    w, h = SZ[key]
    x, y = X(cx) - L(w) / 2, Y(aff) - L(h) / 2
    box(x, y, L(w), L(h), width=1.6, fill="#ffffff")
    return y, L(h)

TAG = P(22)
for key, kx, aff, letter in (("lv", LV_X, AFF_CLUSTER, "A"), ("sw", SW_X, AFF_CLUSTER, "B"),
                             ("data", DATA_X, DATA_AFF, "C")):
    y, h = device(key, kx, aff)
    seg(X(kx), y + h, X(kx), y + h + P(16), "#9a9a9a", 0.8, "dashed")
    box(X(kx) - TAG / 2, y + h + P(16), TAG, TAG, width=1.4, fill="#ffffff", text=letter, sh="circle")

for key, kx, aff, letter, d in (("p4", P4_X, P4_AFF, "D", -1), ("ts", TS_X, TS_AFF, "E", 1)):
    device(key, kx, aff)
    w = L(SZ[key][0])
    ccx = X(kx) + d * (w / 2 + P(20))
    box(ccx - TAG / 2, Y(aff) - TAG / 2, TAG, TAG, width=1.4, fill="#ffffff", text=letter, sh="circle")

# ---------------------------------------------------------------- dimensions
TOP1 = Y0 - P(64)
hdim(0, DISP_L, TOP1, frac(DISP_L), Y(WALL_H))
hdim(DISP_L, DISP_L + DISP_W, TOP1, frac(DISP_W), dy)
hdim(DISP_L + DISP_W, DOOR_X, TOP1, frac(DOOR_X - DISP_L - DISP_W), dy)
hdim(DOOR_X, DOOR_X + DOOR_W, TOP1, frac(DOOR_W), Y(DOOR_H))
hdim(DOOR_X + DOOR_W, WALL_W, TOP1, frac(WALL_W - DOOR_X - DOOR_W), Y(WALL_H))

BOT0, BOT1, BOT2 = FLOOR + P(40), FLOOR + P(100), FLOOR + P(156)
hdim(LV_X, SW_X, BOT0, frac(SW_X - LV_X), Y(AFF_CLUSTER))
hdim(SW_X, DATA_X, BOT0, frac(DATA_X - SW_X))
hdim(0, P4_X, BOT1, frac(P4_X), Y(P4_AFF))
hdim(P4_X, LV_X, BOT1, frac(LV_X - P4_X), Y(AFF_CLUSTER))
hdim(LV_X, DATA_X, BOT1, frac(DATA_X - LV_X))
hdim(DATA_X, WALL_W, BOT1, frac(WALL_W - DATA_X), Y(AFF_CLUSTER))
label(X(WALL_W / 2), BOT1 + P(30), "EXISTING DEVICE CENTERLINES FROM LEFT WALL", 900, 43)
hdim(0, WALL_W, BOT2, frac(WALL_W))

vdim(0, WALL_H, X0 - P(122), frac(WALL_H), X(0))
# display heights dimension against the display itself, not the sheet margin,
# so the floor-to-BTM dimension reads unambiguously
DIMX = dx - P(46)
vdim(0, DISP_BTM, DIMX, frac(DISP_BTM) + " AFF", dx)
vdim(DISP_BTM, DISP_TOP, DIMX, frac(DISP_H), dx)
vdim(DISP_TOP, WALL_H, DIMX, frac(WALL_H - DISP_TOP), dx)
vdim(0, DOOR_H, X(WALL_W) + P(60), frac(DOOR_H), X(DOOR_X + DOOR_W), side="right")

# ----------------------------------------------------------- device schedule
rows = [("A", "LV CABLE BOX", ftin(LV_X), ftin(AFF_CLUSTER)),
        ("B", "LIGHT SWITCH", ftin(SW_X), ftin(AFF_CLUSTER)),
        ("C", "DUAL-PORT DATA OUTLET", ftin(DATA_X), ftin(DATA_AFF)),
        ("D", "4x LIGHT SWITCH PANEL", ftin(P4_X), ftin(P4_AFF)),
        ("E", "THERMOSTAT", ftin(TS_X), ftin(TS_AFF))]
cells = [{"xPosition": c, "yPosition": 0, "text": h,
          "style": {"fill": {"type": "color", "color": "#efeeea"}}}
         for c, h in enumerate(["KEY", "EXISTING WALL DEVICE", "FROM LEFT WALL (CL)", "AFF (CL)"])]
for r, row in enumerate(rows):
    cells += [{"xPosition": c, "yPosition": r + 1, "text": v} for c, v in enumerate(row)]
BAND = FLOOR + P(215)
shapes.append({"id": sid("tbl"), "type": "table",
               "boundingBox": {"x": round(X0 - P(122), 1), "y": round(BAND, 1),
                               "w": round(P(720), 1), "h": 264},
               "rowCount": 6, "colCount": 4, "cells": cells})

notes = "\n".join([
    "NOTES",
    '1.  DISPLAY CENTERED ON WALL - 74 3/4" CLEAR EACH SIDE. BTM 52" AFF MATCHES THE FRONT-OF-ROOM DUAL DISPLAY WALL.',
    '2.  AVER CAM570 ON FACTORY WALL MOUNT BRACKET, CENTERED ON DISPLAY, 1" ABOVE DISPLAY TOP: BTM 95 3/4" AFF.',
    '3.  CAMERA LEAVES 3 1/8" TO CEILING; 4 1/8" IS THE MAXIMUM POSSIBLE AT BTM 52" AFF. CEILING IS FLAT AT 8\'-10 3/8".',
    "4.  DEVICES A, B AND C FALL BEHIND THE DISPLAY. LV BOX (A) IS INTENDED; RELOCATE LIGHT SWITCH (B) CLEAR OF DISPLAY.",
    '5.  DOOR: 36" LEAF, 7\'-10 1/2" HIGH. 14\'-1 15/16" IS TO THE OUTSIDE OF THE CASING; CASING FACE ASSUMED 2".',
    "6.  DEVICE DIMENSIONS ARE TO PLATE CENTERLINE. NO FURNITURE ON THIS WALL.",
    "7.  WALL AND DEVICE DIMENSIONS FIELD-MEASURED. DIMENSIONS IN INCHES UNLESS NOTED."])

shapes.append({"id": sid("t"), "type": "text",
               "boundingBox": {"x": round(X0 - P(122) + P(760), 1), "y": round(BAND, 1),
                               "w": round(P(680), 1), "h": 260},
               "text": notes})

# --------------------------------------------------------------- title block
TBC = TB_X + (SHEET_W - P(26) - TB_X) / 2
label(TBC, P(112), "ALLSHORES", 460, 86)
seg(TB_X + P(30), P(152), SHEET_W - P(56), P(152), "#d0d0d0", 1)
label(TBC, P(272), "ALLSHORES\nExecutive Meeting Room\nRear Wall\nSingle Display Elevation", 470, 272)
box(TBC - P(66), P(540), P(132), P(132), "#d8d8d8", 1.2, sh="circle", text="PSI.")
label(TBC, P(700), "PRECISE SYSTEMS INTEGRATION", 450, 38)
seg(TB_X + P(30), P(790), SHEET_W - P(56), P(790), "#d0d0d0", 1)
label(TBC, P(880), 'SCALE: NTS\nWALL: 18\'-8 1/2" W x 8\'-10 3/8" H\nDISPLAY: (1) SAMSUNG QM85C 85"\n'
                   "MOUNT: CHIEF FUSION LTM1U\nCAMERA: AVER CAM570 ABOVE DISPLAY", 470, 200)
seg(TB_X + P(30), P(960), SHEET_W - P(56), P(960), "#d0d0d0", 1)
label(TBC, P(1035), "DATE CREATED: 26/08/24\nCREATED BY: WW\nRev. 3 - FIELD MEASURED", 470, 120)

doc = {"version": 1, "pages": [{"id": "page1", "title": "Rear Wall Elevation",
                                "shapes": shapes, "lines": lines}]}
out = "/home/user/FLOW/drawings/allshores-rear-wall-single-display.lucid.json"
open(out, "w").write(json.dumps(doc, separators=(",", ":")))

# ------------------------------------------------------------------- sanity
chain = DISP_L + DISP_W + (DOOR_X - DISP_L - DISP_W) + DOOR_W + (WALL_W - DOOR_X - DOOR_W)
assert chain == WALL_W, chain
assert CAM_TOP <= WALL_H, CAM_TOP
bottom = max(s["boundingBox"]["y"] + s["boundingBox"]["h"] for s in shapes[2:])
print(f"wrote {out} | {len(shapes)} shapes, {len(lines)} lines")
print(f"display {frac(DISP_L)} .. {frac(DISP_L+DISP_W)}  top {frac(DISP_TOP)} AFF")
print(f"camera  BTM {frac(CAM_BTM)} AFF  top {frac(CAM_TOP)}  head {frac(WALL_H-CAM_TOP)}")
print(f"disp R -> door jamb {frac(DOOR_X-DISP_L-DISP_W)} | chain closes on {frac(chain)}")
print(f"content bottom {bottom:.0f} vs sheet inner {P(26)+SHEET_H-P(52):.0f}")
