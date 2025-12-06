"use client";

import Situation from "../Situation";
import TouchButton from "../TouchButton";
import FarmerImpactPopup from "../../FarmerImpactPopup";
import { SCENE_TRANSITION_DELAY } from "../../../constants";

type Props = {
  goToScene: (next: string) => void;
  endSituation?: () => void;
  currentSituation?: string | null;
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
};

export default function Milk_MarketScene({
  goToScene,
  endSituation,
  currentSituation,
  showPopup,
}: Props) {
  return (
    <>
      <Situation bg="/images/milk/Milk_MarketScene.png">
        {/* 左: 大きいミルク（賞味3日、廃棄リスク高め） */}
        <TouchButton
          top="60%"
          left="65%"
          onClick={() => {
            const delta = -10;
            const impactText =
              "大容量のミルクは廃棄リスクが高く、食品ロスを生みやすいです。";
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
                        applyHarvestDelta(delta, "大容量のミルクを購入");
                        hide();
                        showCutIn(beforeSrc, afterSrc);
                        setTimeout(() => {
                          endSituation && endSituation();
                        }, SCENE_TRANSITION_DELAY);
                      }}
                    />
                  );
                }
              );
            } else {
              endSituation && endSituation();
            }
          }}
        />

        {/* 右: 小さいミルク（賞味1週、廃棄リスク低め） */}
        <TouchButton
          top="25%"
          left="37%"
          onClick={() => {
            const delta = 10;
            const impactText =
              "小容量で賞味期限が長い製品は廃棄リスクが下がり、持続可能です。";
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
                        applyHarvestDelta(delta, "小容量のミルクを購入");
                        hide();
                        showCutIn(beforeSrc, afterSrc);
                        // go to next scene (disposal)
                        setTimeout(() => {
                          goToScene("milk/disposal");
                        }, SCENE_TRANSITION_DELAY);
                      }}
                    />
                  );
                }
              );
            } else {
              endSituation && endSituation();
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
