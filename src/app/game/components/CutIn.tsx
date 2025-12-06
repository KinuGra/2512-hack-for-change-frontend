"use client";

import React, { useEffect, useState } from "react";
import { CUT_IN_DURATION } from "../constants";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  onEnd?: () => void;
};

export default function CutIn({ beforeSrc, afterSrc, onEnd }: Props) {
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    // total 3000ms (configured via constants)
    const t1 = setTimeout(() => setShowAfter(true), CUT_IN_DURATION / 2);
    const t2 = setTimeout(() => onEnd && onEnd(), CUT_IN_DURATION);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onEnd]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1100,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          transition: "opacity 600ms",
          opacity: showAfter ? 0 : 1,
        }}
      >
        <img src={beforeSrc} alt="before" style={{ width: 240 }} />
      </div>

      <div
        style={{
          position: "absolute",
          transition: "opacity 600ms",
          opacity: showAfter ? 1 : 0,
        }}
      >
        <img src={afterSrc} alt="after" style={{ width: 240 }} />
      </div>
    </div>
  );
}
