"use client";

import React, { useEffect, useCallback } from "react";
import useGameState from "./hooks/useGameState";
import useScene from "./hooks/useScene";
import SceneRenderer from "./components/SceneRenderer";
import RiceBowl from "./components/RiceBowl";
import HarvestStatus from "./components/HarvestStatus";
import CutIn from "./components/CutIn";
import FinalResult from "./components/FinalResult";
import { useState } from "react";
import Button from "@/components/Button";

export default function GamePage() {
  const {
    turn,
    mode,
    currentSituation,
    totalScore,
    turnScore,
    startSituation,
    endSituationToRice,
    finishRice,
    harvestPercent,
    applyHarvestDelta,
    playedSituations,
    actionLogs,
  } = useGameState();

  const { sceneName, startSceneForSituation, goToScene } = useScene();

  const handleEndSituation = () => {
    setCutIn(null); // Force clear cutIn state
    endSituationToRice();
  };

  // situations that can be chosen randomly
  // この配列からシチュエーションが抽選されます
  const ALL_SITUATIONS: Array<string> = ["milk", "shopping", "water", "aircon"];

  const startRandomSituation = useCallback(() => {
    // Filter out already played situations
    const available = ALL_SITUATIONS.filter(
      (s) => !playedSituations.includes(s)
    );

    if (available.length === 0) {
      // Should handle case where ran out of situations before game over (if logic aligns)
      // But with 3 turns and 5 configs, this is fine.
      return;
    }

    const idx = Math.floor(Math.random() * available.length);
    const chosen = available[idx];
    startSituation(chosen);
    startSceneForSituation(chosen);
  }, [playedSituations, startSituation, startSceneForSituation]);

  // popup state: renderer receives hide function and returns a React node
  const [popupContent, setPopupContent] = useState<React.ReactNode | null>(
    null
  );
  const [cutIn, setCutIn] = useState<{
    beforeSrc: string;
    afterSrc: string;
  } | null>(null);

  const showPopup = (
    renderer: (
      hide: () => void,
      helpers: {
        applyHarvestDelta: (d: number, action?: string) => void;
        currentHarvestPercent: number;
        showCutIn: (beforeSrc: string, afterSrc: string) => void;
      }
    ) => React.ReactNode
  ) => {
    const hide = () => setPopupContent(null);
    const showCutIn = (beforeSrc: string, afterSrc: string) => {
      setCutIn({ beforeSrc, afterSrc });
    };

    const node = renderer(hide, {
      applyHarvestDelta,
      currentHarvestPercent: harvestPercent,
      showCutIn,
    });
    setPopupContent(node);
  };

  // 自動的にランダムシチュ開始 (modeが変わってmapになったら)
  useEffect(() => {
    if (mode === "map") {
      startRandomSituation();
    }
  }, [mode, startRandomSituation]);

  // RiceBowl の次の日ボタン
  const handleNextDay = () => {
    finishRice();
  };

  if (mode === "scene") {
    return (
      <main>
        <HarvestStatus score={harvestPercent} />
        <div
          style={{ position: "absolute", top: 100, right: 10, zIndex: 1000 }}
        ></div>
        <SceneRenderer
          sceneName={sceneName}
          goToScene={goToScene}
          endSituation={handleEndSituation}
          currentSituation={currentSituation}
          showPopup={showPopup}
        />
        {popupContent}
        {cutIn && (
          <CutIn
            beforeSrc={cutIn.beforeSrc}
            afterSrc={cutIn.afterSrc}
            onEnd={() => setCutIn(null)}
          />
        )}
      </main>
    );
  }

  if (mode === "rice") {
    return (
      <main>
        <RiceBowl
          turnScore={turnScore}
          totalScore={totalScore}
          harvestPercent={harvestPercent}
          onNextDay={handleNextDay}
        />
      </main>
    );
  }

  if (mode === "final") {
    return (
      <main>
        <FinalResult
          totalScore={totalScore}
          harvestPercent={totalScore} // Merge: Final Harvest is the Cumulative Score
          logs={actionLogs}
          onTitle={() => (window.location.href = "/title")} // Simple redirect for now
        />
      </main>
    );
  }

  // デフォルトレンダリング（mode が一時的に map の場合でも初期化で置き換わる）
  return (
    <main style={{ padding: 20 }}>
      <h2>読み込み中…</h2>
      <HarvestStatus score={Math.round((totalScore / (turn || 1)) % 100)} />
    </main>
  );
}
