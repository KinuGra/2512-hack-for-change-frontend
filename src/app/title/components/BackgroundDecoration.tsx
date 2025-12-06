import React from 'react';
import { Leaf } from 'lucide-react';
import styles from '../page.module.css';

export const BackgroundDecoration = () => {
    return (
        <div className={styles.backgroundDecoration}>
            <Leaf className={`${styles.leafIcon} ${styles.leaf1}`} />
            <Leaf className={`${styles.leafIcon} ${styles.leaf2}`} />
            <Leaf className={`${styles.leafIcon} ${styles.leaf3}`} />
            <div className={`${styles.blob} ${styles.blob1}`} />
            <div className={`${styles.blob} ${styles.blob2}`} />
        </div>
    );
};
