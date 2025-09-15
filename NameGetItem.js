/*------------------------------
Copyright (c) 2025 PotatoDragon
Released under the MIT License.
https://opensource.org/license/mit
------------------------------*/

/*:
@target MZ
@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/System/Name/NameGetItem.js
@plugindesc Item Acquisition Ver2.0.2 (2025/2/27)
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
Provides a plugin command for obtaining an item by name.

## Usage
1. Call the plugin command.
2. Enter the name of the item to obtain as the plugin command name.
3. When an event specifying the plugin command is called,
the item will be searched for and obtained.

The search order is items => weapons => armor.
If there are multiple items with the same name, the first item found will be
obtained.

Items in save data are recorded by ID.
We do not recommend updating the database after publishing the game.

If you want to specify a variable,
use the plugin command "Get Item (Variable Specification)."

@param includeEquip
@text Item acquisition sound effect
@desc Item acquisition sound effect. If not specified, it will not play.
@type struct<SE>
@on include
@off Do not include
@default {"name":"Item3","volume":"90","pitch":"100","pan":"0"}

@param includeEquip
@text Item acquisition sound effect
@desc Item acquisition sound effect. If not specified, it will not play.
@type struct<SE>
@on include
@off Do not include
@default {"name":"Item3","volume":"90","pitch":"100","pan":"0"}

@command get_item
@text Obtaining items
@desc Get an item by name
@arg name
@desc Name of the item to be obtained
@type string

@arg search
@desc For item name search
@type struct<Search>
@parent name

@arg count
@text Quantity
@desc Number of items to obtain
@type number
@default 1
@min -999999999999999

@command get_variable_item
@text Get item (variable specified)
@desc Get an item by name
@arg name
@desc Name of the item to be obtained
@type string

@arg name_variable
@text Name variable name
@desc If you want to specify the name as a variable, use this
@type variable
@default 0
@parent name

@arg search
@desc For item name search
@type struct<Search>
@parent name

@arg count
@text Quantity
@desc Number of items to obtain
@type number
@default 1
@min -999999999999999

@arg count_variable
@text Count variable
@desc Specify the number of items to obtain with a variable
@type variable
@default 0
@parent count
*/

/*:ja
@plugindesc
アイテム入手 Ver2.0.2(2025/2/27)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/System/Name/NameGetItem.js
@target MZ
@author ポテトードラゴン

・アップデート情報
Ver2.0.2: アイテム名と個数に変数を指定できるプラグインコマンド追加
Ver2.0.1: 減らす機能に装備の場合は装備品も含めるか選択できるパラメータ追加
Ver2.0.0
- プラグインコマンドが長くなるため、SE設定をstructに変更（再設定が必要になります）
- SKM_GetInformationMZ に対応
- TinyGetInfoWndMZ.js に対応
- 名前検索用のパラメータ追加
- リファクタリング
Ver1.4.6
- 減らす場合の最大値を変更
- 取得したい => 入手するに名称変更
Ver1.4.5: 検索時のバグ修正

Copyright (c) 2025 ポテトードラゴン
Released under the MIT License.
https://opensource.org/license/mit

@help
## 概要
名前からアイテムを入手するプラグインコマンドを提供します

## 使い方
1. プラグインコマンドを呼び出します
2. プラグインコマンドの名前に『入手するアイテム名』を入力します
3. プラグインコマンドを指定したイベントが呼び出されると
アイテムを検索し入手します

検索の順番は、アイテム => 武器 => 防具 の順番となります  
同じ名称のアイテムが複数ある場合は、最初に検索したアイテムを入手します

セーブデータ上のアイテムは、IDで記録されます  
ゲーム公開後は、データベースの入れ替えはおすすめしません

変数を指定したい場合は  
プラグインコマンド「アイテム入手(変数指定)」を使用してください

@command get_item
@text アイテム入手
@desc 名前からアイテムを入手します

    @arg name
    @type string
    @text 名前
    @desc 入手するアイテムの名称

        @arg search
        @parent name
        @type struct<Search>
        @text 検索
        @desc アイテム名検索用
        このパラメータはデータとしては使用しません

    @arg count
    @type number
    @text 個数
    @desc 入手するアイテムの個数
    @default 1
    @min -999999999999999

    @param includeEquip
    @type boolean
    @text 装備品も含める
    @desc 装備品も含めるか
    ※ アイテムを減らす場合のみ有効
    @on 含める
    @off 含めない
    @default false

    @arg message
    @type multiline_string
    @text アイテム入手メッセージ
    @desc アイテム獲得時のメッセージ。空文字の場合、表示しません
    %1: アイコン番号 %2: アイテム名 %3: 個数
    @default \I[%1]%2を%3個手に入れた！

    @arg se
    @type struct<SE>
    @text アイテム入手SE
    @desc アイテム入手SE。指定しない場合、再生しません
    宝箱を開ける音、ピッケルの音などを指定
    @default {"name":"Item3","volume":"90","pitch":"100","pan":"0"}

@command get_variable_item
@text アイテム入手(変数指定)
@desc 名前からアイテムを入手します

    @arg name
    @type string
    @text 名前
    @desc 入手するアイテムの名称

        @arg name_variable
        @parent name
        @type variable
        @text 名前変数名
        @desc 名前を変数で指定する場合、こちらを使用してください
        @default 0

        @arg search
        @parent name
        @type struct<Search>
        @text 検索
        @desc アイテム名検索用
        このパラメータはデータとしては使用しません

    @arg count
    @type number
    @text 個数
    @desc 入手するアイテムの個数
    @default 1
    @min -999999999999999

        @arg count_variable
        @parent count
        @type variable
        @text 個数変数
        @desc 入手するアイテムの個数を変数で指定
        @default 0

    @param includeEquip
    @type boolean
    @text 装備品も含める
    @desc 装備品も含めるか
    ※ アイテムを減らす場合のみ有効
    @on 含める
    @off 含めない
    @default false

    @arg message
    @type multiline_string
    @text アイテム入手メッセージ
    @desc アイテム獲得時のメッセージ。空文字の場合、表示しません
    %1: アイコン番号 %2: アイテム名 %3: 個数
    @default \I[%1]%2を%3個手に入れた！

    @arg se
    @type struct<SE>
    @text アイテム入手SE
    @desc アイテム入手SE。指定しない場合、再生しません
    宝箱を開ける音、ピッケルの音などを指定
    @default {"name":"Item3","volume":"90","pitch":"100","pan":"0"}
*/

