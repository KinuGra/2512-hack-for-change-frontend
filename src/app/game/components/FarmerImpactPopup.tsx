"use client";

import React from "react";

type Props = {
  title?: string;
  impactText?: string; // 詳細な環境影響の説明（日本語）
  beforePercent?: number;
  afterPercent?: number;
  harvestDelta?: number; // 例: +30 / -30
  onClose: () => void;
};

export default function FarmerImpactPopup({
  impactText = "この選択は環境や農家に影響を与えます。",
  beforePercent = 150,
  afterPercent = 150,
  harvestDelta = 0,
  onClose,
}: Props) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 8,
          maxWidth: 640,
        }}
      >
        <h3 style={{ marginTop: 0 }}>環境への影響</h3>

        <div style={{ marginBottom: 8 }}>{impactText}</div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div>
            <strong>収穫量の変化:</strong>
            <div>
              {beforePercent}% → {afterPercent}%（
              {harvestDelta >= 0 ? `+${harvestDelta}` : harvestDelta}%）
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 12,
          }}
        >
          <button onClick={onClose}>閉じる</button>
        </div>
      </div>
    </div>
  );
}

function getImpactIndex(percent: number) {
  if (percent <= 60) return 0;
  if (percent <= 120) return 1;
  if (percent <= 180) return 2;
  if (percent <= 240) return 3;
  return 4;
}
