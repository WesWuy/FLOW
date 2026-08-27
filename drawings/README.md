# ALLSHORES Executive Meeting Room — Elevations

Two walls share one sheet format:

| Sheet | Generator | Output |
|---|---|---|
| Rear wall (single display) | `build_rear_wall_lucid.py` | `allshores-rear-wall-single-display.lucid.json` |
| Front wall (dual display) | `build_front_wall_lucid.py` | `allshores-front-wall-dual-display.lucid.json` |
| AV rack | `build_rack_elevation.py` | `allshores-boardroom-rack.lucid.json` |
| System block diagram | `build_block_diagram.py` | `allshores-boardroom-block-diagram.lucid.json` |

`elevation_sheet.py` holds the shared drawing primitives and sheet furniture.

## Rear wall

Each generator holds its field dimensions as exact `Fraction`s of an inch and emits
Lucid Standard Import JSON, imported with assisted layout **off** so every element
keeps its scaled position on the sheet.

    python3 drawings/build_rear_wall_lucid.py
    python3 drawings/build_front_wall_lucid.py

## Wall

| | |
|---|---|
| Wall | 18'-8 1/2" W x 8'-10 3/8" H (224 1/2" x 106 3/8"), field-measured |
| Display | Samsung QM85C / LH85QMCEBGCXGO — 75" W x 42 3/4" H, BTM 52" AFF, centered (74 3/4" clear each side) |
| Mount | Chief Fusion LTM1U — 34 3/4" W x 17" H |
| Camera | AVer CAM570 4K dual lens — 6 3/4" W x 7 1/2" H, on its factory bracket, centered above the display with a 1" gap, BTM 95 3/4" AFF |
| Door | 36" leaf, 7'-10 1/2" H; outside of casing 14'-1 15/16" from the left wall |

Manufacturer dimensions: QM85C 1904.3 x 1085.3 mm; CAM570 170.8 x 190.5 mm.

## Existing wall devices (measured, centerlines)

| Key | Device | From left wall | AFF |
|---|---|---|---|
| A | LV cable box | 9'-10 29/32" | 5'-5 11/16" |
| B | Light switch | 10'-6 9/32" | 5'-5 11/16" |
| C | Dual-port data outlet | 11'-0 25/32" | 5'-5 15/16" |
| D | 4x light switch panel | 3'-11 19/32" | 4'-0 7/32" |
| E | Thermostat | 4'-1 15/16" | 5'-2 15/32" |

Every value above is laser-measured. The thermostat was measured twice, 1 1/8"
apart; 4'-1 15/16" is the centerline and 4'-0 13/16" was the plate's left edge.

## What is still assumed

Only one dimension on the sheet is not field-measured:

* **Casing face, assumed 2".** It positions the leaf inside the door assembly and
  nothing else. Every dimension in the AV scope — including display-edge-to-casing
  at 20 3/16" — is taken to the outside of the casing, which *is* measured, so the
  assumption cannot move any AV dimension.

## Conditions to resolve before rough-in

* Devices A, B and C land behind the display. The LV box is intended; the light
  switch needs relocating.
* The camera leaves 3 1/8" to the ceiling. 4 1/8" is the physical maximum at BTM
  52" AFF, since 52 + 42 3/4 display + 7 1/2 camera consumes the 106 3/8" wall.
  More clearance than that requires lowering the display.

## Front wall (Rev. 4)

Redrawn from Rev. 1 onto the rear wall's sheet, then updated with field
measurements.

| | |
|---|---|
| Wall | 206" x 106 1/2", field-measured |
| Displays | (2) 98" Samsung — 85 7/8" W x 48 7/8" H, BTM 52" AFF, 17" clear each side |
| Mounts | XTM1U + FCAXV1U — 42 3/4" x 24 1/2", centered on each display; CL 43 3/16" above the credenza = 76 7/16" AFF |
| Camera | AVer CAM570 — lens CL 46" AFF, centered below the displays |
| Credenza | 33 1/4" to top of stone, full wall width |
| Devices | A-D keyed to schedule; Rev. 1's 80 1/2" / 4" / 48" / 39 3/4" chain plus a 33 3/4" remainder closes on 206" |

