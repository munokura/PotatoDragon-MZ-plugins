/*------------------------------
Copyright (c) 2025 PotatoDragon
Released under the MIT License.
https://opensource.org/license/mit
------------------------------*/

/*:
@target MZ
@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Battle/ElementAverage.js
@plugindesc Attribute average calculation Ver1.3.6 (2022/9/10)
@author PotatoDragon
@license MIT License

@help
English Help Translator: munokura
Please check the URL below for the latest version of the plugin.
URL https://github.com/pota-gon/RPGMakerMZ/wiki
-----

## Overview
Calculates elemental effectiveness based on the average value, rather than the
maximum value.

Equipment with elemental effects, such as the Flame Sword, will reduce damage.

## How to Use
No initial setup required. Just install the plugin and it will work.

### Example: Attacking a Salamander with a Flame Sword

#### Settings
- Flame Sword (Weapon)
Attack Element: Physical
Attack Element: Fire

- Salamander (Enemy Character)
Elemental Effectiveness: Fire * 0%
* If elemental effectiveness is not set, it will be 100%, so in this case, the
physical elemental effectiveness will be 100%.

#### Before Installation (Calculated with Maximum Value)
The elemental effectiveness is determined by the highest % of all elements.
[Physical (100%), Fire (0%)] => Elemental Effectiveness: 100% (No change in
elemental damage).

#### After Installation (Calculated with Average Value)
The average of all elements is determined as elemental effectiveness.
[Physical (100%), Fire (0%)] => Elemental Effectiveness: 100% (No change in
elemental damage).

#### After Installation (Calculated with Average Value)
The average of all elements is determined as elemental effectiveness.
[Physical (100%), [Fire (0%)] => Elemental Efficacy: 50% (Elemental damage is
halved)

## Parameters

### Calculate using minimum value (Min)

#### Calculate using minimum value (true)
The lowest % of all elements is the elemental efficacy.
[Physical (100%), Fire (0%)] => Elemental Efficacy: 0% (0 damage)

@param Min
@text Calculated using the minimum value
@desc This option calculates the minimum value.
@type boolean
@on Calculated using the minimum value
@off Calculated as the average
@default false
*/

/*:ja
@plugindesc
属性平均計算 Ver1.3.6(2022/9/10)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Battle/ElementAverage.js
@target MZ
@author ポテトードラゴン

・アップデート情報
Ver1.3.6: 他プラグイン導入時の convertBool が無条件で true を返すバグ修正

Copyright (c) 2025 ポテトードラゴン
Released under the MIT License.
https://opensource.org/license/mit

@help
## 概要
属性有効度を最大値ではなく、平均値で算出します

炎の剣などの属性を含む装備で  
ダメージが軽減されるようになります

## 使い方
初期設定は必要ありません  
プラグイン導入だけで動作します

### 例: 炎の剣でサラマンダーを攻撃する場合

#### 設定内容
・炎の剣(武器)  
攻撃時属性: 物理  
攻撃時属性: 炎

・サラマンダー(敵キャラ)  
属性有効度: 炎 * 0%  
※ 属性有効度は設定しない場合 100% になるので  
   この場合、物理の属性有効度は 100% となります

#### 導入前(最大値で算出)
全ての属性の中で % が1番高いものが属性有効度となる  
[物理(100%), 炎(0%)] => 属性有効度: 100%(属性によるダメージに変動なし)

#### 導入後(平均値で算出)
全ての属性の平均値が属性有効度となる  
[物理(100%), 炎(0%)] => 属性有効度: 50%(属性によるダメージが 1/2 になる)

## パラメータ

### 最小値で算出 (Min)

#### 最小値で算出 (true)
全ての属性の中で % が1番低いものが属性有効度となる  
[物理(100%), 炎(0%)] => 属性有効度: 0%(ダメージ0)

@param Min
@type boolean
@text 最小値で算出
@desc 最小値で算出するオプションです
@on 最小値で算出
@off 平均値で算出
@default false
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

    // パラメータ用変数
    const plugin_name = Potadra_getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const Min = Potadra_convertBool(params.Min);

    /**
     * 属性の平均値の取得
     *
     * @param {} target -
     * @param {array} elements - 属性 ID の配列
     * @returns {} 与えられた属性の中の平均値を返す
     */
    Game_Action.prototype.elementsMaxRate = function(target, elements) {
        if (elements.length > 0) {
            const rates = elements.map(elementId => target.elementRate(elementId));
            if (Min) {
                return Math.min(...rates);
            } else {
                // 平均値計算
                const sum = rates.reduce((r, rate) => r + rate, 0);
                return Math.max(1, sum / Math.max(1, rates.length));
            }
        }
        return 1;
    };
})();
