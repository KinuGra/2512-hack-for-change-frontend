"use client";

import React from "react";
import Image from "next/image";
import styles from "../Situation.module.css";
import TouchButton from "../TouchButton";
import { SceneProps, ShowPopupHelpers } from "../../SceneRenderer";
import FarmerImpactPopup from "../../FarmerImpactPopup";
import { SCENE_TRANSITION_DELAY } from "../../../constants";

export default function Relax_LightingScene({
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
            goToScene("relax/bath");
        }, SCENE_TRANSITION_DELAY);
    };

    const createHandler = (delta: number, text: string, actionLabel: string) => () => {
        if (!showPopup) {
            goToScene("relax/bath");
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
                <Image src="/images/relax/RelaxAtHome3.png" alt="Relax Lighting" fill style={{ objectFit: "cover" }} />
            </div>
            <TouchButton
                top="60%"
                left="20%"
                label="全部つける"
                onClick={createHandler(-30, "誰もいない部屋の電気をつけると、無駄な電力を消費します。", "全室点灯")}
            />
            <TouchButton
                top="60%"
                left="60%"
                label="こまめに消す"
                onClick={createHandler(30, "必要な場所だけ点灯することで、効率的に電力を使えます。", "こまめに消灯")}
            />
        </div>
    );
}
