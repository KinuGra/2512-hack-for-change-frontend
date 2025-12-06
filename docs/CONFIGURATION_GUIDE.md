# ゲーム設定ガイド

本プロジェクトにおける主要な設定値（ターン数、待機時間など）の定義場所についてまとめました。

## 1. 1プレイあたりのターン数（シチュエーション数）

現在の設定： **3ターン** （3つのシチュエーションを完了するとエンディングへ）

**変更方法**:
ファイル: `src/app/game/hooks/useGameState.ts`

`finishRice` 関数内の条件判定の数値を変更してください。

```typescript
// useGameState.ts

const finishRice = useCallback(() => {
    // 3回シチュエーションを行ったら終了
    if (playedSituations.length >= 3) { // ← この数字を変更
      setMode("final");
    } else {
      // ...
    }
}, [playedSituations.length]);
```

## 2. アニメーション・待機時間の設定

ファイル: `src/app/game/constants.ts`

以下の定数で一括管理されています。

```typescript
// src/app/game/constants.ts

// 農家のカットインが表示される時間（ミリ秒）
// デフォルト: 3000 (3秒)
export const CUT_IN_DURATION = 3000;

// シーン遷移までの待機時間（ミリ秒）
// デフォルト: 3000 (3秒) → これを全シーンで統一的に使用します
export const SCENE_TRANSITION_DELAY = 3000;
```

これらの値を変更することで、ゲーム全体のテンポを調整できます。

## 3. シチュエーションの抽選ロジック

ファイル: `src/app/game/page.tsx`

`ALL_SITUATIONS` 配列に定義されたリストから、未プレイのものがランダムに選ばれます。

```typescript
// page.tsx

// シチュエーションの定義リスト
const ALL_SITUATIONS: Array<string> = ["milk", "shopping", "water", "aircon"];
```

新しいシチュエーションを追加した場合は、このリストに追加する必要があります。
