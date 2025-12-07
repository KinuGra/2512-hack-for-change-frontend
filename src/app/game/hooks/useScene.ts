"use client";

import { useCallback, useState } from "react";

export type SceneName = string;
export type SituationId = "milk" | "shopping" | "water" | "aircon" | string;

export const useScene = () => {
  const [sceneName, setSceneName] = useState<SceneName>("shared/house");

  const startSceneForSituation = useCallback((situation: SituationId) => {
    // シンプルなマッピング。将来的にシーンデータを読み込む場合はここを拡張
    const mapping: Record<string, SceneName> = {
      milk: "shared/house",
      shopping: "shopping/detail",
      water: "water/washbasin",
      aircon: "aircon/temp",
      relax: "relax/laundry",
    };

    setSceneName(mapping[situation] ?? "shared/house");
  }, []);

  const goToScene = useCallback((next: SceneName) => {
    setSceneName(next);
  }, []);

  return { sceneName, startSceneForSituation, goToScene };
};

export default useScene;
