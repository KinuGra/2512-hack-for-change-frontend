"use client";

import React from "react";
import Image from "next/image";
import styles from "../Situation.module.css";
import TouchButton from "../TouchButton";
import { SceneProps, ShowPopupHelpers } from "../../SceneRenderer";
import FarmerImpactPopup from "../../FarmerImpactPopup";
import { SCENE_TRANSITION_DELAY } from "../../../constants";

export default function Relax_ClimateScene({
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
            goToScene("relax/lighting");
        }, SCENE_TRANSITION_DELAY);
    };

    const createHandler = (delta: number, text: string, actionLabel: string) => () => {
        if (!showPopup) {
            goToScene("relax/lighting");
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
                <Image src="/images/relax/RelaxAtHome2.png" alt="Relax Climate" fill style={{ objectFit: "cover" }} />
            </div>
            <TouchButton
                top="55%"
                left="87%"
                label="暖房のみ"
                onClick={createHandler(-30, "暖房だけに頼ると、エネルギー消費が増大します。", "暖房のみ使用")}
            />
            <TouchButton
                top="55%"
                left="15%"
                label="厚着する"
                onClick={createHandler(30, "衣服で調整することで、暖房の設定温度を下げられ省エネです。", "厚着して調整")}
            />
        </div>
    );
}
