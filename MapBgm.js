/*------------------------------
Copyright (c) 2025 PotatoDragon
Released under the MIT License.
https://opensource.org/license/mit
------------------------------*/

/*:
@target MZ
@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Game/Bgm/MapBgm.js
@plugindesc Map Battle BGM Ver1.2.7 (July 3, 2023)
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
When combat begins, the map's background music will be used.

## How to Use
No setup required.
Just install the plugin and it will work.

@param MapBgmSwitch
@text Map BGM Switch
@desc When this switch is ON, the map BGM will be used as the battle BGM.
@type switch
@default 0

@param StopVictoryMe
@text End of battle ME stopped
@desc Stop the battle end ME
@type boolean
@on stop
@off Don't stop
@default true
*/

/*:ja
@plugindesc
マップ戦闘BGM Ver1.2.7(2023/7/3)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Game/Bgm/MapBgm.js
@target MZ
@author ポテトードラゴン

・アップデート情報
Ver1.2.7: 戦闘終了ME停止が正しく動作していないバグ修正

Copyright (c) 2025 ポテトードラゴン
Released under the MIT License.
https://opensource.org/license/mit

@help
## 概要
戦闘になったとき、マップのBGMをそのまま使用します

## 使い方
初期設定は必要ありません  
プラグイン導入だけで動作します

@param MapBgmSwitch
@type switch
@text マップBGMスイッチ
@desc このスイッチがON のときにマップBGMを戦闘BGMにします
0(なし)の場合は、常にマップBGMとなります
@default 0

@param StopVictoryMe
@type boolean
@text 戦闘終了ME停止
@desc 戦闘終了MEを止めるか
止めない場合、BGMを中断して戦闘終了ME が流れます
@on 止める
@off 止めない
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
    function Potadra_checkSwitch(switch_no, bool = true) {
        return switch_no === 0 || $gameSwitches.value(switch_no) === bool;
    }

    // パラメータ用変数
    const plugin_name = Potadra_getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用定数
    const MapBgmSwitch  = Number(params.MapBgmSwitch || 0);
    const StopVictoryMe = Potadra_convertBool(params.StopVictoryMe);

    /**
     * 戦闘 BGM の演奏
     */
    const _BattleManager_playBattleBgm = BattleManager.playBattleBgm;
    BattleManager.playBattleBgm = function() {
        if (!Potadra_checkSwitch(MapBgmSwitch)) {
            _BattleManager_playBattleBgm.apply(this, arguments);
        }
    };

    /**
     * 戦闘終了 ME の演奏
     */
    const _BattleManager_playVictoryMe = BattleManager.playVictoryMe;
    BattleManager.playVictoryMe = function() {
        if (Potadra_checkSwitch(MapBgmSwitch) && StopVictoryMe) return true;

        _BattleManager_playVictoryMe.apply(this, arguments);
    };

    /**
     * 戦闘開始前、マップBGM停止
     */
    const _Scene_Map_stopAudioOnBattleStart = Scene_Map.prototype.stopAudioOnBattleStart;
    Scene_Map.prototype.stopAudioOnBattleStart = function() {
        if (!Potadra_checkSwitch(MapBgmSwitch)) {
            _Scene_Map_stopAudioOnBattleStart.apply(this, arguments);
        }
    };
})();
