import React from 'react';
import styles from './HarvestStatus.module.css';

interface HarvestStatusProps {
    /**
     * バックエンドから計算されたスコア（0〜100を想定）
     * 例: 62
     */
    score: number;
}

const HarvestStatus: React.FC<HarvestStatusProps> = ({ score }) => {
    return (
        <div className={styles.card}>
            <div className={styles.infoContainer}>
                <span className={styles.label}>収穫量</span>
                <div className={styles.scoreWrapper}>
                    <span className={styles.scoreValue}>{score}</span>
                    <span className={styles.unit}>%</span>
                </div>
            </div>

            <div className={styles.iconContainer}>
                {/* 稲穂をモチーフにした、より作物らしいアイコンに変更 */}
                <svg
                    viewBox="0 0 24 24"
                    className={styles.icon}
                    fill="currentColor"  // 塗りつぶしに変更して実体感を出す
                >
                    {/* 地面 */}
                    <path d="M4 20h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                    {/* 茎と稲穂の部分 */}
                    <path d="M11 20V9.5C11 7.5 12.5 6 14 4.5c.5-.5 1-1 1-1.5s-.5-1-1-1c-1.5 0-3 1.5-4 3.5-.5 1-1 2-1 3v2H8c-1.1 0-2 .9-2 2v3H5v2h2v-5c0-.6.4-1 1-1h1v5h2zM13 8c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm2-3c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-4 6c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" />
                    {/* 穂先の粒々 */}
                    <circle cx="15.5" cy="5.5" r="1.5" />
                    <circle cx="17.5" cy="8.5" r="1.5" />
                    <circle cx="12.5" cy="10.5" r="1.5" />
                </svg>
            </div>
        </div>
    );
};

export default HarvestStatus;