Rev. 1 gives 17" each side and 206" overall, which leaves 1/4" unaccounted for
across the pair. It is drawn as a gap between the displays so both 17" callouts
stay exact; the alternative is 17 1/8" margins with the displays touching.

Device AFF is derived, not measured from the floor: the credenza blocks a
floor-hooked tape against this wall face, so the field tape reads 31 5/8" above
the 33 1/4" counter, giving 64 7/8" AFF. It is starred on the sheet.

All four devices land behind the displays, and A and C are 20 A duplex
receptacles — that needs a decision before rough-in, same as the rear wall's
light switch.

Remaining open items, carried as notes: device B and D types, the credenza base
and counter projection, whether the 1/4" across the display pair is a gap or
17 1/8" margins, the CAM570 lens offset, and the 1/8" difference between this
wall's 106 1/2" and the rear wall's 106 3/8".

## AV rack (Rev. 2)

18U front elevation, drawn to rack units rather than inches — `Sheet` takes a
`scale` override for subjects that are not room-sized.

**The listed SR-CAB-SLIDE-12U does not hold the equipment list.** This layout
needs 18U, and that is already after ganging the two AMP-X300 into one RU and
treating the NVX box endpoints as field devices.

RU heights are manufacturer figures, not estimates:

| | |
|---|---|
| Crestron DMF-CI-8 | 2RU, 15.43" deep — holds 2x D30C + 4x E30C, 6 of 8 slots |
| Crestron AMP-X300 | half-rack 1RU; two gang side by side in a single RU |
| Shure IntelliMix P300 | half-rack 1RU |
| Crestron CP4 | 1RU full width |
| Netgear M4250-16XF | 1RU (43.2 mm) |

The switches are shown as a PoE-capable M4250 per direction — the listed
M4250-16XF is all-fibre SFP+ with no copper ports. 1U each is assumed, and that
assumption is what sets the 18U.

Other open items carried as notes: the AM3-212 is listed twice, patch panel port
count needs confirming, and the USB-SW-400 and AVer HUB30 RU heights are
unverified — each is allowed a full 1U here.

## System block diagram (Rev. 2)

Signal flow in four horizontal bands, one per domain, so each chain reads left
to right instead of as one tangled graph:

| Band | Chain |
|---|---|
| Video | sources → NVX encoders → AV network → NVX decoders → 3 displays |
| USB | 2x CAM570 → HUB30 → USB-SW-400 → ThinkSmart Core / BYOD |
| Audio | 2x MXA925 → P300 → 2x AMP-X300 → 10x Saros IC4T |
| Control | CP4 → patch panel → PoE switch → touch panel |

`Sheet.connect()` draws the arrows; it always sets a relative position on both
endpoints because Standard Import rejects a position on only one.

### Conflicts between the design narrative and the equipment list

These are stated on the sheet rather than silently resolved:

| Item | Narrative | Equipment list | Drawn as |
|---|---|---|---|
| Ceiling mics | 3 | 2x MXA925 | **2 — resolved, the list is right** |
| Rear display | 86" | LH85QMCEB (85") | 85" |
| Mounts | Chief LTM1XU, all three | XTM1U + FCAXV1U x2, LTM1U x1 | the list |
| Shade control | required | nothing listed | dashed block |

Also open: NVX endpoint counts do not balance (6 encoders, 4 decoders, 3 sources,
3 displays); speaker distribution (70V vs low-Z) and the tap/zone scheme for 10
speakers across 8 amplifier channels; and the AM3-212 appears twice on the list.

### Dimensional conflicts against the field measurements

* **Credenza to ceiling.** Narrative says 72". Field measurement gives
  106 1/2" ceiling − 33 1/4" counter = **73 1/4"**, a 1 1/4" difference.
* **Room width.** Narrative says 18.5 ft (222"). The rear wall measured
  224 1/2" and the front wall 206" — the two display walls are **18 1/2"
  apart**, which they cannot be in a rectangular room. The 206" is the outlier.

Second floor meeting room equipment is excluded per direction.
