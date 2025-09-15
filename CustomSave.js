/*------------------------------
Copyright (c) 2025 PotatoDragon
Released under the MIT License.
https://opensource.org/license/mit
------------------------------*/

/*:
@target MZ
@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/System/Save/CustomSave.js
@plugindesc Save Content Customization Ver0.5.0 (2022/12/2)
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
Customize your save data.

## How to Use
Change parameter settings and select the save data you need.

@param System
@text system
@desc Do you want to save system save data?
@type boolean
@on Save
@off Don't save
@default true

@param Screen
@text screen
@desc Do you want to save screen save data?
@type boolean
@on Save
@off Don't save
@default true

@param Timer
@text timer
@desc Do you want to save the timer save data?
@type boolean
@on Save
@off Don't save
@default true

@param Switches
@text switch
@desc Do you want to save your Switch save data?
@type boolean
@on Save
@off Don't save
@default true

@param Variables
@text variable
@desc Do you want to save variable save data?
@type boolean
@on Save
@off Don't save
@default true

@param SelfSwitches
@text Self-Switch
@desc Do you want to save your Self-Switch save data?
@type boolean
@on Save
@off Don't save
@default true

@param Actor
@text actor
@desc Do you want to save actor save data?
@type boolean
@on Save
@off Don't save
@default true

@param Party
@text party
@desc Do you want to save your party data?
@type boolean
@on Save
@off Don't save
@default true

@param Map
@text map
@desc Do you want to save the map data?
@type boolean
@on Save
@off Don't save
@default true

@param Player
@desc Do you want to save player save data?
@type boolean
@on Save
@off Don't save
@default true
*/

/*:ja
@plugindesc
セーブ内容カスタマイズ Ver0.5.0(2022/12/2)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/System/Save/CustomSave.js
@orderAfter NoEncrypt
@target MZ
@author ポテトードラゴン

・アップデート情報
Ver0.5.0: 開発版を公開

Copyright (c) 2025 ポテトードラゴン
Released under the MIT License.
https://opensource.org/license/mit

@help
## 概要
セーブ内容のカスタマイズを実施します

## 使い方
パラメータの設定を変更し、必要なセーブデータを選択してください

@param System
@type boolean
@text システム
@desc システムのセーブデータを保存するか
@on 保存する
@off 保存しない
@default true

@param Screen
@type boolean
@text スクリーン
@desc スクリーンのセーブデータを保存するか
@on 保存する
@off 保存しない
@default true

@param Timer
@type boolean
@text タイマー
@desc タイマーのセーブデータを保存するか
@on 保存する
@off 保存しない
@default true

@param Switches
@type boolean
@text スイッチ
@desc スイッチのセーブデータを保存するか
@on 保存する
@off 保存しない
@default true

@param Variables
@type boolean
@text 変数
@desc 変数のセーブデータを保存するか
@on 保存する
@off 保存しない
@default true

@param SelfSwitches
@type boolean
@text セルフスイッチ
@desc セルフスイッチのセーブデータを保存するか
@on 保存する
@off 保存しない
@default true

@param Actor
@type boolean
@text アクター
@desc アクターのセーブデータを保存するか
@on 保存する
@off 保存しない
@default true

@param Party
@type boolean
@text パーティー
@desc パーティーのセーブデータを保存するか
@on 保存する
@off 保存しない
@default true

@param Map
@type boolean
@text マップ
@desc マップのセーブデータを保存するか
@on 保存する
@off 保存しない
@default true

@param Player
@type boolean
@text プレイヤー
@desc プレイヤーのセーブデータを保存するか
@on 保存する
@off 保存しない
@default true
*/
(() => {
    'use strict';

    // ベースプラグインの処理
    function Potadra_getPluginName(extension = 'js') {
        const reg = new RegExp(".+\/(.+)\." + extension);
        return decodeURIComponent(document.currentScript.src).replace(reg, '$1');
    }
    function Potadra_convertBool(bool) {
        if (bool === "false" || bool === '' || bool === undefined) {
            return false;
        } else {
            return true;
        }
    }

    // パラメータ用定数
    const plugin_name = Potadra_getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用定数
    const System       = Potadra_convertBool(params.System);
    const Screen       = Potadra_convertBool(params.Screen);
    const Timer        = Potadra_convertBool(params.Timer);
    const Switches     = Potadra_convertBool(params.Switches);
    const Variables    = Potadra_convertBool(params.Variables);
    const SelfSwitches = Potadra_convertBool(params.SelfSwitches);
    const Actor        = Potadra_convertBool(params.Actor);
    const Party        = Potadra_convertBool(params.Party);
    const Map          = Potadra_convertBool(params.Map);
    const Player       = Potadra_convertBool(params.Player);

    /**
     * 
     *
     * @param {} saveName - 
     * @param {} object - 
     */
    const _StorageManager_saveObject = StorageManager.saveObject;
    StorageManager.saveObject = function(saveName, object) {
        // system
        if (!System) { 
            delete object.system;
        } else {
            // 子要素の削除
        }

        // screen
        if (!Screen) {
            delete object.screen;
        } else {
            // 子要素の削除
        }

        // タイマー
        if (!Timer) {
            delete object.timer;
        } else {
            // 子要素の削除
        }

        // スイッチ
        if (!Switches) {
            delete object.switches;
        }

        // 変数
        if (!Variables) {
            delete object.variables;
        }

        // セルフスイッチ
        if (!SelfSwitches) {
            delete object.selfSwitches;
        }

        // アクター
        if (!Actor) {
            delete object.actors;
        } else {
            // 子要素の削除
        }

        // パーティー
        if (!Party) {
            delete object.party;
        } else {
            // 子要素の削除
        }

        // マップ
        if (!Map) {
            delete object.map;
        } else {
            // 子要素の削除
        }

        // プレイヤー
        if (!Player) {
            delete object.player;
        } else {
            // 子要素の削除
        }

        return _StorageManager_saveObject.apply(this, arguments);
    };
})();
