import { redirect } from "next/navigation";
import HarvestStatus from "./game/components/HarvestStatus";
import Milk_MarketScene from "./game/components/scenes/milk/Milk_MarketScene";
import InsideHouseScene from "./game/components/scenes/shared/InsideHouseScene";
import OutsideScene from "./game/components/scenes/shared/OutsideScene";

export default function Home() {
  redirect("/title");
  return (
    <>
      {/* <OutsideScene />
      <InsideHouseScene />
      <Milk_MarketScene /> */}
    </>
  );
}
