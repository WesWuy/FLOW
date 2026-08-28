#!/usr/bin/env python3
"""
ALLSHORES Executive Boardroom - System Block Diagram (Rev. 2).

Signal flow, organised as four horizontal bands - one per signal domain -
rather than one tangled graph, so each chain reads left to right:

  VIDEO    sources -> NVX encoders -> AV network -> NVX decoders -> displays
  USB      cameras -> HUB30 -> USB-SW-400 -> codec / BYOD
  AUDIO    ceiling mics -> P300 -> amplifiers -> ceiling speakers
  CONTROL  CP4 and the touch panel over the same network

Endpoint counts come from the equipment list and do not balance against three
displays - see NOTES on the sheet.
"""
from elevation_sheet import Sheet

s = Sheet(1, 1)                      # canvas-coordinate use only
P = s.P

VIDEO = dict(style="solid", color="#1a1a1a", width=2.2)
USB = dict(style="dashed", color="#1a1a1a", width=2.0)
AUDIO = dict(style="solid", color="#7a7a7a", width=2.2)
CTRL = dict(style="dotted", color="#9a9a9a", width=1.8)

s.border()

def blk(x, y, w, h, title, sub=None, fill="#ffffff", stroke="#1a1a1a", width=1.8,
        style="solid"):
    bid = s.box(x, y, w, h, stroke, width, style, fill=fill)
    s.label(x + w / 2, y + h / 2 - (13 if sub else 0), title, w - 16, 40)
    if sub:
        s.label(x + w / 2, y + h / 2 + 18, sub, w - 16, 32)
    return bid

def band(y, h, name):
    s.box(70, y, 2330, h, "#c8c8c8", 1.0, "dashed")
    s.label(190, y + 22, name, 240, 34)

# ------------------------------------------------------------------- columns
C1, C2, C3, C4, C5 = 130, 560, 1010, 1460, 1910
CW = 340

# =================================================================== 1 - VIDEO
band(120, 380, "VIDEO  -  AV OVER IP")
core_v = blk(C1, 175, CW, 76, "LENOVO THINKSMART CORE", "GEN 2  |  TEAMS ROOMS")
am3 = blk(C1, 265, CW, 76, "CRESTRON AM3-212", "AIRMEDIA WIRELESS PRESENT.")
byod_v = blk(C1, 355, CW, 76, "TABLE BYOD", "HDMI / USB-C")
enc = blk(C2, 215, CW, 216, "DM-NVX ENCODERS",
          "4x E30C CARD  +  2x E30 BOX", fill="#f4f2ee")
net = blk(C3, 215, CW, 216, "NETGEAR M4250 SERIES  x2",
          "AV NETWORK + PoE  |  SKU TBC", fill="#f4f2ee")
dec = blk(C4, 215, CW, 216, "DM-NVX DECODERS",
          "2x D30C CARD  +  2x D30 BOX", fill="#f4f2ee")
d98a = blk(C5, 175, CW, 76, 'SAMSUNG 98"  LH98QMCEB', "FRONT WALL  (1 OF 2)")
d98b = blk(C5, 265, CW, 76, 'SAMSUNG 98"  LH98QMCEB', "FRONT WALL  (2 OF 2)")
d85 = blk(C5, 355, CW, 76, 'SAMSUNG 85"  LH85QMCEB', "REAR WALL")

for src in (core_v, am3, byod_v):
    s.connect(src, enc, **VIDEO)
s.connect(enc, net, txt="AV OVER IP", **VIDEO)
s.connect(net, dec, **VIDEO)
for d in (d98a, d98b, d85):
    s.connect(dec, d, txt=None, **VIDEO)

# ===================================================================== 2 - USB
band(530, 300, "USB  -  CAMERA AND BYOM")
cam1 = blk(C1, 585, CW, 76, "AVER CAM570  (1 OF 2)", "4K DUAL LENS  |  FRONT")
cam2 = blk(C1, 675, CW, 76, "AVER CAM570  (2 OF 2)", "4K DUAL LENS  |  REAR")
hub = blk(C2, 630, CW, 120, "AVER HUB30", "4K BYOM MATRIX SWITCHER",
          fill="#f4f2ee")
