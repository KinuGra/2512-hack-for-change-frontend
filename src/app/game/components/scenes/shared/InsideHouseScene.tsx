"use client";

import Situation from "../Situation";
import TouchButton from "../TouchButton";
import FarmerImpactPopup from "../../FarmerImpactPopup";
import { SCENE_TRANSITION_DELAY } from "../../../constants";

const getNextScene = (situation: string | null | undefined) => {
  switch (situation) {
    case "milk": return "shared/outside";
    case "shopping": return "shopping/detail";
    case "water": return "water/washbasin";
    case "aircon": return "aircon/temp";
    default: return "milk/market";
  }
};

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

export default function InsideHouseScene({
  goToScene,
  endSituation,
  currentSituation,
  showPopup,
}: Props) {
  return (
    <>
      <Situation bg="/images/shared/InsideHouseScene.png">
        {/* 上のボタン: リビングから玄関/外へ */}
        <TouchButton
          top="30%"
          left="50%"
          label="外へ出る"
          onClick={() => goToScene("shared/outside")}
        />

        {/* 下のボタン: エコバッグを持ち、シチュエーション開始 */}
        <TouchButton
          top="85%"
          left="37%"
          onClick={() => {
            const delta = 30;
            const impactText =
              "エコバッグの使用は包装ごみを減らし、地域の持続性を高めます。";
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
                        applyHarvestDelta(delta, "エコバッグを持つ");
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
              // Popup unavailable fallback
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
