/*------------------------------
Copyright (c) 2025 PotatoDragon
Released under the MIT License.
https://opensource.org/license/mit
------------------------------*/

/*:
@target MZ
@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Battle/Enemy/EnemyMpCostZero.js
@plugindesc Enemy MP cost 0 Ver1.0.0 (2025/1/1)
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
When enemy characters use MP-consuming skills, the cost is reduced to 0.

## How to Use
No setup required.
Just install the plugin and it will work.
*/

/*:ja
@plugindesc
敵消費MPコスト0 Ver1.0.0(2025/1/1)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Battle/Enemy/EnemyMpCostZero.js
@target MZ
@author ポテトードラゴン

・アップデート情報
Ver1.0.0: 公開

Copyright (c) 2025 ポテトードラゴン
Released under the MIT License.
https://opensource.org/license/mit

@help
## 概要
敵キャラがMP消費スキルを使用するときにコストが0になります

## 使い方
初期設定は必要ありません  
プラグイン導入だけで動作します
*/
(() => {
    'use strict';

    /**
     * スキルの消費 MP 計算
     *
     * @param {} skill - 
     * @returns {} 
     */
    Game_Enemy.prototype.skillMpCost = function(skill) {
        return 0;
    };
})();
