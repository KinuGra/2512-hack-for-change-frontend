import styles from "./Situation.module.css";

type TouchButtonProps = {
  top: string;
  left: string;
  icon?: string;
};

export default function TouchButton({
  top,
  left,
  icon = "/touch.png",
}: TouchButtonProps) {
  return (
    <div className={styles.iconWrapper} style={{ top, left }}>
      <img src={icon} className={styles.overlayImage} alt="touch button" />
    </div>
  );
}
