import Situation from "../Situation";
import TouchButton from "../TouchButton";
export default function OutsideScene() {
  return (
    <>
      <Situation bg="/images/shared/OutsideScene.jpg">
        <TouchButton top="48%" left="25%" />
        <TouchButton top="68%" left="60%" />
        <TouchButton top="35%" left="60%" />
      </Situation>
    </>
  );
}
