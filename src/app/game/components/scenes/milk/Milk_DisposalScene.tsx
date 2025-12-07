"use client";

import React from "react";
import Image from "next/image";
import styles from "../Situation.module.css";
import TouchButton from "../TouchButton";
import { SceneProps, ShowPopupHelpers } from "../../SceneRenderer";
import FarmerImpactPopup from "../../FarmerImpactPopup";
import { SCENE_TRANSITION_DELAY } from "../../../constants";

export default function Milk_DisposalScene({
    endSituation,
    showPopup,
}: SceneProps) {
    const handleChoice = (
        method: "wash" | "trash",
        helpers: ShowPopupHelpers,
        hide: () => void
    ) => {
        // Determine impact
        let delta = 0;
        const beforeImg = "/images/farmerImpact/nomal_farmer.png";
        let afterImg = "/images/farmerImpact/nomal_farmer.png";

        let actionName = "牛乳パックをリサイクル";

        if (method === "wash") {
            delta = 30; // Positive impact
            afterImg = "/images/farmerImpact/good_farmer.png";
            actionName = "牛乳パックを洗ってリサイクル";
        } else {
            delta = -30; // Negative impact
            afterImg = "/images/farmerImpact/worst_farmer.png";
            actionName = "牛乳パックをそのまま捨てた";
        }

        helpers.applyHarvestDelta(delta, actionName);
        hide();
        helpers.showCutIn(beforeImg, afterImg);

        if (endSituation) {
            setTimeout(() => endSituation(), SCENE_TRANSITION_DELAY);
        }
    };

    const onWashClick = () => {
        if (!showPopup) return;
        showPopup((hide, helpers) => (
            <FarmerImpactPopup
                impactText="洗って開いてリサイクルしました！ 資源の再利用により環境負荷が減りました。"
                beforePercent={helpers.currentHarvestPercent}
                afterPercent={Math.max(0, Math.min(300, helpers.currentHarvestPercent + 30))}
                harvestDelta={30}
                onClose={() => handleChoice("wash", helpers, hide)}
            />
        ));
    };

    const onTrashClick = () => {
        if (!showPopup) return;
        showPopup((hide, helpers) => (
            <FarmerImpactPopup
                impactText="そのまま燃えるゴミに捨てました。 資源が無駄になり、焼却によるCO2が発生します。"
                beforePercent={helpers.currentHarvestPercent}
                afterPercent={Math.max(0, Math.min(300, helpers.currentHarvestPercent - 30))}
                harvestDelta={-30}
                onClose={() => handleChoice("trash", helpers, hide)}
            />
        ));
    };

    return (
        <div className={styles.sceneContainer}>
            {/* Background Image */}
            <div className={styles.backgroundImage}>
                <Image
                    src="/images/milk/Milk_DisposalScene.png"
                    alt="Milk Disposal"
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>

            {/* Buttons */}
            {/* Position 1: Wash and Recycle */}
            <TouchButton
                top="65%"
                left="70%"
                onClick={onWashClick}
                label="洗ってリサイクル"
            />

            {/* Position 2: Trash */}
            <TouchButton
                top="40%"
                left="70%"
                onClick={onTrashClick}
                label="そのまま捨てる"
            />
            {/* Position 3: Pour Leftover */}
            <TouchButton
                top="65%"
                left="40%"
                onClick={() => {
                    if (!showPopup) return;
                    showPopup((hide, helpers) => (
                        <FarmerImpactPopup
                            impactText="飲み残しを排水溝に流しました。 水質汚染の原因となり、処理に多くのエネルギーが必要です。"
                            beforePercent={helpers.currentHarvestPercent}
                            afterPercent={Math.max(0, Math.min(300, helpers.currentHarvestPercent - 50))}
                            harvestDelta={-50}
                            onClose={() => handleChoice("trash", helpers, hide)}
                        />
                    ));
                }}
                label="飲み残しを流す"
            />
        </div>
    );
}
