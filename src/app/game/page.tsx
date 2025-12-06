import styles from "./page.module.css";
import HarvestStatus from "./components/HarvestStatus";

export default function GamePage() {
  return (
    <main className={styles.container}>
      <section className={styles.stage}>
        <p className={styles.placeholder}>
          ゲーム本編の UI はここに配置されます（中央寄せ）。
        </p>
      </section>
      <HarvestStatus harvestPercent={150} />
    </main>
  );
}
