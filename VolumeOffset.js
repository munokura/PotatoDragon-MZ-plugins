/*------------------------------
Copyright (c) 2025 PotatoDragon
Released under the MIT License.
https://opensource.org/license/mit
------------------------------*/

/*:
@target MZ
@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Config/Option/VolumeOffset.js
@plugindesc Optional volume switching range Ver1.0.5 (2025/1/18)
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
Changes the volume switching range of the option.

## Usage
1. Changes the plugin parameter: volume switching range (volumeOffset).
2. Selecting an option volume will switch by a percentage of the specified
range.

@param volumeOffset
@text Volume Switching Range
@desc Volume switching range
@type number
@default 20
@min 1
@max 100
*/

/*:ja
@plugindesc
オプションボリューム切り替え範囲 Ver1.0.5(2025/1/18)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Config/Option/VolumeOffset.js
@target MZ
@author ポテトードラゴン

・アップデート情報
Ver1.0.5: ヘルプ更新

Copyright (c) 2025 ポテトードラゴン
Released under the MIT License.
https://opensource.org/license/mit

@help
## 概要
オプションのボリューム切り替え範囲を変更します

## 使い方
1. プラグインパラメータ: ボリューム切替範囲(volumeOffset) を変更します
2. オプションのボリュームを選択すると指定した範囲の%ごとの切り替えになります

@param volumeOffset
@type number
@text ボリューム切替範囲
@desc ボリュームの切り替え範囲
@default 20
@min 1
@max 100
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
    const volumeOffset = Number(params.volumeOffset || 0);

    /**
     * ボリュームの切り替え範囲
     *
     * @returns {} 
     */
    Window_Options.prototype.volumeOffset = function() {
        return volumeOffset;
    };
})();
