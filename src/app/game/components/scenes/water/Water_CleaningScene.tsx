"use client";

import React from "react";
import Image from "next/image";
import styles from "../Situation.module.css";
import TouchButton from "../TouchButton";
import { SceneProps, ShowPopupHelpers } from "../../SceneRenderer";
import FarmerImpactPopup from "../../FarmerImpactPopup";
import { SCENE_TRANSITION_DELAY } from "../../../constants";

export default function Water_CleaningScene({
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
                <Image src="/tmp.png" alt="Water Cleaning" fill style={{ objectFit: "cover" }} />
            </div>
            <TouchButton
                top="60%"
                left="20%"
                label="強力洗剤"
                onClick={createHandler(-30, "強力な合成洗剤は、水質汚染のリスクを高める可能性があります。", "強力洗剤を使う")}
            />
            <TouchButton
                top="60%"
                left="60%"
                label="エコ洗剤"
                onClick={createHandler(30, "環境に優しい洗剤を使うことで、水質汚染を最小限に抑えられます。", "エコ洗剤を使う")}
            />
            <TouchButton
                top="40%"
                left="40%"
                label="お湯で予洗い"
                onClick={createHandler(20, "残り湯で軽く汚れを落とすことで、洗剤の量を減らせます。", "お湯で予洗いする")}
            />
        </div>
    );
}
