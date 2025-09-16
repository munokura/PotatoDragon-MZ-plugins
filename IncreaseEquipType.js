/*------------------------------
Copyright (c) 2025 PotatoDragon
Released under the MIT License.
https://opensource.org/license/mit
------------------------------*/

/*:
@target MZ
@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/System/Save/IncreaseEquipType.js
@plugindesc Equipment types can be increased after saving. Ver. 1.0.0 (2023/1/18)
@author PotatoDragon
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/PotatoDragon-MZ-plugins ).
Original plugin by PotatoDragon.
Please check the latest official version at:
https://github.com/pota-gon/RPGMakerMZ/wiki
-----

## Overview
Fixes an issue that would cause an error when adding equipment types after
saving.

## How to Use
No initial setup required. Just install the plugin and it will work.
*/

/*:ja
@plugindesc
セーブ後装備タイプ増加可能 Ver1.0.0(2023/1/18)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/System/Save/IncreaseEquipType.js
@target MZ
@author ポテトードラゴン

・アップデート情報
Ver1.0.0: 公開

Copyright (c) 2025 ポテトードラゴン
Released under the MIT License.
https://opensource.org/license/mit

@help
## 概要
セーブ後に装備タイプを増やすとエラーになる問題を解決します

## 使い方
初期設定は必要ありません  
プラグイン導入だけで動作します
*/
(() => {
    'use strict';

    /**
     * ロード後の処理
     */
    const _Game_System_onAfterLoad = Game_System.prototype.onAfterLoad; 
    Game_System.prototype.onAfterLoad = function() {
        _Game_System_onAfterLoad.apply(this, arguments);

        for (const actor of $gameActors._data) {
            if (actor) {
                const slots = actor.equipSlots();
                const maxSlots = slots.length;
                for (let i = 0; i < maxSlots; i++) {
                    if (!actor._equips[i]) actor._equips[i] = new Game_Item();
                }
            }
        }
    };
})();
