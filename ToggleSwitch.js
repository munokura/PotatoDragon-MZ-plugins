/*------------------------------
Copyright (c) 2025 PotatoDragon
Released under the MIT License.
https://opensource.org/license/mit
------------------------------*/

/*:
@target MZ
@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/System/Switch/ToggleSwitch.js
@plugindesc Toggle Switch Ver1.2.5 (2022/12/2)
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
Provides a plugin command that toggles the ON/OFF state of a specified switch.

## Usage
1. Call the plugin command.
2. Specify the switch you want to toggle ON/OFF from the plugin command.
3. When an event that specifies the plugin command is called,
the specified switch will toggle ON/OFF.

@command toggle_switch
@text toggle switch
@desc Toggles the specified switch between ON and OFF.
@arg ToggleSwitch
@text toggle switch
@desc A switch that alternates between ON and OFF
@type switch
*/

/*:ja
@plugindesc
トグルスイッチ Ver1.2.5(2022/12/2)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/System/Switch/ToggleSwitch.js
@target MZ
@author ポテトードラゴン

・アップデート情報
Ver1.2.5: URLを修正

Copyright (c) 2025 ポテトードラゴン
Released under the MIT License.
https://opensource.org/license/mit

@help
## 概要
指定したスイッチのON・OFFを交互に切り替えるプラグインコマンドを提供します

## 使い方
1. プラグインコマンドを呼び出します
2. プラグインコマンドからON・OFFを交互に切り替えたいスイッチを指定します
3. プラグインコマンドを指定したイベントが呼び出されると  
   指定したスイッチのON・OFFが切り替わります

@command toggle_switch
@text トグルスイッチ
@desc 指定したスイッチのON・OFFを交互に切り替えます

    @arg ToggleSwitch
    @type switch
    @text トグルスイッチ
    @desc ON・OFFを交互に切り替えるスイッチ
*/
(() => {
    'use strict';

    // ベースプラグインの処理
    function Potadra_getPluginName(extension = 'js') {
        const reg = new RegExp(".+\/(.+)\." + extension);
        return decodeURIComponent(document.currentScript.src).replace(reg, '$1');
    }

    // パラメータ用変数
    const plugin_name = Potadra_getPluginName();

    // プラグインコマンド(トグルスイッチ)
    PluginManager.registerCommand(plugin_name, "toggle_switch", args => {
        const ToggleSwitch = Number(args.ToggleSwitch);
        $gameSwitches.setValue(ToggleSwitch, !$gameSwitches.value(ToggleSwitch));
    });
})();
