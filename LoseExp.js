/*------------------------------
Copyright (c) 2025 PotatoDragon
Released under the MIT License.
https://opensource.org/license/mit
------------------------------*/

/*:
@target MZ
@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Battle/Exp/LoseExp.js
@plugindesc Defeat Experience Ver1.0.1 (2025/7/22)
@author PotatoDragon
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Original plugin by PotatoDragon.
Please check the latest official version at:
https://github.com/pota-gon/RPGMakerMZ/wiki
-----

## Overview
Allows you to earn half the normal amount of experience points upon defeat.

## Specifications
- Experience points upon defeat = normal experience points ÷ 2
- All decimal points are rounded down.

## Usage
No initial setup required.
Just install the plugin and it will work.

## Example
- 100 normal experience points → 50 defeat experience points
- 1 normal experience point → 0 defeat experience points (rounded down to 0.5)
- 3 normal experience points → 1 defeat experience point (rounded down to 1.5)
- 5 normal experience points → 2 defeat experience points (rounded down to
2.5)
*/

/*:ja
@plugindesc
敗北経験値 Ver1.0.1(2025/7/22)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Battle/Exp/LoseExp.js
@target MZ
@author ポテトードラゴン

・アップデート情報
Ver1.0.1: 小数点は切り捨てるように修正
Ver1.0.0: 公開

Copyright (c) 2025 ポテトードラゴン
Released under the MIT License.
https://opensource.org/license/mit

@help
## 概要
敗北時に通常の経験値の半分を獲得できるようにします

## 仕様
- 敗北時の経験値 = 通常経験値 ÷ 2
- 小数点以下は全て切り捨てされます

## 使い方
初期設定は必要ありません  
プラグイン導入だけで動作します

## 例
- 通常経験値100 → 敗北経験値50
- 通常経験値1 → 敗北経験値0（0.5を切り捨て）
- 通常経験値3 → 敗北経験値1（1.5を切り捨て）
- 通常経験値5 → 敗北経験値2（2.5を切り捨て）
*/
(() => {
   'use strict';

   /**
    * 敗北の処理
    */
   const _BattleManager_processDefeat = BattleManager.processDefeat;
   BattleManager.processDefeat = function () {
      _BattleManager_processDefeat.apply(this, arguments);
      this.potadraLoseMakeRewards();
      this.displayRewards();
      this.potadraLoseGainExp();
   };

   /**
    * 敗北経験値の作成
    */
   BattleManager.potadraLoseMakeRewards = function () {
      this._rewards = {
         gold: 0,
         exp: Math.floor($gameTroop.expTotal() / 2), // 小数点以下は全て切り捨て
         items: []
      };
   };

   /**
    * 経験値の獲得とレベルアップの表示
    */
   BattleManager.potadraLoseGainExp = function () {
      const exp = this._rewards.exp;
      for (const actor of $gameParty.allMembers()) {
         actor.potadraGainExp(exp);
      }
   };

   /**
    * 経験値の獲得（経験獲得率を考慮）
    *
    * @param {number} exp - 経験値
    */
   Game_Actor.prototype.potadraGainExp = function (exp) {
      const newExp = this.currentExp() + Math.round(exp * this.potadraFinalExpRate());
      this.changeExp(newExp, this.shouldDisplayLevelUp());
   };

   /**
    * 最終的な経験獲得率の計算
    * 戦闘に出ているか控えかで変わる
    *
    * @returns {number} 最終的な経験獲得率
    */
   Game_Actor.prototype.potadraFinalExpRate = function () {
      return this.isBattleMember() ? 1 : this.benchMembersExpRate();
   };
})();
