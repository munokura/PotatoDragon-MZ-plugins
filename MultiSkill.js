/*------------------------------
Copyright (c) 2025 PotatoDragon
Released under the MIT License.
https://opensource.org/license/mit
------------------------------*/

/*:
@target MZ
@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Data/Skill/MultiSkill.js
@plugindesc Multiple skills added Ver1.3.9 (2025/7/22)
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
This feature allows you to acquire multiple copies of a specific skill.

Furthermore, it adds the ability to combine multiple copies of the same skill
to create a more powerful "composite skill"
and hide lower-level skills when learning a higher-level skill.

## Usage
1. Set the "Skill Type ID" plugin parameter to the "Skill Type" ID of the
skill you want to allow multiple acquisition of.
- You can check this in the database under "Type" > "Skill Type."
- Specifying `0` will allow all skills to be acquired multiple times.
2. Registering a skill name in "Excluded Skill Name" will exclude that skill
from being acquired multiple times.

### Composite Skills (Combine Identical Skills to Create a Different Skill)
You can automatically convert a skill into a different skill when a certain
number of identical skills have been learned.

1. Set the plugin parameter "Composite Skill Name."
2. Specify the name of the original skill in "Original Skill Name Before
Composite."
3. Specify the name of the new skill in "Composite Skill Name."
4. Specify the number of original skills required for the combination in
"Required Composite Quantity."

Configuration Example:**
When two "Fire" skills are learned, the two "Fire" skills are automatically
removed and one "Fire" skill is learned instead.

- Original Skill Name Before Composite: `Fire`
- Composite Skill Name: `Fire`
- Required Composite Quantity: `2`

### Hide Skills (Hide Inferior Skills)
You can hide inferior skills from the skill list while the superior skill is
learned.

1. Set the plugin parameter "Hidden Skill Name."
2. Specify the name of the base superior skill in "Superior Compatible Skill
Name."
3. In the "Hide Skill Name" field, specify the names of multiple subordinate
skills you want to hide.

Example: **
Hide "Fire" while learning "Fire"

- Superior Skill Name: `Fire`
- Hidden Skill Name:
- `Fire`

@param SkillTypeId
@text Skill Type ID
@desc Multiple skill type IDs that can be memorized
@type number
@default 0

@param ExcludeSkills
@text Excluded Skill Name
@desc Skill name to exclude
@type string[]

@param CompositeSkills
@text Composite Skill Name
@desc Information on combined skills
@type struct<CompositeSkills>[]

@param HideSkills
@text Hidden skill name
@desc Hide skills when you learn a specific skill
@type struct<HideSkills>[]
*/

