"use client";

import React from "react";
import Image from "next/image";
import styles from "../Situation.module.css";
import TouchButton from "../TouchButton";
import { SceneProps, ShowPopupHelpers } from "../../SceneRenderer";
import FarmerImpactPopup from "../../FarmerImpactPopup";
import { SCENE_TRANSITION_DELAY } from "../../../constants";

export default function Aircon_CurtainScene({
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
            goToScene("aircon/goingout");
        }, SCENE_TRANSITION_DELAY);
    };

    const createHandler = (delta: number, text: string, actionLabel: string) => () => {
        if (!showPopup) {
            goToScene("aircon/goingout");
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
                <Image src="/tmp.png" alt="Aircon Curtain" fill style={{ objectFit: "cover" }} />
            </div>
            <TouchButton
                top="60%"
                left="20%"
                label="開けっ放し"
                onClick={createHandler(-30, "窓から入る熱気や冷気は、エアコンの効率を下げます。", "カーテンを開けっ放し")}
            />
            <TouchButton
                top="60%"
                left="60%"
                label="閉める"
                onClick={createHandler(30, "カーテンで断熱することで、冷暖房効率が上がります。", "カーテンを閉める")}
            />
            <TouchButton
                top="40%"
                left="40%"
                label="日差し活用"
                onClick={createHandler(20, "冬は日差しを取り入れることで、自然に部屋を暖められます。", "日差しを活用")}
            />
        </div>
    );
}