usbsw = blk(C3, 630, CW, 120, "CRESTRON USB-SW-400", "4-INPUT USB SWITCHER",
            fill="#f4f2ee")
core_u = blk(C4, 585, CW, 76, "LENOVO THINKSMART CORE", "TEAMS  |  USB HOST")
byod_u = blk(C4, 675, CW, 76, "TABLE BYOD", "USB-C  |  BYOM")

for c in (cam1, cam2):
    s.connect(c, hub, **USB)
s.connect(hub, usbsw, txt="COMBINED USB", **USB)
s.connect(usbsw, core_u, **USB)
s.connect(usbsw, byod_u, **USB)

# =================================================================== 3 - AUDIO
band(880, 300, "AUDIO")
mics = blk(C1, 980, CW, 120, "SHURE MXA925  x2",
           "CEILING ARRAYS  |  IP AUDIO")
p300 = blk(C2, 980, CW, 120, "SHURE INTELLIMIX P300", "DSP  |  AEC  |  USB AUDIO",
           fill="#f4f2ee")
amps = blk(C3, 980, CW, 120, "CRESTRON AMP-X300  x2", "4-CH POWER AMPLIFIER",
           fill="#f4f2ee")
spk = blk(C4, 980, CW, 120, "CRESTRON SAROS IC4T  x10", "CEILING SPEAKERS")

s.connect(mics, p300, **AUDIO)
s.connect(p300, amps, txt="LINE LEVEL", **AUDIO)
s.connect(amps, spk, txt="70V / 8 OHM - VERIFY", **AUDIO)
# far-end audio rides the USB chain back to the codec
s.connect(p300, usbsw, p1=(0.5, 0), p2=(0.5, 1), txt="USB AUDIO", **USB)

# ================================================================= 4 - CONTROL
band(1230, 250, "CONTROL AND NETWORK")
cp4 = blk(C1, 1290, CW, 110, "CRESTRON CP4", "4-SERIES CONTROL PROCESSOR")
patch = blk(C2, 1290, CW, 110, "CAT6 PATCH PANEL", "RACK  |  24 PORT")
netref = blk(C3, 1290, CW, 110, "AV / PoE NETWORK", "SEE VIDEO BAND", fill="#f4f2ee")
panel = blk(C4, 1290, CW, 110, "LENOVO IP CONTROLLER", "TABLE TOUCH PANEL")
shades = blk(C5, 1290, CW, 110, "SHADE CONTROL", "NO HARDWARE ON LIST",
             fill="#eceae6", style="dashed")

s.connect(cp4, patch, **CTRL)
s.connect(patch, netref, **CTRL)
s.connect(netref, panel, txt="PoE", **CTRL)
s.connect(netref, shades, **CTRL)

