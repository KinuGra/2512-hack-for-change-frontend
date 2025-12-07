"use client";

import React from "react";
import Image from "next/image";
import styles from "../Situation.module.css";
import TouchButton from "../TouchButton";
import { SceneProps, ShowPopupHelpers } from "../../SceneRenderer";
import FarmerImpactPopup from "../../FarmerImpactPopup";
import { SCENE_TRANSITION_DELAY } from "../../../constants";

export default function Relax_LaundryScene({
    goToScene,
    showPopup,
}: SceneProps) {
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
    const [totalDelta, setTotalDelta] = React.useState(0);
    const [actionLabels, setActionLabels] = React.useState<string[]>([]);

    // base impact is negative (assuming worst case if not selected? or start 0 and add?)
    // Shopping logic starts 0 and adds positive.
    // Here we have binary choices. 
    // Let's assume user starts with "Bad" choices implicit? Or force them to choose?
    // Shopping scene logic: "Not selecting" = 0? 
    // Requirement:
    // Detergent: Eco (+), General (-)
    // Load: Bulk (+), Small (-)
    // Drying: Nature (+), Machine (-)

    // To simplify UI, let's present the POSITIVE choices as buttons to toggle ON.
    // If not toggled, we assume negative impact is applied at the end for the missing ones?
    // Or just make buttons for EACH? 3 buttons is good.
    // Let's make 3 buttons for the "Good" choices.
    // Button 1: "エコ洗剤を使う"
    // Button 2: "まとめ洗いをする"
    // Button 3: "自然乾燥する"

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
        // Calculate penalty for unselected options?
        // If "Eco Detergent" not selected -> General Detergent (-10)
        // If "Bulk" not selected -> Small loads (-10)
        // If "Nature" not selected -> Dryer (-10)

        let finalDelta = totalDelta;
        let finalLabels = [...actionLabels];

        if (!selectedOptions.includes("detergent")) {
            finalDelta -= 10;
            finalLabels.push("一般洗剤を使用");
        }
        if (!selectedOptions.includes("load")) {
            finalDelta -= 10;
            finalLabels.push("少量洗い");
        }
        if (!selectedOptions.includes("drying")) {
            finalDelta -= 10;
            finalLabels.push("乾燥機を使用");
        }

        helpers.applyHarvestDelta(finalDelta, finalLabels.join(" + "));

        helpers.showCutIn(
            "/images/farmerImpact/nomal_farmer.png",
            finalDelta > 0 ? "/images/farmerImpact/good_farmer.png" : "/images/farmerImpact/worst_farmer.png"
        );

        setTimeout(() => {
            goToScene("relax/climate");
        }, SCENE_TRANSITION_DELAY);
    };

    return (
        <div className={styles.sceneContainer}>
            <div className={styles.backgroundImage}>
                <Image src="/images/relax/RelaxAtHome1.png" alt="Relax Laundry" fill style={{ objectFit: "cover" }} />
            </div>

            <div style={{ position: "absolute", top: "10%", left: "10%", background: "rgba(255,255,255,0.8)", padding: "10px", borderRadius: "8px" }}>
                <h3>洗濯の設定</h3>
            </div>

            {/* Option 1: Eco Detergent */}
            {!selectedOptions.includes("detergent") && (
                <TouchButton
                    top="30%"
                    left="20%"
                    label="エコ洗剤"
                    onClick={createHandler(20, "エコ洗剤は水質汚染を減らし、環境負荷を下げます。", "エコ洗剤", "detergent")}
                />
            )}

            {/* Option 2: Bulk Load */}
            {!selectedOptions.includes("load") && (
                <TouchButton
                    top="30%"
                    left="60%"
                    label="まとめ洗い"
                    onClick={createHandler(20, "まとめ洗いは水と電気の使用効率を最大化します。", "まとめ洗い", "load")}
                />
            )}

            {/* Option 3: Nature Dry */}
            {!selectedOptions.includes("drying") && (
                <TouchButton
                    top="50%"
                    left="40%"
                    label="自然乾燥"
                    onClick={createHandler(20, "自然乾燥は電力を使わず、CO2排出ゼロです。", "自然乾燥", "drying")}
                />
            )}

            {/* Confirm Button */}
            <TouchButton
                top="80%"
                left="80%"
                label="決定"
                onClick={() => {
                    if (!showPopup) {
                        goToScene("relax/climate");
                        return;
                    }
                    showPopup((hide, helpers) => (
                        <FarmerImpactPopup
                            impactText={
                                totalDelta > 0
                                    ? "環境に配慮した洗濯を行いました。"
                                    : "あまり環境に配慮できませんでした..."
                            }
                            beforePercent={helpers.currentHarvestPercent}
                            // Note: Preview doesn't show negative penalties calculated at confirm, approximation ok
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
