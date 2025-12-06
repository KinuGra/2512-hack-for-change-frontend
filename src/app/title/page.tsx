"use client";

import styles from "./page.module.css";
import { BackgroundDecoration } from "./components/BackgroundDecoration";
import { TitleSection } from "./components/TitleSection";
import { MainMenu } from "./components/MainMenu";

export default function Home() {
  // 画面遷移などのロジック
  const handleStart = () => {
    window.location.href = "/game";
  };
  const handleContinue = () => console.log("Continue Game");

  return (
    <div className={styles.container}>
      {/* 背景 */}
      <BackgroundDecoration />

      {/* メインコンテンツ */}
      <div className={styles.contentWrapper}>
        <TitleSection />

        <MainMenu onStart={handleStart} onContinue={handleContinue} />
      </div>
    </div>
  );
}