# ================================================================== 5 - legend
LG = 1520
s.box(70, LG, 1100, 150, "#c8c8c8", 1.0)
s.label(300, LG + 26, "SIGNAL LEGEND", 300, 34)
for i, (name, kw) in enumerate([("VIDEO - AV OVER IP", VIDEO), ("USB", USB),
                                ("AUDIO", AUDIO), ("CONTROL / NETWORK", CTRL)]):
    yy = LG + 62 + (i % 2) * 46
    xx = 110 + (i // 2) * 520
    s.seg(xx, yy, xx + 110, yy, kw["color"], kw["width"], kw["style"])
    s.label(xx + 300, yy, name, 340, 32)

s.notes([
    "NOTES",
    "1.  NETWORK SWITCH SHOWN AS A PoE-CAPABLE M4250 PER DIRECTION. THE LISTED M4250-16XF IS",
    "     ALL-FIBER SFP+ WITH NO COPPER PORTS AND CANNOT SERVE THE MICS, CAMERAS, NVX ENDPOINTS",
    "     OR TOUCH PANEL. CONFIRM THE CORRECTED SKU, PORT COUNT AND PoE BUDGET.",
    "2.  MICROPHONE QTY CONFIRMED AT 2x MXA925 PER DIRECTION, SUPERSEDING THE DESIGN NARRATIVE'S",
    "     3 CEILING MICS. TILE DETAIL (4x4) REMAINS TBC BY OTHERS.",
    "3.  DISPLAY AND MOUNT CONFLICTS: NARRATIVE SAYS 86\" ON CHIEF LTM1XU FOR ALL THREE; THE LIST",
    "     CARRIES LH85QMCEB (85\") WITH XTM1U + FCAXV1U x2 AND LTM1U x1. DRAWINGS FOLLOW THE LIST.",
    "4.  SHADE CONTROL IS A STATED REQUIREMENT. NO SHADE CONTROLLER, MOTORS OR INTERFACE APPEAR",
    "     ON THE EQUIPMENT LIST - SHOWN DASHED.",
    "5.  ENDPOINT COUNTS DO NOT BALANCE. 6 NVX ENCODERS AND 4 DECODERS FOR 3 SOURCES AND 3",
    "     DISPLAYS. CONFIRM SOURCE COUNT AND WHICH ENDPOINTS ARE CARDS VERSUS FIELD BOXES.",
    "6.  CAMERA PATH IS USB TO THE HUB30, NOT AV OVER IP. THE LENOVO THINKSMART CORE IS THE TEAMS",
    "     HOST; THE LOGITECH ROOMMATE IS EXCLUDED AS IT DOES NOT SUPPORT TWO CAMERAS.",
    "7.  FAR-END AUDIO RETURNS TO THE CODEC AS USB AUDIO THROUGH THE USB-SW-400, SO THE P300",
    "     SERVES BOTH THE TEAMS CALL AND ANY BYOM LAPTOP.",
    "8.  SPEAKER DISTRIBUTION (70V versus LOW-Z) NOT CONFIRMED. 10 SAROS IC4T ON 2 AMP-X300",
    "     GIVES 8 CHANNELS - CONFIRM THE TAP / ZONE SCHEME AND CHANNEL ASSIGNMENT.",
    "9.  CRESTRON AM3-212 KIT APPEARS TWICE ON THE LIST. DRAWN AS ONE UNIT.",
    "10. SECOND FLOOR MEETING ROOM EQUIPMENT EXCLUDED PER DIRECTION. SIGNAL FLOW ONLY - NO",
    "     CABLE TYPES, LENGTHS OR PORT NUMBERS ARE IMPLIED."],
    1230, LG - 100, 1170, 440)

s.title_block(
    "ALLSHORES\nExecutive Boardroom\nSystem Block Diagram\nSignal Flow",
    "SCALE: NTS\nROOM: 18'-6\" W x 42'-0\" L\nVIDEO: DM NVX AV OVER IP\n"
    "AUDIO: SHURE P300 / AMP-X300\n"
    "USB: AVER HUB30 / USB-SW-400\nCONTROL: CRESTRON CP4",
    "DATE CREATED: 26/08/24\nCREATED BY: WW\nRev. 2")

out = "/home/user/FLOW/drawings/allshores-boardroom-block-diagram.lucid.json"
s.dump(out, "System Block Diagram")

# -------------------------------------------------------------------- sanity
ids = {sh["id"] for sh in s.shapes}
for ln in s.lines:
    for ep in ("endpoint1", "endpoint2"):
        if ln[ep]["type"] == "shapeEndpoint":
            assert ln[ep]["shapeId"] in ids, ln[ep]["shapeId"]
draw = [sh for sh in s.shapes[2:] if sh["boundingBox"]["x"] < s.TB_X]
right = max(sh["boundingBox"]["x"] + sh["boundingBox"]["w"] for sh in draw)
bottom = max(sh["boundingBox"]["y"] + sh["boundingBox"]["h"] for sh in draw)
assert right < s.TB_X - 30, f"content runs into the title block at {right}"
assert bottom < 1878, f"content runs past the sheet border at {bottom}"
print(f"wrote {out} | {len(s.shapes)} shapes, {len(s.lines)} lines")
print(f"every connector endpoint resolves to a real block")
print(f"content right {right:.0f} vs title block {s.TB_X:.0f} | bottom {bottom:.0f} vs 1878")
