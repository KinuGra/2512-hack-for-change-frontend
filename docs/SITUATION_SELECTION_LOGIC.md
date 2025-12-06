# シチュエーション抽選ロジックについて

シチュエーション（「milk」「shopping」「water」「aircon」）のランダム抽選は、`src/app/game/page.tsx` ファイル内の `startRandomSituation` 関数で実装されています。

## 処理の流れ

1.  **候補リストの定義**
    `ALL_SITUATIONS` という配列に、全てのプレイ可能なシチュエーションIDが定義されています。
    ```typescript
    const ALL_SITUATIONS: Array<string> = ["milk", "shopping", "water", "aircon"];
    ```

2.  **未プレイのシチュエーションを抽出**
    `useGameState` フックで管理されている `playedSituations`（既にプレイ済みのシチュエーションIDのリスト）を使用し、まだプレイしていないシチュエーションのみを抽出して `available` 配列を作成します。
    ```typescript
    const available = ALL_SITUATIONS.filter((s) => !playedSituations.includes(s));
    ```

3.  **ランダム選択**
    `available` 配列の長さ（`available.length`）に基づき、`Math.random()` を使用してランダムなインデックスを生成します。そのインデックスに対応するシチュエーションIDを `chosen` として取得します。
    ```typescript
    const idx = Math.floor(Math.random() * available.length);
    const chosen = available[idx];
    ```

4.  **シチュエーションの開始**
    選ばれたシチュエーションID (`chosen`) を引数として、以下の2つの関数を呼び出します。
    *   `startSituation(chosen)`: ゲーム状態（現在のシチュエーションIDなど）を更新します。
    *   `startSceneForSituation(chosen)`: 選ばれたシチュエーションに対応する初期シーン（例: お風呂なら「water/washbasin」）を設定し、画面遷移を行います。

## トリガー

この抽選処理は、ゲームモード (`mode`) がマップ画面 (`map`) に切り替わったタイミングで、Reactの `useEffect` フックによって自動的に呼び出されます。

```typescript
// 自動的にランダムシチュ開始 (modeが変わってmapになったら)
useEffect(() => {
  if (mode === "map") {
    startRandomSituation();
  }
}, [mode, startRandomSituation]);
```

これにより、プレイヤーがマップ画面に戻るたびに、まだプレイしていない新しいシチュエーションが自動的に開始される仕組みになっています。
