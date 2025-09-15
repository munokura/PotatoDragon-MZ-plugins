/*------------------------------
Copyright (c) 2025 PotatoDragon
Released under the MIT License.
https://opensource.org/license/mit
------------------------------*/

/*:
@target MZ
@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Battle/ShowWeaponTypeSkill.js
@plugindesc Weapon mismatch skill hide Ver1.3.3 (April 1, 2022)
@author PotatoDragon
@license MIT License

@help
English Help Translator: munokura
Please check the URL below for the latest version of the plugin.
URL https://github.com/pota-gon/RPGMakerMZ/wiki
-----

## Overview
If the actor's equipped weapon type does not match the skill's weapon type,
the skill will be hidden.
* This only applies during combat.

For example, if an actor is equipped with a sword, even if they have learned
an axe skill, it will not be displayed during combat.

## How to Use
No initial setup required. Simply install the plugin to get started.
*/

/*:ja
@plugindesc
武器不一致スキル非表示 Ver1.3.3(2022/4/1)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Battle/ShowWeaponTypeSkill.js
@target MZ
@author ポテトードラゴン

・アップデート情報
Ver1.3.3: コピーライト更新

Copyright (c) 2025 ポテトードラゴン
Released under the MIT License.
https://opensource.org/license/mit

@help
## 概要
アクターが装備している武器タイプと  
スキルの武器タイプが一致しない場合、スキルを非表示にします  
※ 戦闘時のみ非表示になります

例えば、剣を装備している場合  
斧のスキルを覚えていても戦闘時は表示しないようになります

## 使い方
初期設定は必要ありません  
プラグイン導入だけで動作します
*/
(() => {
    'use strict';

    /**
     * スキルリストの作成
     *
     * @returns {} 
     */
    const _Window_BattleSkill_makeItemList = Window_BattleSkill.prototype.makeItemList;
    Window_BattleSkill.prototype.makeItemList = function() {
        _Window_BattleSkill_makeItemList.apply(this, arguments);
        if (this._actor) {
            this._data = this._actor.skills().filter(function(item) {
                if (!this._actor.isSkillWtypeOk(item)) {
                    return false;
                } else {
                    return this.includes(item);
                }
            }, this);
        }
    };
})();