/*:ja
@plugindesc
スキル複数追加 Ver1.3.9(2025/7/22)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Data/Skill/MultiSkill.js
@orderAfter NameSkill
@target MZ
@author ポテトードラゴン

・アップデート情報
Ver1.3.9: ヘルプ更新
Ver1.3.8: プラグインパラメータのスキルタイプIDに0を指定したときに、スキルタイプ制御を無効にするように修正

Copyright (c) 2025 ポテトードラゴン
Released under the MIT License.
https://opensource.org/license/mit

@help
## 概要
特定のスキルを複数個習得できるようになります

さらに、同じスキルを複数集めてより強力な「複合スキル」にしたり  
上位スキルを覚えた際に下位スキルを非表示にしたりする機能も追加します

## 使い方
1. プラグインパラメータ「スキルタイプID」に、複数習得を許可したいスキルの
   「スキルタイプ」のIDを設定します。
   - データベースの「タイプ」＞「スキルタイプ」で確認できます
   - `0` を指定すると、全てのスキルが複数習得の対象になります
2. 「除外スキル名」にスキル名を登録すると
   そのスキルは複数習得の対象外になります。

### 複合スキル（同じスキルを合成して別のスキルにする）
同じスキルを一定数覚えたときに、自動的に別のスキルに変化させることができます

1. プラグインパラメータ「複合スキル名」を設定します
2. 「複合前元スキル名」に元のスキルの名前を指定します
3. 「複合スキル名」に新しく覚えるスキルの名前を指定します
4. 「複合必要個数」に、複合するために必要な元のスキルの個数を指定します

*設定例:**
「ファイア」を2つ覚えたら、自動的に「ファイア」2つが消えて
「ファイラ」を1つ覚えるようにする場合

- 複合前元スキル名: `ファイア`
- 複合スキル名: `ファイラ`
- 複合必要個数: `2`

### スキル非表示（下位互換スキルを隠す）
上位スキルを覚えている間、下位スキルを
スキルリストに表示しないように設定できます

1. プラグインパラメータ「隠すスキル名」を設定します
2. 「上位互換スキル名」に、基準となる上位スキルの名前を指定します
3. 「隠すスキル名」に、非表示にしたい下位スキルの名前を複数指定します

*設定例:**
「ファイラ」を覚えている間、「ファイア」を非表示にする場合

- 上位互換スキル名: `ファイラ`
- 隠すスキル名:
  - `ファイア`

@param SkillTypeId
@type number
@text スキルタイプID
@desc 複数覚えることが出来るスキルタイプID
0 の場合は、全てのスキルタイプで有効になります
@default 0

@param ExcludeSkills
@type string[]
@text 除外スキル名
@desc 除外するスキル名

@param CompositeSkills
@type struct<CompositeSkills>[]
@text 複合スキル名
@desc 複合するスキルの情報

@param HideSkills
@type struct<HideSkills>[]
@text 隠すスキル名
@desc 特定のスキルを覚えているときスキルを非表示にする
下位互換のスキルを表示しない機能
*/

