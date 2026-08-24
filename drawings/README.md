# ALLSHORES Executive Meeting Room — Rear Wall Single Display Elevation

`build_rear_wall_lucid.py` is the source of truth for the elevation. It holds every
field dimension as an exact `Fraction` of an inch and emits
`allshores-rear-wall-single-display.lucid.json` in Lucid's Standard Import format,
which is imported with assisted layout **off** so each element keeps its scaled
position on the sheet.

Regenerate with:

    python3 drawings/build_rear_wall_lucid.py

## Wall

| | |
|---|---|
| Wall | 18'-8 1/2" W x 8'-10 3/8" H (224 1/2" x 106 3/8"), field-measured |
| Display | Samsung QM85C / LH85QMCEBGCXGO — 75" W x 42 3/4" H, BTM 52" AFF, centered (74 3/4" clear each side) |
| Mount | Chief Fusion LTM1U — 34 3/4" W x 17" H |
| Camera | AVer CAM570 4K dual lens — 6 3/4" W x 7 1/2" H, centered above the display, BTM 96 3/4" AFF |
| Door | 7'-10 1/2" H, outside of casing 14'-1 15/16" from the left wall; leaf width assumed 36" |

Manufacturer dimensions: QM85C 1904.3 x 1085.3 mm; CAM570 170.8 x 190.5 mm.

## Existing wall devices (measured, centerlines)

| Key | Device | From left wall | AFF |
|---|---|---|---|
| A | LV cable box | 9'-10 29/32" | 5'-5 11/16" |
| B | Light switch | 10'-6 9/32" | 5'-5 11/16" |
| C | Dual-port data outlet | 11'-0 25/32" | 5'-5 15/16" |
| D | 4x light switch panel | 3'-11 19/32" | 4'-0 7/32" |
| E | Thermostat | 4'-0 13/16" | 5'-2 15/32" |

## Assumptions carried on the sheet

* Door leaf width assumed 36"; the 14'-1 15/16" dimension is field-confirmed to
  the outside of the casing.
* Devices A, B and C land behind the display. The LV box is intended; the light
  switch needs relocating before rough-in.
* The camera leaves 3 1/8" to the ceiling at BTM 52" AFF with a 1" gap; 4 1/8" is
  the physical maximum at that mounting height.
* Thermostat (E) horizontal is unresolved: 4'-0 13/16" and 4'-1 15/16" were both
  measured, exactly 1 1/8" apart.