(() => {
    'use strict';

    // ベースプラグインの処理
    function Potadra_getPluginName(extension = 'js') {
        const reg = new RegExp(".+\/(.+)\." + extension);
        return decodeURIComponent(document.currentScript.src).replace(reg, '$1');
    }
    function Potadra_isPlugin(plugin_name) {
        return PluginManager._scripts.includes(plugin_name);
    }
    function Potadra_convertBool(bool) {
        if (bool === "false" || bool === '' || bool === undefined) {
            return false;
        } else {
            return true;
        }
    }
    function Potadra_convertAudio(struct_audio, audio_name) {
        if (!struct_audio) return false;
        let audio;
        try {
            audio = JSON.parse(struct_audio);
        } catch(e){
            return false;
        }
        const name   = audio_name ? String(audio.name || audio_name) : String(audio.name);
        const volume = Number(audio.volume || 90);
        const pitch  = Number(audio.pitch || 100);
        const pan    = Number(audio.pan || 0);
        return {"name": name, "volume": volume, "pitch": pitch, "pan": pan};
    }
    function Potadra_checkVariable(variable_no) {
        return variable_no > 0 && variable_no <= 5000;
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
    function Potadra_itemSearch(name, column = false, search_column = "name", val = false, initial = 1) {
        const item = Potadra_search($dataItems, name, column, search_column, val, initial);
        if (item) return item;
        const weapon = Potadra_search($dataWeapons, name, column, search_column, val, initial);
        if (weapon) return weapon;
        const armor = Potadra_search($dataArmors, name, column, search_column, val, initial);
        if (armor) return armor;
        return false;
    }

    // パラメータ用変数
    const plugin_name = Potadra_getPluginName();

    // プラグインの導入有無
    const GetInformation       = Potadra_isPlugin('GetInformation');
    const TinyGetInfoWndMZ     = Potadra_isPlugin('TinyGetInfoWndMZ');
    const SKM_GetInformationMZ = Potadra_isPlugin('SKM_GetInformationMZ');

    // プラグインコマンド(アイテム入手)
    PluginManager.registerCommand(plugin_name, "get_item", function(args) {
        get_item(this, args);
    });

    // プラグインコマンド(アイテム入手(変数指定))
    PluginManager.registerCommand(plugin_name, "get_variable_item", function(args) {
        get_item(this, args);
    });

    // 実際の処理
    function get_item(interpreter, args) {
        const name_variable  = Number(args.name_variable || 0);
        const count_variable = Number(args.count_variable || 0);
        const includeEquip   = Potadra_convertBool(args.includeEquip);
        const message        = String(args.message);
        const se             = Potadra_convertAudio(args.se, 'Item3');

        let name  = String(args.name);
        let count = Number(args.count || 1);
        if (Potadra_checkVariable(name_variable)) {
            name = $gameVariables.value(name_variable);
        }
        if (Potadra_checkVariable(count_variable)) {
            count = $gameVariables.value(count_variable);
        }

        const item = Potadra_itemSearch(name);
        if (GetInformation || SKM_GetInformationMZ) {
            CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        }
        if (TinyGetInfoWndMZ) {
            let params = [item.id, 0, 0, count, false];
            if (DataManager.isItem(item)) {
                params = [item.id, 0, 0, count];
                interpreter.command126(params);
            } else if (DataManager.isWeapon(item)) {
                interpreter.command127(params);
            } else if (DataManager.isArmor(item)) {
                interpreter.command128(params);
            } else {
                return false;
            }
        } else {
            $gameParty.gainItem(item, count, includeEquip);
        }
        if (GetInformation || SKM_GetInformationMZ) {
            CommonPopupManager._popEnable = false;
        }
        if (se) AudioManager.playSe(se);
        if (!GetInformation && !SKM_GetInformationMZ && !TinyGetInfoWndMZ && message && count !== 0) {
            $gameMessage.add(message.format(item.iconIndex, item.name, count));
        }
    }
})();
