/*------------------------------
Copyright (c) 2025 PotatoDragon
Released under the MIT License.
https://opensource.org/license/mit
------------------------------*/

/*:
@target MZ
@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/System/Switch/TempSwitches.js
@plugindesc Temporary Switch Ver1.0.3 (2022/12/2)
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
Adds a plugin command to manipulate temporary switches that are not saved as
save data.

## Usage
Temporary switches can be referenced by adding the following condition to a
conditional script:
$gameTemp._TempSwitches[temporary switch number]

Example: To specify temporary switch number 1:
$gameTemp._TempSwitches[1]

@command temp_switch_on
@text Temporarily switch on
@desc Turns the specified temporary switch ON.
@arg temp_switch
@text Temporary Switch Number
@desc Specify the temporary switch number to operate.
@type number
@default 1
@min 0

@command temp_switch_off
@text Temporarily switch off
@desc Turns the specified temporary switch OFF
@arg temp_switch
@text Temporary Switch Number
@desc Specify the temporary switch number to operate.
@type number
@default 1
@min 0

@command temp_switch_toggle
@text Momentary Switch Toggle
@desc Toggles the specified switch between ON and OFF.
@arg temp_switch
@text Temporary Switch Number
@desc Specify the temporary switch number to operate.
@type number
@default 1
@min 0
*/

/*:ja
@plugindesc
一時スイッチ Ver1.0.3(2022/12/2)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/System/Switch/TempSwitches.js
@target MZ
@author ポテトードラゴン

・アップデート情報
Ver1.0.3: URLを修正

Copyright (c) 2025 ポテトードラゴン
Released under the MIT License.
https://opensource.org/license/mit

@help
## 概要
セーブデータとして保持しない一時スイッチを  
操作するプラグインコマンドを追加します

## 使い方
一時スイッチは条件分岐のスクリプトに以下の条件を入れることで参照できます  
$gameTemp._TempSwitches[一時スイッチ番号]

例: 一時スイッチ番号1を指定する場合  
$gameTemp._TempSwitches[1]

@command temp_switch_on
@text 一時スイッチON
@desc 指定した一時スイッチをONにします

    @arg temp_switch
    @type number
    @text 一時スイッチ番号
    @desc 操作する一時スイッチ番号を指定します
    @default 1
    @min 0

@command temp_switch_off
@text 一時スイッチOFF
@desc 指定した一時スイッチをOFFにします

    @arg temp_switch
    @type number
    @text 一時スイッチ番号
    @desc 操作する一時スイッチ番号を指定します
    @default 1
    @min 0

@command temp_switch_toggle
@text 一時スイッチトグル
@desc 指定したスイッチのON・OFFを交互に切り替えます

    @arg temp_switch
    @type number
    @text 一時スイッチ番号
    @desc 操作する一時スイッチ番号を指定します
    @default 1
    @min 0
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

    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.apply(this, arguments);
        this._TempSwitches = [];
    };

    // プラグインコマンド(一時スイッチON)
    PluginManager.registerCommand(plugin_name, "temp_switch_on", args => {
        const temp_switch = Number(args.temp_switch);
        $gameTemp._TempSwitches[temp_switch] = true;
    });

    // プラグインコマンド(一時スイッチOFF)
    PluginManager.registerCommand(plugin_name, "temp_switch_off", args => {
        const temp_switch = Number(args.temp_switch);
        $gameTemp._TempSwitches[temp_switch] = false;
    });

    // プラグインコマンド(一時スイッチトグル)
    PluginManager.registerCommand(plugin_name, "temp_switch_toggle", args => {
        const temp_switch = Number(args.temp_switch);
        $gameTemp._TempSwitches[temp_switch] = !$gameTemp._TempSwitches[temp_switch];
    });
})();
