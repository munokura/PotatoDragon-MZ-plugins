/*------------------------------
Copyright (c) 2025 PotatoDragon
Released under the MIT License.
https://opensource.org/license/mit
------------------------------*/

/*:
@target MZ
@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Config/Key/Jump.js
@plugindesc Jump Ver. 1.0.1 (June 26, 2023)
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
Press the J key to jump on the spot.

## How to Use
No initial setup required.
Just install the plugin and it will work.
*/

/*:ja
@plugindesc
ジャンプ Ver1.0.1(2023/6/26)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Config/Key/Jump.js
@orderAfter wasdKeyMZ
@target MZ
@author ポテトードラゴン

・アップデート情報
Ver1.0.1: ロンチプラグインの wasdKeyMZ.js と競合するため、順番をエラー表示するように修正

Copyright (c) 2025 ポテトードラゴン
Released under the MIT License.
https://opensource.org/license/mit

@help
## 概要
Jキーを押すことでその場でジャンプします

## 使い方
初期設定は必要ありません  
プラグイン導入だけで動作します
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

    Input.keyMapper[74] = 'J';

    const _Game_Player_triggerButtonAction = Game_Player.prototype.triggerButtonAction;
    Game_Player.prototype.triggerButtonAction = function() {
        const value = _Game_Player_triggerButtonAction.apply(this, arguments);
        if (Input.isTriggered("J")) {
            this.jump(0, 0);
        }
        return value;
    };
})();
