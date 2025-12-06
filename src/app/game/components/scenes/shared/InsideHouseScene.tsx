import Situation from "../Situation";
import TouchButton from "../TouchButton";

export default function InsideHouseScene() {
  return (
    <>
      <Situation bg="/images/shared/InsideHouseScene.png">
        <TouchButton top="30%" left="50%" />
        <TouchButton top="85%" left="37%" />
      </Situation>
    </>
  );
}
