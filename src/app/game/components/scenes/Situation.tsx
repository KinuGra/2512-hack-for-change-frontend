import situation from "./Situation.module.css";

type SituationProps = {
  bg: string; // 背景画像
  children: React.ReactNode;
};

export default function Situation({ bg, children }: SituationProps) {
  return (
    <>
      <div className={situation.container}>
        <img
          src={bg}
          className={situation.bgImage}
          alt="situation background image"
        />
        {children}
      </div>
    </>
  );
}
