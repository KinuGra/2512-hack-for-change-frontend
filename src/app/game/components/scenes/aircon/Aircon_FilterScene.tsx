"use client";

import React from "react";
import Image from "next/image";
import styles from "../Situation.module.css";
import TouchButton from "../TouchButton";
import { SceneProps, ShowPopupHelpers } from "../../SceneRenderer";
import FarmerImpactPopup from "../../FarmerImpactPopup";
import { SCENE_TRANSITION_DELAY } from "../../../constants";

export default function Aircon_FilterScene({
    endSituation,
    showPopup,
}: SceneProps) {
    const handleChoice = (
        delta: number,
        text: string,
        actionLabel: string,
        helpers: ShowPopupHelpers,
        hide: () => void
    ) => {
        helpers.applyHarvestDelta(delta, actionLabel);
        hide();
        helpers.showCutIn(
            "/images/farmerImpact/nomal_farmer.png",
            delta > 0 ? "/images/farmerImpact/good_farmer.png" : "/images/farmerImpact/worst_farmer.png"
        );
        if (endSituation) {
            setTimeout(() => endSituation(), 1000);
        }
    };

    const createHandler = (delta: number, text: string, actionLabel: string) => () => {
        if (!showPopup) {
            setTimeout(() => {
                endSituation && endSituation();
            }, SCENE_TRANSITION_DELAY);
            return;
        }
        showPopup((hide, helpers) => (
            <FarmerImpactPopup
                impactText={text}
                beforePercent={helpers.currentHarvestPercent}
                afterPercent={Math.max(0, Math.min(300, helpers.currentHarvestPercent + delta))}
                harvestDelta={delta}
                onClose={() => handleChoice(delta, text, actionLabel, helpers, hide)}
            />
        ));
    };

    return (
        <div className={styles.sceneContainer}>
            <div className={styles.backgroundImage}>
                <Image src="/tmp.png" alt="Aircon Filter" fill style={{ objectFit: "cover" }} />
            </div>
            <TouchButton
                top="60%"
                left="20%"
                label="掃除しない"
                onClick={createHandler(-30, "フィルターが目詰まりすると、エアコンの効率が落ち、電気代が上がります。", "フィルター掃除しない")}
            />
            <TouchButton
                top="60%"
                left="60%"
                label="掃除する"
                onClick={createHandler(30, "定期的なフィルター掃除は、エアコンの効率を維持し、省エネにつながります。", "フィルター掃除する")}
            />
            <TouchButton
                top="40%"
                left="40%"
                label="掃除+省エネ"
                onClick={createHandler(50, "掃除に加えて省エネモードも活用することで、最大の節電効果が得られます。", "掃除＋省エネモード")}
            />
        </div>
    );
}
