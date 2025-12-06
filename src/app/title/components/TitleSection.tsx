import React from 'react';
import { Leaf } from 'lucide-react';
import styles from '../page.module.css';

export const TitleSection = () => {
    return (
        <div className={styles.titleSection}>
            <div className={styles.logoCircle}>
                <Leaf size={28} color="#5C6B3F" />
            </div>
            <h1 className={styles.mainTitle}>
                地球とごはんの物語
            </h1>
            <p className={styles.subTitle}>
                あなたの選択が未来を変える
            </p>
        </div>
    );
};


