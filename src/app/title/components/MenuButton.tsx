import React from 'react';
import styles from '../page.module.css';

interface MenuButtonProps {
    icon: React.ReactNode;
    label: string;
    subLabel?: string;
    primary?: boolean;
    onClick: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ icon, label, subLabel, primary, onClick }) => {
    const buttonClass = primary
        ? `${styles.menuButton} ${styles.menuButtonPrimary}`
        : styles.menuButton;

    return (
        <button onClick={onClick} className={buttonClass}>
            <div className={styles.iconWrapper}>
                {icon}
            </div>
            <div className={styles.labelGroup}>
                <div className={styles.buttonLabel}>{label}</div>
                {subLabel && <div className={styles.buttonSubLabel}>{subLabel}</div>}
            </div>
            <div className={styles.arrowIcon}>▶</div>
        </button>
    );
};
