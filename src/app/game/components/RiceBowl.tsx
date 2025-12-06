"use client";

import React from "react";

type Props = {
  turnScore: number;
  totalScore: number;
  harvestPercent: number; // passed from page
  onNextDay: () => void;
};

const RiceBowl: React.FC<Props> = ({ turnScore, totalScore, harvestPercent, onNextDay }) => {
  // Determine rice level based on harvestPercent (0-300 range)
  // Level 1 (Worst): < 60
  // Level 2 (Bad): < 120
  // Level 3 (Normal): < 180
  // Level 4 (Good): < 240
  // Level 5 (Best): >= 240
  let level = 3;
  let message = "普通のご飯";
  let color = "#eee";

  if (harvestPercent <= 60) {
    level = 1;
    message = "スカスカのご飯...";
    color = "#a1887f";
  } else if (harvestPercent <= 120) {
    level = 2;
    message = "ちょっと少なめのご飯";
    color = "#d7ccc8";
  } else if (harvestPercent <= 180) {
    level = 3;
    message = "ふっくら美味しいご飯";
    color = "#fff";
  } else if (harvestPercent <= 240) {
    level = 4;
    message = "大盛りの絶品ご飯！";
    color = "#fff9c4";
  } else {
    level = 5;
    message = "奇跡の極上ご飯！！";
    color = "#fff176";
  }

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif",
      zIndex: 1000,
      backdropFilter: "blur(4px)",
    }}>
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <div style={{
        backgroundColor: "white",
        padding: "32px",
        borderRadius: "24px",
        width: "90%",
        maxWidth: "400px",
        textAlign: "center",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        animation: "popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        border: "solid 4px #8bc34a"
      }}>
        <h2 style={{ fontSize: "28px", color: "#558b2f", marginBottom: "20px", fontWeight: "900" }}>本日の収穫！！</h2>

        <div style={{
          width: "100%",
          padding: "20px",
          backgroundColor: "#fbe9e7",
          borderRadius: "16px",
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed #ffab91",
        }}>
          <div style={{
            width: "120px",
            height: "120px",
            backgroundColor: color,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "6px solid #8d6e63",
            fontSize: "64px",
            marginBottom: "10px",
            boxShadow: "inset 0 -10px 20px rgba(0,0,0,0.1)"
          }}>
            {level === 1 && "🥣"}
            {level === 2 && "🍚"}
            {level === 3 && "🍚✨"}
            {level === 4 && "🍚✨✨"}
            {level === 5 && "🍱👑"}
          </div>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "#d84315", margin: 0 }}>
            {message}
          </p>
          <small style={{ color: "#8d6e63" }}>収穫率: {harvestPercent}%</small>
        </div>

        <div style={{ textAlign: "left", backgroundColor: "#f1f8e9", padding: "16px", borderRadius: "12px", marginBottom: "24px" }}>
          <p style={{ margin: "5px 0", color: "#33691e" }}>今日のスコア: <span style={{ float: "right", fontWeight: "bold", fontSize: "1.2em" }}>{turnScore}</span></p>
          <hr style={{ border: "none", borderTop: "1px dashed #aed581", margin: "10px 0" }} />
          <p style={{ margin: "5px 0", color: "#33691e" }}>累計スコア: <span style={{ float: "right", fontWeight: "bold", fontSize: "1.2em" }}>{totalScore}</span></p>
        </div>

        <button
          onClick={onNextDay}
          style={{
            backgroundColor: "#7cb342",
            color: "white",
            border: "none",
            padding: "16px 40px",
            fontSize: "20px",
            borderRadius: "50px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 6px 0 #558b2f, 0 10px 10px rgba(0,0,0,0.1)",
            transform: "translateY(-4px)",
            transition: "all 0.1s"
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translateY(2px)";
            e.currentTarget.style.boxShadow = "0 0 0 #558b2f, 0 2px 2px rgba(0,0,0,0.1)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 6px 0 #558b2f, 0 10px 10px rgba(0,0,0,0.1)";
          }}
        >
          次の日へ ▶
        </button>
      </div>
    </div>
  );
};

export default RiceBowl;
