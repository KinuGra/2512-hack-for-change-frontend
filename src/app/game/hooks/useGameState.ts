"use client";

import { useCallback, useState, useRef, useEffect } from "react";

export type GameMode = "map" | "scene" | "rice" | "final";
export type SituationId = "milk" | "bento" | string;

const MAX_TURNS = 5;

export const useGameState = () => {
  const [turn, setTurn] = useState<number>(1);
  const [mode, setMode] = useState<GameMode>("map");
  const [currentSituation, setCurrentSituation] = useState<SituationId | null>(null);

  const [totalScore, setTotalScore] = useState<number>(0);
  const [turnScore, setTurnScore] = useState<number>(0);
  const [harvestPercent, setHarvestPercent] = useState<number>(150); // 初期150%
  const harvestPercentRef = useRef(150);

  // Sync ref with state
  useEffect(() => {
    harvestPercentRef.current = harvestPercent;
  }, [harvestPercent]);

  // 履歴とログ
  const [playedSituations, setPlayedSituations] = useState<SituationId[]>([]);
  const [actionLogs, setActionLogs] = useState<Array<{ situation: string; action: string; impact: number }>>([]);

  // シチュエーション開始
  const startSituation = useCallback((situation: SituationId) => {
    setCurrentSituation(situation);
    setPlayedSituations((prev) => [...prev, situation]);
    setMode("scene");
    setTurnScore(0);
    setHarvestPercent(150); // Reset for new situation
  }, []);

  // シチュエーション終了 → ご飯演出へ
  const endSituationToRice = useCallback(() => {
    const score = harvestPercentRef.current; // Use latest value from ref
    setTurnScore(score);
    setTotalScore((prev) => prev + score);
    setMode("rice");
  }, []);

  // 収穫率を変動させる + ログ記録
  const applyHarvestDelta = useCallback((delta: number, action: string = "") => {
    setHarvestPercent((prev) => {
      const next = Math.max(0, Math.min(300, prev + delta));
      return next;
    });
    if (action) {
      setActionLogs((prev) => [
        ...prev,
        {
          situation: currentSituation || "unknown",
          action,
          impact: delta,
        },
      ]);
    }
  }, [currentSituation]);

  // 行動をログに記録
  const logAction = useCallback((action: string, impact: number) => {
    setActionLogs((prev) => [
      ...prev,
      {
        situation: currentSituation || "unknown",
        action,
        impact,
      },
    ]);
  }, [currentSituation]);

  // ご飯演出を閉じて次の日へ
  const finishRice = useCallback(() => {
    // 3回シチュエーションを行ったら終了
    if (playedSituations.length >= 3) {
      setMode("final");
    } else {
      setTurn((t) => t + 1);
      setMode("map"); // page.tsx handles next random situation
    }
    setCurrentSituation(null);
    setTurnScore(0);
  }, [playedSituations.length]);

  return {
    turn,
    mode,
    currentSituation,
    totalScore,
    turnScore,
    harvestPercent,
    playedSituations,
    actionLogs,
    startSituation,
    endSituationToRice,
    finishRice,
    setMode,
    applyHarvestDelta,
    logAction,
  };
};

export default useGameState;
