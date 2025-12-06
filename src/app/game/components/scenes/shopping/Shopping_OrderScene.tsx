"use client";

import React from "react";
import Image from "next/image";
import styles from "../Situation.module.css";
import TouchButton from "../TouchButton";
import { SceneProps, ShowPopupHelpers } from "../../SceneRenderer";
import FarmerImpactPopup from "../../FarmerImpactPopup";
import { SCENE_TRANSITION_DELAY } from "../../../constants";

export default function Shopping_OrderScene({
    goToScene,
    showPopup,
}: SceneProps) {
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
    const [totalDelta, setTotalDelta] = React.useState(0);
    const [actionLabels, setActionLabels] = React.useState<string[]>([]);

    const createHandler = (delta: number, impact: string, actionLabel: string, id: string) => () => {
        if (!showPopup) return;

        if (selectedOptions.includes(id)) return;

        showPopup((hide, helpers) => (
            <FarmerImpactPopup
                impactText={impact}
                beforePercent={helpers.currentHarvestPercent}
                afterPercent={Math.max(0, Math.min(300, helpers.currentHarvestPercent + delta))}
                harvestDelta={delta}
                onClose={() => {
                    setTotalDelta(prev => prev + delta);
                    setActionLabels(prev => [...prev, actionLabel]);
                    setSelectedOptions(prev => [...prev, id]);
                    hide();
                }}
            />
        ));
    };

    const handleConfirm = (helpers: ShowPopupHelpers) => {
        helpers.applyHarvestDelta(totalDelta, actionLabels.length > 0 ? actionLabels.join(" + ") : "注文確定(オプションなし)");

        helpers.showCutIn(
            "/images/farmerImpact/nomal_farmer.png",
            totalDelta > 0 ? "/images/farmerImpact/good_farmer.png" : "/images/farmerImpact/worst_farmer.png"
        );

        setTimeout(() => {
            goToScene("shopping/delivery");
        }, SCENE_TRANSITION_DELAY);
    };

    return (
        <div className={styles.sceneContainer}>
            <div className={styles.backgroundImage}>
                <Image src="/tmp.png" alt="Shopping Order" fill style={{ objectFit: "cover" }} />
            </div>

            <div style={{ position: "absolute", top: "10%", left: "10%", background: "rgba(255,255,255,0.8)", padding: "10px", borderRadius: "8px" }}>
                <h3>注文オプション</h3>
            </div>

            {/* Option 1: Consolidated Delivery */}
            {!selectedOptions.includes("consolidated") && (
                <TouchButton
                    top="30%"
                    left="20%"
                    label="まとめて配送"
                    onClick={createHandler(30, "配送回数を減らし、CO2排出を削減します。", "まとめて配送を利用", "consolidated")}
                />
            )}

            {/* Option 2: Eco Packing */}
            {!selectedOptions.includes("packing") && (
                <TouchButton
                    top="30%"
                    left="60%"
                    label="エコ梱包"
                    onClick={createHandler(20, "資源の無駄遣いを減らす簡易梱包です。", "エコ梱包・電子明細", "packing")}
                />
            )}

            {/* Option 3: Digital Receipt */}
            {!selectedOptions.includes("receipt") && (
                <TouchButton
                    top="50%"
                    left="40%"
                    label="電子領収書"
                    onClick={createHandler(10, "紙の無駄をなくす電子明細を選択しました。", "電子領収書を利用", "receipt")}
                />
            )}

            {/* Confirm / Next Button */}
            <TouchButton
                top="80%"
                left="80%"
                label="注文確定"
                onClick={() => {
                    if (!showPopup) {
                        goToScene("shopping/delivery");
                        return;
                    }
                    showPopup((hide, helpers) => (
                        <FarmerImpactPopup
                            impactText={
                                totalDelta > 0
                                    ? "環境に配慮した選択をしました。"
                                    : "オプションを選択しませんでした。"
                            }
                            beforePercent={helpers.currentHarvestPercent}
                            afterPercent={Math.max(0, Math.min(300, helpers.currentHarvestPercent + totalDelta))}
                            harvestDelta={totalDelta}
                            onClose={() => {
                                handleConfirm(helpers);
                                hide();
                            }}
                        />
                    ));
                }}
            />
        </div>
    );
}
