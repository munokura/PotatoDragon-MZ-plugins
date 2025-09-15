/*------------------------------
Copyright (c) 2025 PotatoDragon
Released under the MIT License.
https://opensource.org/license/mit
------------------------------*/

/*:
@target MZ
@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Battle/Exp/FixedExp.js
@plugindesc Exp fixed Ver1.0.3(2025/1/18)
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
Fixes the experience points required to level up.

## Usage
1. Change the plugin parameter: Fixed Experience Points (FixedExp).
2. The experience points required for all actors will be the set value.

@param FixedExp
@text Fixed Experience Points
@desc The fixed experience value. The initial value is 100.
@type number
@default 100
@min 1
*/

/*:ja
@plugindesc
Exp固定 Ver1.0.3(2025/1/18)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Battle/Exp/FixedExp.js
@target MZ
@author ポテトードラゴン

・アップデート情報
Ver1.0.3: ヘルプ更新
Ver1.0.2: 固定経験値が正しく反映されていなかったのを修正

Copyright (c) 2025 ポテトードラゴン
Released under the MIT License.
https://opensource.org/license/mit

@help
## 概要
レベルを上げるのに必要な経験値を固定にします

## 使い方
1. プラグインパラメータ: 固定経験値(FixedExp) を変更します
2. 全アクターの必要経験値が設定した値になります

@param FixedExp
@type number
@text 固定経験値
@desc 固定する経験値の値です。初期値は 100 です
@default 100
@min 1
*/
(() => {
    'use strict';

    // ベースプラグインの処理
    function Potadra_getPluginName(extension = 'js') {
        const reg = new RegExp(".+\/(.+)\." + extension);
        return decodeURIComponent(document.currentScript.src).replace(reg, '$1');
    }

    // パラメータ用定数
    const plugin_name = Potadra_getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用定数
    const FixedExp = Number(params.FixedExp || 100);

    /**
     * 指定レベルに上がるのに必要な累計経験値の取得
     *
     * @param {number} level - レベル
     */
    Game_Actor.prototype.expForLevel = function(level) {
        if (level === 1) return 0;

        return FixedExp * (level - 1);
    };
})();
