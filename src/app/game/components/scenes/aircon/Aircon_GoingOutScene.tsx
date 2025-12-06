"use client";

import React from "react";
import Image from "next/image";
import styles from "../Situation.module.css";
import TouchButton from "../TouchButton";
import { SceneProps, ShowPopupHelpers } from "../../SceneRenderer";
import FarmerImpactPopup from "../../FarmerImpactPopup";
import { SCENE_TRANSITION_DELAY } from "../../../constants";

export default function Aircon_GoingOutScene({
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
            goToScene("aircon/filter");
        }, SCENE_TRANSITION_DELAY);
    };

    const createHandler = (delta: number, text: string, actionLabel: string) => () => {
        if (!showPopup) {
            goToScene("aircon/filter");
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
                <Image src="/tmp.png" alt="Aircon GoingOut" fill style={{ objectFit: "cover" }} />
            </div>
            <TouchButton
                top="60%"
                left="20%"
                label="つけっぱなし"
                onClick={createHandler(-30, "長時間の外出時につけっぱなしにすると、無駄な電力を消費します。", "エアコンをつけっぱなし")}
            />
            <TouchButton
                top="60%"
                left="60%"
                label="消す"
                onClick={createHandler(30, "こまめに消すことで、待機電力と運転電力を節約できます。", "エアコンを消す")}
            />
            <TouchButton
                top="40%"
                left="40%"
                label="タイマー活用"
                onClick={createHandler(20, "タイマーやアプリを活用し、必要な時間だけ運転させるのが賢い使い方です。", "タイマー/アプリ活用")}
            />
        </div>
    );
}
