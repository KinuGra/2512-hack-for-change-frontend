"use client";

import React from "react";
import Image from "next/image";
import styles from "../Situation.module.css";
import TouchButton from "../TouchButton";
import { SceneProps, ShowPopupHelpers } from "../../SceneRenderer";
import FarmerImpactPopup from "../../FarmerImpactPopup";
import { SCENE_TRANSITION_DELAY } from "../../../constants";

export default function Relax_BathScene({
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
            setTimeout(() => endSituation(), SCENE_TRANSITION_DELAY);
        }
    };

    const createHandler = (delta: number, text: string, actionLabel: string) => () => {
        if (!showPopup) {
            setTimeout(() => endSituation && endSituation(), SCENE_TRANSITION_DELAY);
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
                <Image src="/images/relax/ RelaxAtHome4.jpg" alt="Relax Bath" fill style={{ objectFit: "cover" }} />
            </div>
            <TouchButton
                top="45%"
                left="37%"
                label="無駄遣い"
                onClick={createHandler(-30, "シャワーの出しっぱなしや無駄な追い焚きは、多大な水とエネルギーを浪費します。", "お風呂で無駄遣い")}
            />
            <TouchButton
                top="58%"
                left="60%"
                label="エコ運転"
                onClick={createHandler(30, "こまめなシャワー停止や保温の工夫は、快適さと省エネを両立します。", "お風呂でエコ運転")}
            />
        </div>
    );
}
