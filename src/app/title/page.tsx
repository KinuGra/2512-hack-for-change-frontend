'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { BackgroundDecoration } from './components/BackgroundDecoration';
import { TitleSection } from './components/TitleSection';
import { MainMenu } from './components/MainMenu';

export default function Home() {
  const [showSettings] = useState(false);

  // 画面遷移などのロジック
  const handleStart = () => console.log('Start Game');
  const handleContinue = () => console.log('Continue Game');

  return (
    <div className={styles.container}>
      {/* 背景 */}
      <BackgroundDecoration />

      {/* メインコンテンツ */}
      <div className={styles.contentWrapper}>
        <TitleSection />

        <MainMenu
          onStart={handleStart}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
}