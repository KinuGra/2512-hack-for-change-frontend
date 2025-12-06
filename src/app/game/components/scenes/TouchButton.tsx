"use client";

import styles from "./Situation.module.css";

type TouchButtonProps = {
  top: string;
  left: string;
  icon?: string;
  onClick?: () => void;
};

export default function TouchButton({
  top,
  left,
  icon = "/images/shared/touch.png",
  onClick,
  label,
}: TouchButtonProps & { label?: string }) {
  return (
    <div
      className={styles.iconWrapper}
      style={{
        top,
        left,
        cursor: onClick ? "pointer" : "default",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => (e.key === "Enter" || e.key === " ") && onClick()
          : undefined
      }
    >
      <img src={icon} className={styles.overlayImage} alt="touch button" />
      {label && (
        <span
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "4px 8px",
            borderRadius: "4px",
            marginTop: "4px",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#333",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
