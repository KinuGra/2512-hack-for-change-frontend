"use client";

import React from "react";
import OutsideScene from "./scenes/shared/OutsideScene";
import InsideHouseScene from "./scenes/shared/InsideHouseScene";
import Milk_MarketScene from "./scenes/milk/Milk_MarketScene";
import Milk_DisposalScene from "./scenes/milk/Milk_DisposalScene";

import Shopping_DetailScene from "./scenes/shopping/Shopping_DetailScene";
import Shopping_OrderScene from "./scenes/shopping/Shopping_OrderScene";
import Shopping_DeliveryScene from "./scenes/shopping/Shopping_DeliveryScene";
import Shopping_ReturnScene from "./scenes/shopping/Shopping_ReturnScene";

import Water_WashbasinScene from "./scenes/water/Water_WashbasinScene";
import Water_ShowerScene from "./scenes/water/Water_ShowerScene";
import Water_ShampooScene from "./scenes/water/Water_ShampooScene";
import Water_CleaningScene from "./scenes/water/Water_CleaningScene";

import Aircon_TempScene from "./scenes/aircon/Aircon_TempScene";
import Aircon_CurtainScene from "./scenes/aircon/Aircon_CurtainScene";
import Aircon_GoingOutScene from "./scenes/aircon/Aircon_GoingOutScene";
import Aircon_FilterScene from "./scenes/aircon/Aircon_FilterScene";

export type ShowPopupHelpers = {
  applyHarvestDelta: (d: number, action?: string) => void;
  currentHarvestPercent: number;
  showCutIn: (beforeSrc: string, afterSrc: string) => void;
};

export type SceneProps = {
  sceneName?: string;
  goToScene: (next: string) => void;
  startScene?: (situation: string) => void;
  endSituation?: () => void;
  currentSituation?: string | null;
  showPopup?: (
    renderer: (hide: () => void, helpers: ShowPopupHelpers) => React.ReactNode
  ) => void;
};

type Props = SceneProps;

const SceneRenderer: React.FC<Props> = ({
  sceneName,
  goToScene,
  endSituation,
  currentSituation,
  showPopup,
}) => {
  // 既存の scene コンポーネントが揃っている箇所だけ明示的にマッピング
  switch (sceneName) {
    case "shared/outside":
      return (
        <OutsideScene
          goToScene={goToScene}
          endSituation={endSituation}
          currentSituation={currentSituation}
          showPopup={showPopup}
        />
      );

    case "shared/house":
      return (
        <InsideHouseScene
          goToScene={goToScene}
          endSituation={endSituation}
          currentSituation={currentSituation}
          showPopup={showPopup}
        />
      );

    case "milk/market":
      return (
        <Milk_MarketScene
          goToScene={goToScene}
          endSituation={endSituation}
          currentSituation={currentSituation}
          showPopup={showPopup}
        />
      );

    case "milk/disposal":
      return (
        <Milk_DisposalScene
          goToScene={goToScene}
          endSituation={endSituation}
          currentSituation={currentSituation}
          showPopup={showPopup}
        />
      );

    // Shopping
    case "shopping/detail":
      return (
        <Shopping_DetailScene goToScene={goToScene} showPopup={showPopup} />
      );
    case "shopping/order":
      return <Shopping_OrderScene goToScene={goToScene} showPopup={showPopup} />;
    case "shopping/delivery":
      return (
        <Shopping_DeliveryScene goToScene={goToScene} showPopup={showPopup} />
      );
    case "shopping/return":
      // Final Shopping Scene
      return (
        <Shopping_ReturnScene
          goToScene={goToScene}
          endSituation={endSituation}
          showPopup={showPopup}
        />
      );

    // Water
    case "water/washbasin":
      return (
        <Water_WashbasinScene goToScene={goToScene} showPopup={showPopup} />
      );
    case "water/shower":
      return <Water_ShowerScene goToScene={goToScene} showPopup={showPopup} />;
    case "water/shampoo":
      return <Water_ShampooScene goToScene={goToScene} showPopup={showPopup} />;
    case "water/cleaning":
      return (
        <Water_CleaningScene
          goToScene={goToScene}
          endSituation={endSituation}
          showPopup={showPopup}
        />
      );

    // Aircon
    case "aircon/temp":
      return <Aircon_TempScene goToScene={goToScene} showPopup={showPopup} />;
    case "aircon/curtain":
      return <Aircon_CurtainScene goToScene={goToScene} showPopup={showPopup} />;
    case "aircon/goingout":
      return (
        <Aircon_GoingOutScene goToScene={goToScene} showPopup={showPopup} />
      );
    case "aircon/filter":
      return (
        <Aircon_FilterScene
          goToScene={goToScene}
          endSituation={endSituation}
          showPopup={showPopup}
        />
      );

    case "milk/car":
    case "milk/milkShelf":
    case "bento/market":
    case "bento/shopInside":
      // placeholder for specific scenes — UI チームが詳細を差し替え可能
      return (
        <div>
          <h3>{sceneName}</h3>
          <p>これはプレースホルダのシーンです。</p>
          <button onClick={() => goToScene("shared/house")}>家に戻る</button>
          <button onClick={endSituation}>シチュエーションを終了する</button>
        </div>
      );

    default:
      return (
        <div>
          <h3>Unknown Scene</h3>
          <p>{sceneName}</p>
          <button onClick={() => goToScene("shared/house")}>家に戻る</button>
        </div>
      );
  }
};

export default SceneRenderer;