(() => {
    'use strict';

    // ベースプラグインの処理
    function Potadra_getPluginName(extension = 'js') {
        const reg = new RegExp(".+\/(.+)\." + extension);
        return decodeURIComponent(document.currentScript.src).replace(reg, '$1');
    }
    function Potadra_stringArray(data) {
        return data ? JSON.parse(data).map(String) : [];
    }
    function Potadra_isPlugin(plugin_name) {
        return PluginManager._scripts.includes(plugin_name);
    }
    function Potadra_search(data, id, column = "name", search_column = "id", val = "", initial = 1) {
        if (!id) return val;
        for (let i = initial; i < data.length; i++) {
            if (!data[i]) continue;
            if (search_column && data[i][search_column] == id) {
                val = column ? data[i][column] : data[i];
                break;
            } else if (i == id) {
                val = data[i];
                break;
            }
        }
        return val;
    }
    function Potadra_nameSearch(data, name, column = "id", search_column = "name", val = "", initial = 1) {
        return Potadra_search(data, name, column, search_column, val, initial);
    }

    // パラメータ用変数
    const plugin_name = Potadra_getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const SkillTypeId   = Number(params.SkillTypeId || 0);
    const ExcludeSkills = Potadra_stringArray(params.ExcludeSkills);
    let CompositeSkills = [];
    let HideSkills      = [];
    if (params.CompositeSkills) {
        CompositeSkills = JSON.parse(params.CompositeSkills);
    }
    if (params.HideSkills) {
        HideSkills = JSON.parse(params.HideSkills);
    }

    // 他プラグイン連携(プラグインの導入有無)
    const NameSkill = Potadra_isPlugin('NameSkill');

    /**
     * This section contains some methods that will be added to the standard
     * Javascript objects.
     *
     * @namespace JsExtensions
     */

    /**
     * Removes a given element from the array (in place).
     *
     * @memberof JsExtensions
     * @param {any} element - The element to remove.
     * @returns {array} The array after remove.
     */
    Array.prototype.destroy = function(element) {
        const index = this.indexOf(element);
        if (index >= 0) {
            this.splice(index, 1);
        } else {
            return this;
        }
    };

    /**
     * アクターを扱うクラスです。
     * このクラスは Game_Actors クラス（$gameActors）の内部で使用され、
     * Game_Party クラス（$gameParty）からも参照されます。
     *
     * @class
     */

    /**
     * スキルの習得済み判定
     *
     * @param {} skillId -
     * @returns {}
     */
    Game_Actor.prototype.isLearnedSkill = function(skillId) {
        const skill = $dataSkills[skillId];
        if ((SkillTypeId !== 0 && skill.stypeId !== SkillTypeId) || ExcludeSkills.includes(skill.name)) {
            if (NameSkill) {
                const name = Potadra_search($dataSkills, skillId, 'name');
                return this._skills.includes(name);
            } else {
                return this._skills.includes(skillId);
            }
        } else {
            return false;
        }
    };

    /**
     * スキルを覚える
     *
     * @param {number} skillId - スキルID
     */
    Game_Actor.prototype.learnSkill = function(skillId) {
        if (!this.isLearnedSkill(skillId)) {
            let skills;
            if (NameSkill) {
                const name = Potadra_search($dataSkills, skillId, 'name');
                this._skills.push(name);
                skills = this.skillIds();
            } else {
                this._skills.push(skillId);
                skills = this._skills;
            }
            // ここで複合スキル判定
            for (const composite_skill of CompositeSkills) {
                const composite_data = JSON.parse(composite_skill);
                const before_name    = composite_data.before_name;
                const composite_name = composite_data.composite_name;
                const count          = Number(composite_data.count || 2);
                let skill_count = 0;

                for (const id of skills) {
                    let skill = $dataSkills[id];

                    // 複合前のスキルがあったら、複合判定
                    if (skill.name === before_name) {
                        skill_count++;
                        // 複合条件を満たしたとき
                        if (skill_count === count) {
                            const skill_id = Potadra_nameSearch($dataSkills, composite_name);
                            // 複合スキルが見つかったら
                            if (skill_id) {
                                // 複合するスキルを忘れる
                                for (let i = 0; i < skill_count; i++) {
                                    this.forgetSkill(id);
                                }
                                if (NameSkill) {
                                    const skill_name = Potadra_search($dataSkills, skill_id, 'name');
                                    this._skills.push(skill_name);
                                } else {
                                    // 複合スキルを覚える
                                    this._skills.push(skill_id);
                                }
                            }
                        }
                    }
                }
            }
            this._skills.sort((a, b) => a - b);
        }
    };

    /**
     * スキルを忘れる
     *
     * @param {} skillId -
     */
    Game_Actor.prototype.forgetSkill = function(skillId) {
        if (NameSkill) {
            const name = Potadra_search($dataSkills, skillId, 'name');
            this._skills.destroy(name);
        } else {
            this._skills.destroy(skillId);
        }
    };

    /**
     * スキルオブジェクトの配列取得
     *
     * @returns {}
     */
    Game_Actor.prototype.skills = function() {
        const list = [];
        let all_skills;
        if (NameSkill) {
            all_skills = this.skillIds().concat(this.addedSkills());
        } else {
            all_skills = this._skills.concat(this.addedSkills());
        }

        // 隠しスキル判定
        for (const HideSkill of HideSkills) {
            const hide_data   = JSON.parse(HideSkill);
            const name        = hide_data.name; // 上位互換スキル名
            const hide_skills = Potadra_stringArray(hide_data.hide_skills);
            const skill       = Potadra_nameSearch($dataSkills, name, false);

            // 上位互換スキルがあったら
            if (all_skills.includes(skill.id)) {
                for (const hide_skill_name of hide_skills) {
                    const hide_skill = Potadra_nameSearch($dataSkills, hide_skill_name, false);
                    // 隠しスキルがあったら
                    if (all_skills.includes(hide_skill.id)) {
                        all_skills.remove(hide_skill.id);
                    }
                }
            }
        }

        for (const id of all_skills) {
            const skill = $dataSkills[id];
            if (ExcludeSkills.includes(skill.name)) {
                if (!list.includes(skill)) {
                    list.push(skill);
                }
            } else if (SkillTypeId === 0 || skill.stypeId === SkillTypeId || !list.includes(skill)) {
                list.push(skill);
            }
        }
        return list;
    };
})();
