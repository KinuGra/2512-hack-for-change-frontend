"use client";

import React from "react";
import Image from "next/image";
import styles from "../Situation.module.css";
import TouchButton from "../TouchButton";
import { SceneProps, ShowPopupHelpers } from "../../SceneRenderer";
import FarmerImpactPopup from "../../FarmerImpactPopup";
import { SCENE_TRANSITION_DELAY } from "../../../constants";

export default function Shopping_ReturnScene({
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
        // End of situation
        setTimeout(() => {
            endSituation && endSituation();
        }, SCENE_TRANSITION_DELAY);
    };

    const createHandler = (delta: number, text: string, actionLabel: string) => () => {
        if (!showPopup) {
            endSituation?.();
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
                <Image src="/images/shopping/Shopping_ReturnScene.png" alt="Shopping Return" fill style={{ objectFit: "cover" }} />
            </div>
            <TouchButton
                top="40%"
                left="47%"
                label="個別返品"
                onClick={createHandler(-30, "個別の返品は配送の無駄を増やし、環境負荷を高めます。", "個別に返品")}
            />
            <TouchButton
                top="83%"
                left="80%"
                label="まとめて返品"
                onClick={createHandler(30, "まとめて返品することで、輸送効率を改善しCO2を削減できます。", "まとめて返品")}
            />
        </div>
    );
}
