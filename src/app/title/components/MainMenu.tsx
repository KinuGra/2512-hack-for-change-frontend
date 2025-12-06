import React from 'react';
import { Play, BookOpen } from 'lucide-react';
import { MenuButton } from './MenuButton';
import styles from '../page.module.css';

interface MainMenuProps {
    onStart: () => void;
    onContinue: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onStart, onContinue }) => {
    return (
        <div className={styles.menuSection}>
            <MenuButton
                icon={<Play size={24} />}
                label="はじめから"
                subLabel="新しい物語を紡ぐ"
                primary
                onClick={onStart}
            />
            <MenuButton
                icon={<BookOpen size={24} />}
                label="つづきから"
                subLabel="前回までの記録"
                onClick={onContinue}
            />
        </div>
    );
};