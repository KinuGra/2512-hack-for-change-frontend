import Situation from "../../Situation";
import TouchButton from "../../TouchButton";

export default function MilkShelf() {
  return (
    <>
      <Situation bg="/images/Milk.png">
        <TouchButton top="50%" left="18%" />
        <TouchButton top="50%" left="38%" />
        <TouchButton top="60%" left="66%" />
        <TouchButton top="60%" left="83%" />
      </Situation>
    </>
  );
}
