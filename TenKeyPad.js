/*------------------------------
Copyright (c) 2025 PotatoDragon
Released under the MIT License.
https://opensource.org/license/mit
------------------------------*/

/*:
@target MZ
@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Config/Key/TenKeyPad.js
@plugindesc Numerical keypad input Ver1.0.1 (2023/6/26)
@author PotatoDragon
@license MIT License

@help
English Help Translator: munokura
Please check the URL below for the latest version of the plugin.
URL https://github.com/pota-gon/RPGMakerMZ/wiki
-----

## Overview
Extends the 7 key on the numeric keypad to the Q key and the 9 key to the W
key.

## Usage
No initial setup required.
Just install the plugin and it will work.
*/

/*:ja
@plugindesc
テンキー入力 Ver1.0.1(2023/6/26)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Config/Key/TenKeyPad.js
@orderAfter wasdKeyMZ
@target MZ
@author ポテトードラゴン

・アップデート情報
Ver1.0.1 ロンチプラグインの wasdKeyMZ.js と競合するため、順番をエラー表示するように修正

Copyright (c) 2025 ポテトードラゴン
Released under the MIT License.
https://opensource.org/license/mit

@help
## 概要
テンキーの 7 を Qキー 9 を W キーに拡張します

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

    Input.keyMapper[103] = 'pageup';
    Input.keyMapper[105] = 'pagedown';
})();
