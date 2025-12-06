"use client";

import React from "react";
import Image from "next/image";
import styles from "../Situation.module.css";
import TouchButton from "../TouchButton";
import { SceneProps, ShowPopupHelpers } from "../../SceneRenderer";
import FarmerImpactPopup from "../../FarmerImpactPopup";
import { SCENE_TRANSITION_DELAY } from "../../../constants";

export default function Water_ShampooScene({
    goToScene,
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
        setTimeout(() => {
            goToScene("water/cleaning");
        }, SCENE_TRANSITION_DELAY);
    };

    const createHandler = (delta: number, text: string, actionLabel: string) => () => {
        if (!showPopup) {
            goToScene("water/cleaning");
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
                <Image src="/tmp.png" alt="Water Shampoo" fill style={{ objectFit: "cover" }} />
            </div>
            <TouchButton
                top="60%"
                left="20%"
                label="流しっぱなし"
                onClick={createHandler(-30, "シャワーを1分間流しっぱなしにすると、約12リットルのお湯を消費します。", "シャワーを流しっぱなし")}
            />
            <TouchButton
                top="60%"
                left="60%"
                label="こまめに止める"
                onClick={createHandler(30, "こまめに止めることで、1回のお風呂で数十リットルの節水が可能です。", "シャワーをこまめに止める")}
            />
            <TouchButton
                top="40%"
                left="40%"
                label="節水ノズル"
                onClick={createHandler(20, "節水ノズルや時短を意識することで、効果的に使用水量を減らせます。", "節水ノズル・時短")}
            />
        </div>
    );
}
