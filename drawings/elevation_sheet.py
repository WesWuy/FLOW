#!/usr/bin/env python3
"""
Shared sheet machinery for the ALLSHORES elevation drawings.

Holds the drawing primitives and sheet furniture used by every wall so the
individual wall scripts carry only field dimensions and what sits on that
wall. Coordinates are exact Fractions of an inch, converted to canvas units
once, so dimension chains close on the wall width instead of drifting.

Two Lucid behaviours are handled here rather than in each wall script:
  * a shape with no "text" key renders a literal "Text" placeholder, so
    every shape is given an explicit (possibly empty) string;
  * Lucid scales text to fill its box, so a label's HEIGHT is what sets its
    type size - hence label() takes explicit w/h in canvas units.
"""
import json
from fractions import Fraction as F


def frac(v):
    """Inches as an architectural fraction string, e.g. 69 1/16"."""
    v = F(v)
    whole, rem = int(v), v - int(v)
    if rem == 0:
        return f'{whole}"'
    return f'{whole} {rem.numerator}/{rem.denominator}"' if whole else f'{rem.numerator}/{rem.denominator}"'


def ftin(v):
    """Inches as feet-inches, e.g. 9'-10 29/32"."""
    v = F(v)
    feet, rem = int(v // 12), v - int(v // 12) * 12
    whole, fr = int(rem), rem - int(rem)
    s = f"{feet}'-{whole}"
    if fr:
        s += f" {fr.numerator}/{fr.denominator}"
    return s + '"'


class Sheet:
    """One elevation sheet: a wall drawn to scale plus its title block."""

    K = 1.6                    # canvas blow-up so Lucid's auto-fit type reads small
    S = F(56, 10) * F(8, 5)    # px per inch

    def __init__(self, wall_w, wall_h, y0=132, x0=190, scale=None):
        """y0/x0 place the subject's top-left corner in pre-scale units; raise
        y0 to make room for extra dimension chains above it. scale overrides
        px-per-inch for subjects that are not room-sized (a rack, say)."""
        self.wall_w, self.wall_h = F(wall_w), F(wall_h)
        if scale is not None:
            self.S = F(scale)
        self.X0, self.Y0 = x0 * self.K, y0 * self.K
        self.SHEET_W, self.SHEET_H = 1900 * self.K, 1200 * self.K
        self.TB_X = 1540 * self.K
        self.TICK = self.P(6)
        self.FLOOR = self.Y(0)
        self.shapes, self.lines = [], []
        self._n = 0

    # ------------------------------------------------------------ coordinates
    def P(self, v):   return v * self.K
    def X(self, i):   return float(self.X0 + F(i) * self.S)
    def Y(self, aff): return float(self.Y0 + (self.wall_h - F(aff)) * self.S)
    def L(self, i):   return float(F(i) * self.S)

    def _id(self, prefix):
        self._n += 1
        return f"{prefix}{self._n}"

    # ------------------------------------------------------------- primitives
    def box(self, x, y, w, h, stroke="#1a1a1a", width=1.5, style="solid",
            fill=None, text=None, sh="rectangle"):
        s = {"id": self._id("s"), "type": sh,
             "boundingBox": {"x": round(x, 1), "y": round(y, 1),
                             "w": round(w, 1), "h": round(h, 1)},
             "style": {"stroke": {"color": stroke, "width": width, "style": style},
                       "fill": {"type": "color", "color": fill or "#ffffff00"}},
             "text": text if text is not None else ""}
        self.shapes.append(s)
        return s["id"]

    def label(self, cx, cy, txt, w, h):
        self.shapes.append({"id": self._id("t"), "type": "text",
                            "boundingBox": {"x": round(cx - w / 2, 1),
                                            "y": round(cy - h / 2, 1), "w": w, "h": h},
                            "text": txt})

    def seg(self, x1, y1, x2, y2, color="#1a1a1a", width=1.2, style="solid",
            txt=None, side="top"):
        ln = {"id": self._id("l"), "lineType": "straight",
              "endpoint1": {"type": "positionEndpoint", "style": "none",
                            "position": {"x": round(x1, 1), "y": round(y1, 1)}},
              "endpoint2": {"type": "positionEndpoint", "style": "none",
                            "position": {"x": round(x2, 1), "y": round(y2, 1)}},
              "stroke": {"color": color, "width": width, "style": style}}
        if txt:
            ln["text"] = [{"text": txt, "position": 0.5, "side": side}]
        self.lines.append(ln)

    # ------------------------------------------------------------- dimensions
    def hdim(self, i1, i2, y, lab, ext_from=None):
        x1, x2 = self.X(i1), self.X(i2)
        if ext_from is not None:
            self.seg(x1, ext_from, x1, y + self.P(9), "#9a9a9a", 0.8)
            self.seg(x2, ext_from, x2, y + self.P(9), "#9a9a9a", 0.8)
        self.seg(x1, y, x2, y, "#1a1a1a", 1.2, txt=lab)
        self.seg(x1, y - self.TICK, x1, y + self.TICK, "#1a1a1a", 1.5)
        self.seg(x2, y - self.TICK, x2, y + self.TICK, "#1a1a1a", 1.5)

    def vdim(self, a1, a2, x, lab, ext_to=None, side="left"):
        y1, y2 = self.Y(a1), self.Y(a2)
        if ext_to is not None:
            stub = x - self.P(9) if side == "left" else x + self.P(9)
            self.seg(stub, y1, ext_to, y1, "#9a9a9a", 0.8)
            self.seg(stub, y2, ext_to, y2, "#9a9a9a", 0.8)
        self.seg(x, y1, x, y2, "#1a1a1a", 1.2, txt=lab)
        self.seg(x - self.TICK, y1, x + self.TICK, y1, "#1a1a1a", 1.5)
        self.seg(x - self.TICK, y2, x + self.TICK, y2, "#1a1a1a", 1.5)

    # --------------------------------------------------------------- furniture
    def border(self):
        self.box(self.P(14), self.P(14), self.SHEET_W - self.P(28),
                 self.SHEET_H - self.P(28), width=2.5)
        self.box(self.P(26), self.P(26), self.SHEET_W - self.P(52),
                 self.SHEET_H - self.P(52), width=1.2)
        self.seg(self.TB_X, self.P(26), self.TB_X, self.SHEET_H - self.P(26),
                 "#1a1a1a", 1.2)

    def wall(self, name, label_at=None):
        """label_at overrides the default bottom-left name, for walls whose
        bottom band is occupied by millwork."""
        self.box(self.X(0), self.Y(self.wall_h), self.L(self.wall_w),
                 self.L(self.wall_h), width=2.2, fill="#ffffff")
        x, y = label_at or (self.X(0) + self.P(90), self.FLOOR - self.P(26))
        self.label(x, y, name, 260, 52)

    def schedule(self, headers, rows, x, y, w, h):
        cells = [{"xPosition": c, "yPosition": 0, "text": t,
                  "style": {"fill": {"type": "color", "color": "#efeeea"}}}
                 for c, t in enumerate(headers)]
        for r, row in enumerate(rows):
            cells += [{"xPosition": c, "yPosition": r + 1, "text": v}
                      for c, v in enumerate(row)]
        self.shapes.append({"id": self._id("tbl"), "type": "table",
                            "boundingBox": {"x": round(x, 1), "y": round(y, 1),
                                            "w": round(w, 1), "h": h},
                            "rowCount": len(rows) + 1, "colCount": len(headers),
                            "cells": cells})

    def notes(self, lines, x, y, w, h):
        self.shapes.append({"id": self._id("t"), "type": "text",
                            "boundingBox": {"x": round(x, 1), "y": round(y, 1),
                                            "w": round(w, 1), "h": h},
                            "text": "\n".join(lines)})

    def title_block(self, subject, specs, revision):
        P, TB_X = self.P, self.TB_X
        c = TB_X + (self.SHEET_W - P(26) - TB_X) / 2
        self.label(c, P(112), "ALLSHORES", 460, 86)
        self.seg(TB_X + P(30), P(152), self.SHEET_W - P(56), P(152), "#d0d0d0", 1)
        self.label(c, P(272), subject, 470, 272)
        self.box(c - P(66), P(540), P(132), P(132), "#d8d8d8", 1.2, sh="circle", text="PSI.")
        self.label(c, P(700), "PRECISE SYSTEMS INTEGRATION", 450, 38)
        self.seg(TB_X + P(30), P(790), self.SHEET_W - P(56), P(790), "#d0d0d0", 1)
        self.label(c, P(880), specs, 470, 200)
        self.seg(TB_X + P(30), P(960), self.SHEET_W - P(56), P(960), "#d0d0d0", 1)
        self.label(c, P(1035), revision, 470, 120)

    # -------------------------------------------------------------------- out
    def dump(self, path, page_title):
        doc = {"version": 1, "pages": [{"id": "page1", "title": page_title,
                                        "shapes": self.shapes, "lines": self.lines}]}
        open(path, "w").write(json.dumps(doc, separators=(",", ":")))
        return doc

    def content_bottom(self, skip=2):
        return max(s["boundingBox"]["y"] + s["boundingBox"]["h"]
                   for s in self.shapes[skip:])
