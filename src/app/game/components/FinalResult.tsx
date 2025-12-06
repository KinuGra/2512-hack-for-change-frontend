"use client";

import React from "react";
import Image from "next/image";

type ActionLog = {
    situation: string;
    action: string;
    impact: number;
};

type Props = {
    totalScore: number;
    harvestPercent: number;
    logs: ActionLog[];
    onTitle: () => void;
};

export default function FinalResult({ totalScore, harvestPercent, logs, onTitle }: Props) {
    return (
        <div style={{
            maxWidth: "600px",
            width: "90%",
            backgroundColor: "white",
            padding: "32px",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            textAlign: "center",
            color: "#333",
            margin: "40px auto",
            fontFamily: "sans-serif"
        }}>
            <h1 style={{ color: "#2e7d32", marginBottom: "24px" }}>ゲーム終了</h1>

            <div style={{ marginBottom: "32px" }}>
                <p style={{ fontSize: "18px", color: "#555" }}>最終収穫スコア</p>
                <div style={{ fontSize: "64px", fontWeight: "bold", color: "#558b2f", lineHeight: "1" }}>
                    {harvestPercent}
                </div>
            </div>

            <div style={{ textAlign: "left", marginBottom: "32px" }}>
                <h3 style={{ borderBottom: "2px solid #eee", paddingBottom: "8px", marginBottom: "16px" }}>行動履歴</h3>
                <ul style={{ listStyle: "none", padding: 0, maxHeight: "200px", overflowY: "auto" }}>
                    {logs.map((log, i) => (
                        <li key={i} style={{
                            marginBottom: "8px",
                            padding: "8px",
                            backgroundColor: log.impact > 0 ? "#f1f8e9" : "#ffebee",
                            borderRadius: "4px",
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <span>{log.action}</span>
                            <span style={{ fontWeight: "bold", color: log.impact > 0 ? "#33691e" : "#b71c1c" }}>
                                {log.impact > 0 ? "+" : ""}{log.impact}%
                            </span>
                        </li>
                    ))}
                    {logs.length === 0 && <li style={{ color: "#999" }}>履歴なし</li>}
                </ul>
            </div>

            <button
                onClick={onTitle}
                style={{
                    backgroundColor: "#0288d1",
                    color: "white",
                    border: "none",
                    padding: "16px 40px",
                    fontSize: "18px",
                    borderRadius: "30px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                }}
            >
                タイトルに戻る
            </button>
        </div>
    );
}
