"use client";

import Situation from "../Situation";
import TouchButton from "../TouchButton";
import FarmerImpactPopup from "../../FarmerImpactPopup";
import { SCENE_TRANSITION_DELAY } from "../../../constants";

type Props = {
  goToScene: (next: string) => void;
  endSituation?: () => void;
  showPopup?: (
    renderer: (
      hide: () => void,
      helpers: {
        applyHarvestDelta: (d: number, action?: string) => void;
        currentHarvestPercent: number;
        showCutIn: (beforeSrc: string, afterSrc: string) => void;
      }
    ) => React.ReactNode
  ) => void;
  currentSituation?: string | null;
};

const getNextScene = (situation: string | null | undefined) => {
  switch (situation) {
    case "milk": return "milk/market";
    case "shopping": return "shopping/detail";
    case "water": return "water/washbasin";
    case "aircon": return "aircon/temp";
    default: return "milk/market"; // fallback
  }
};

export default function OutsideScene({
  goToScene,
  endSituation,
  showPopup,
  currentSituation,
}: Props) {
  return (
    <>
      <Situation bg="/images/shared/OutsideScene.jpg">
        {/* 左のボタン: 車 (移動手段の選択) */}
        <TouchButton
          top="48%"
          left="25%"
          onClick={() => {
            const delta = -30;
            const impactText =
              "車で移動すると温室効果ガスが増え、農地や気候に悪影響を与えます。";
            if (showPopup) {
              showPopup(
                (
                  hide,
                  { applyHarvestDelta, currentHarvestPercent, showCutIn }
                ) => {
                  const after = Math.max(
                    0,
                    Math.min(300, currentHarvestPercent + delta)
                  );
                  const beforeIdx = getImpactIndex(currentHarvestPercent);
                  const afterIdx = getImpactIndex(after);
                  const beforeSrc = `/images/farmerImpact/${FILENAMES[beforeIdx]}`;
                  const afterSrc = `/images/farmerImpact/${FILENAMES[afterIdx]}`;

                  return (
                    <FarmerImpactPopup
                      impactText={impactText}
                      beforePercent={currentHarvestPercent}
                      afterPercent={after}
                      harvestDelta={delta}
                      onClose={() => {
                        applyHarvestDelta(delta);
                        hide();
                        showCutIn(beforeSrc, afterSrc);
                        setTimeout(() => {
                          goToScene(getNextScene(currentSituation));
                        }, SCENE_TRANSITION_DELAY);
                      }}
                    />
                  );
                }
              );
            } else {
              goToScene(getNextScene(currentSituation));
            }
          }}
        />

        {/* 右上: 電車 */}
        <TouchButton
          top="35%"
          left="60%"
          onClick={() => {
            const delta = 10; // 電車は比較的環境に優しい
            const impactText =
              "公共交通機関の利用は排出を抑え、農業への負荷を軽減します。";
            if (showPopup) {
              showPopup(
                (
                  hide,
                  { applyHarvestDelta, currentHarvestPercent, showCutIn }
                ) => {
                  const after = Math.max(
                    0,
                    Math.min(300, currentHarvestPercent + delta)
                  );
                  const beforeIdx = getImpactIndex(currentHarvestPercent);
                  const afterIdx = getImpactIndex(after);
                  const beforeSrc = `/images/farmerImpact/${FILENAMES[beforeIdx]}`;
                  const afterSrc = `/images/farmerImpact/${FILENAMES[afterIdx]}`;
                  return (
                    <FarmerImpactPopup
                      impactText={impactText}
                      beforePercent={currentHarvestPercent}
                      afterPercent={after}
                      harvestDelta={delta}
                      onClose={() => {
                        applyHarvestDelta(delta);
                        hide();
                        showCutIn(beforeSrc, afterSrc);
                        goToScene(getNextScene(currentSituation));
                      }}
                    />
                  );
                }
              );
            } else {
              goToScene(getNextScene(currentSituation));
            }
          }}
        />

        {/* 右下: 徒歩 */}
        <TouchButton
          top="68%"
          left="60%"
          onClick={() => {
            const delta = 30; // 歩くと環境負荷が小さく、良い影響
            const impactText =
              "徒歩は最も環境に優しく、地域の持続性を高めます。";
            if (showPopup) {
              showPopup(
                (
                  hide,
                  { applyHarvestDelta, currentHarvestPercent, showCutIn }
                ) => {
                  const after = Math.max(
                    0,
                    Math.min(300, currentHarvestPercent + delta)
                  );
                  const beforeIdx = getImpactIndex(currentHarvestPercent);
                  const afterIdx = getImpactIndex(after);
                  const beforeSrc = `/images/farmerImpact/${FILENAMES[beforeIdx]}`;
                  const afterSrc = `/images/farmerImpact/${FILENAMES[afterIdx]}`;
                  return (
                    <FarmerImpactPopup
                      impactText={impactText}
                      beforePercent={currentHarvestPercent}
                      afterPercent={after}
                      harvestDelta={delta}
                      onClose={() => {
                        applyHarvestDelta(delta);
                        hide();
                        showCutIn(beforeSrc, afterSrc);
                        goToScene(getNextScene(currentSituation));
                      }}
                    />
                  );
                }
              );
            } else {
              goToScene(getNextScene(currentSituation));
            }
          }}
        />
      </Situation>
    </>
  );
}

const FILENAMES = [
  "most_worst_farmer.png",
  "worst_farmer.png",
  "nomal_farmer.png",
  "good_farmer.png",
  "most_good_farmer.png",
];

function getImpactIndex(percent: number) {
  if (percent <= 60) return 0;
  if (percent <= 120) return 1;
  if (percent <= 180) return 2;
  if (percent <= 240) return 3;
  return 4;
}
