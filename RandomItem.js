/*------------------------------
Copyright (c) 2025 PotatoDragon
Released under the MIT License.
https://opensource.org/license/mit
------------------------------*/

/*:
@target MZ
@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/System/RandomItem.js
@plugindesc Random Item Acquisition Ver2.0.1 (2025/1/20)
@author PotatoDragon
@license MIT License

@help
English Help Translator: munokura
Please check the URL below for the latest version of the plugin.
URL https://github.com/pota-gon/RPGMakerMZ/wiki
-----

# Overview
Plugin command: Obtain a random item from a specified set of items.

# Usage
1. Call the plugin command.
2. Select the command name **Get Random Item**.
3. Configure the required fields. The configuration method will be described
later.
4. You can obtain items and gold based on the settings.

# Plugin Command (Random Item Acquisition)
This section explains the arguments for the plugin command **Random Item
Acquisition**.
Also, there are presets for other commands, so please refer to them.

Preset (Lottery): Random Treasure Chest
Preset (Material): Lumber
Preset (Material): Mining

## Item List
The arguments **Lottery or Material** described below.
The specifications vary significantly depending on whether you select Lottery
or Material, so we will explain them separately.

### Lottery
You will obtain only one item.

#### Item Name
Enter the item name as a string.
For example, to obtain a "potion," enter **potion**.

You can also obtain gold by entering a number.
The acquisition range is the value set in the **Minimum Amount** to **Item
Name** described below.

<Configuration Example>**
Item Name: 1000
Minimum Amount: 100

In this case, 100G to You will now receive 1000G.
If you want to fix the amount of gold you receive, set the **Item Name** and
**Minimum Amount** to the same value.

#### - Lottery Probability
This is the likelihood of winning. Think of it as the number of lottery
tickets.
The more tickets you have, the more likely you are to win, and the fewer
tickets you have, the less likely you are to win.

The following settings will result in **Potion** becoming "Lose (100/121)"

Hi-Potion** becoming "Rare (20/121)"

Elixir** becoming "Super Rare (1/121)"

|Item Name|Drawing Probability (Number of Lottery Tickets)|
|---|---|
|Potion|100|
|Hi-Potion|20|
|Elixir|1|

#### ・Number of Material Obtained
No need to set this, as it is not used.

#### ・Minimum Number Obtained
If you specify a number (gold) for **Item Name**,
This value will be the minimum gold required.
For setting instructions, see the **Item Name** description.

---

### For Materials
Obtain multiple items.

#### ・Item Name
Enter the item name as a string.
For example, to obtain a "Potion," enter: Enter **Potion**

You can also obtain gold by entering a number.

The range of gold you can obtain is determined by the values set in the
**Minimum Number** to **Item Name** fields (described below).

<Example Settings>**
Item Name: 1000
Minimum Number: 100

In this case, you will obtain between 100G and 1000G.

If you want to fix the amount of gold you can obtain, set the **Item Name**
and **Minimum Number** fields to the same value.

#### - Lottery Probability
This is the probability of obtaining a material (1-100%).

Acquisition checks will be performed the number of times you obtain a material
(described below).

With the following settings, you will perform 10 attempts to obtain **weeds**
with an 80% chance, obtaining 5-10 weeds.
You will perform 10 attempts to obtain **medicinal herbs** with a 50% chance,
obtaining 3-10 medicinal herbs.
You will perform **rare herbs** with a 10% chance. You will receive 0 to 10
rare herbs after 10 attempts.

|Item Name|Raffle Chance (%)|Number of Material Obtained|Minimum Number
Obtained|
|---|---|---|---|
|Weeds|80|10|5|
|Medicinal Herbs|50|10|3|
|Rare Herbs|10|10|0|

#### - Number of Material Obtained
The item acquisition check will be performed the number of times specified by
**Number of Material Obtained** with a probability of **Raffle Chance**.
For details, see the explanation of **Raffle Chance**.

#### - Minimum Number Obtained
Regardless of the result of the check, you are guaranteed to obtain the number
of items specified by **Minimum Number Obtained**.
For details, see the explanation of **Raffle Chance**.

If you specify a number (gold) for **Item Name**,
This value will be the minimum gold you can obtain.
For how to set this, see the explanation of **Item Name**.

---

## Raffle or Material
The item list specifications will be changed. For details, see the **Item
List** description.

### Lottery
Used when obtaining only one item.

(Used for random treasure chests, gacha, etc.)

#### Materials
Used when obtaining multiple items.

(Used for gathering points, etc.)

## Required Item List

### Required Item Name
Specify the name of the required item.
Used for treasure chests that cannot be opened without a key,
or mining points that require a pickaxe.

For example, if you need a "Pickaxe," enter **Pickaxe**.
Required items do not include equipment,
but we plan to update this so that this can be set as an argument.

### Required Item Quantity
Specify the number of items required.
This function is used when multiple items of the same item are required, such
as collecting five orbs.
The default is 1, so there is no need to change it if you do not use this
function.

### Consumption Probability
Specify the probability (0-100%) that the required item will be consumed.
Used for things like the pickaxe's destruction rate. Decimals are allowed.

The required number of items will be consumed with the specified probability.
To prevent items from being consumed, enter **0**.

### Required Item Not Possessed Message
This message is displayed when the required item is not present.
Use this to display information about required items.
If you leave this field blank, no message will be displayed.

## Item Acquisition Sound Effects
This is the sound effect played when an item is acquired.
If you leave this field blank, no sound effect will be played.

### Sound Effects Volume
This is the volume of the sound effect when an item is acquired.

### Sound Effects Pitch
This is the pitch of the sound effect when an item is acquired.

### Sound Effects Phase
This is the phase of the sound effect when an item is acquired.

## Item Acquisition Message
This is the message displayed when an item is acquired.
If you leave this field blank, no message will be displayed.

@param GoldIconIndex
@text Gold acquisition icon
@desc Gold acquisition icon
@type number
@default 314

@param GoldMessage
@text Gold acquisition message
@desc Message when gold is obtained
@type multiline_string
@default \I[%1]%2%3手に入れた！

@command random_item
@text Get a random item
@desc You will receive an item from the list by lottery.
@arg items
@text Item List
@type struct<ItemList>[]

@arg lottery
@text Lottery or materials?
@desc Lottery: One item only (used for random treasure chests, gacha, etc.)
@type boolean
@on lottery
@off material
@default true

@arg uses
@text Required Item List
@type struct<UseList>[]

@arg use_message
@text Message when you do not have the required item
@desc Message when you do not have a required item
@type multiline_string
@default \I[%1]%2が%3個必要です
@parent uses

@arg se
@text Item acquisition sound effect
@desc Item acquisition sound effect. If not specified, it will not play.
@type struct<SE>
@default {"name":"Item3","volume":"90","pitch":"100","pan":"0"}

@arg get_message
@text Item acquisition message
@desc Message when obtaining an item. If empty, it will not be displayed.
@type multiline_string
@default \I[%1]%2を%3個手に入れた！

@command treasure_chest
@text Preset (lottery): Random treasure chest
@desc Sample of a treasure chest that gives random items
@arg items
@text Item List
@type struct<ItemList>[]

@arg lottery
@text Lottery or materials?
@desc Lottery: One item only (used for random treasure chests, gacha, etc.)
@type boolean
@on lottery
@off material
@default true

@arg uses
@text Required Item List
@type struct<UseList>[]

@arg use_message
@text Message when you do not have the required item
@desc Message when you do not have a required item
@type multiline_string
@default 宝箱を開けるには\I[%1]%2が%3個必要です
@parent uses

@arg se
@text Item acquisition sound effect
@desc Item acquisition sound effect. If not specified, it will not play.
@type struct<SE>
@default {"name":"Chest1","volume":"90","pitch":"100","pan":"0"}

@arg get_message
@text Item acquisition message
@desc Message when obtaining an item. If empty, it will not be displayed.
@type multiline_string
@default \I[%1]%2を%3個手に入れた！

@command felling
@text Preset (material): Felling
@desc Example of obtaining items when cutting trees
@arg items
@text Item List
@type struct<ItemList>[]

@arg lottery
@text Lottery or materials?
@desc Lottery: One item only (used for random treasure chests, gacha, etc.)
@type boolean
@on lottery
@off material
@default false

@arg uses
@text Required Item List
@type struct<UseList>[]

@arg use_message
@text Message when you do not have the required item
@desc Message when you do not have a required item
@type multiline_string
@default \I[%1]%2が%3個必要です
@parent uses

@arg se
@text Item acquisition sound effect
@desc Item acquisition sound effect. If not specified, it will not play.
@type struct<SE>
@default {"name":"Slash1","volume":"90","pitch":"100","pan":"0"}

@arg get_message
@text Item acquisition message
@desc Message when obtaining an item. If empty, it will not be displayed.
@type multiline_string
@default \I[%1]%2を%3個手に入れた！

@command mining
@text Preset (Material): Mining
@desc Sample of items obtained when mined
@arg items
@text Item List
@type struct<ItemList>[]

@arg lottery
@text Lottery or materials?
@desc Lottery: One item only (used for random treasure chests, gacha, etc.)
@type boolean
@on lottery
@off material
@default false

@arg uses
@text Required Item List
@type struct<UseList>[]

@arg use_message
@text Message when you do not have the required item
@desc Message when you do not have a required item
@type multiline_string
@default \I[%1]%2が%3個必要です
@parent uses

@arg se
@text Item acquisition sound effect
@desc Item acquisition sound effect. If not specified, it will not play.
@type struct<SE>
@default {"name":"Sword2","volume":"90","pitch":"100","pan":"0"}

@arg get_message
@text Item acquisition message
@desc Message when obtaining an item. If empty, it will not be displayed.
@type multiline_string
@default \I[%1]%2を%3個手に入れた！
*/

/*:ja
@plugindesc
ランダムアイテム入手 Ver2.0.1(2025/1/20)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/System/RandomItem.js
@target MZ
@author ポテトードラゴン

・アップデート情報
Ver2.0.1: 減らす機能に装備の場合は装備品も含めるか選択できるパラメータ追加
Ver2.0.0
- プラグインコマンドが長くなるため、SE設定をstructに変更（再設定が必要になります）
- SKM_GetInformationMZ に対応
- TinyGetInfoWndMZ.js に対応
- 名前検索用のパラメータ追加
- リファクタリング
Ver1.3.9
- 検索時のバグ修正
- 他プラグイン導入時の convertBool が無条件で true を返すバグ修正

Copyright (c) 2025 ポテトードラゴン
Released under the MIT License.
https://opensource.org/license/mit

@help
# 概要
プラグインコマンド指定したアイテムの中からランダムにアイテムを入手します

# 使い方
1. プラグインコマンドを呼び出します
2. コマンド名 **ランダムアイテム取得** を選択します
3. 必要項目を設定します。設定方法については後述します
4. 設定内容を元にアイテムやゴールドを取得出来ます

# プラグインコマンド(ランダムアイテム取得)
プラグインコマンドのコマンド名 **ランダムアイテム取得** の
引数の説明をします  
また、他のコマンドにプリセットがあるので参考にしてください

プリセット(抽選): ランダム宝箱
プリセット(素材): 伐採
プリセット(素材): 採掘

## アイテムリスト
後述する引数 **抽選か素材か** の  
*抽選** か **素材** かで、仕様が大きく変わるため、分けて説明します

### 抽選の場合
アイテムを1つだけ入手します

#### ・アイテム名
アイテム名を文字列で入力します  
例えば『ポーション』を入手する場合は、 **ポーション** と入力します

また、数字を入力するとゴールドを入手することもできます  
後述する **最低入手数** ～ **アイテム名** で設定した値が入手範囲になります

*<設定例>**
アイテム名： 1000
最低入手数： 100

この場合、 100G ～ 1000G を入手するようになります  
入手ゴールドを固定したい場合、 **アイテム名** と **最低入手数** は
同じ値を設定してください

#### ・抽選確率
当たりやすさです。くじの本数と考えてください  
本数が多いものが当たりやすく、本数の少ないものは、当たりづらくなります

以下のように設定すると **ポーション** が "はずれ(100/121)"  
*ハイポーション** が "レア(20/121)"
*エリクサー** が "激レア(1/121)" となります

|アイテム名|抽選確率(くじの本数)|
|---|---|
|ポーション|100|
|ハイポーション|20|
|エリクサー|1|

#### ・素材入手回数
使わないため、設定の必要はありません

#### ・最低入手数
*アイテム名** に数字(ゴールド)を指定した場合  
この値が最低入手ゴールドとなります  
設定方法は、 **アイテム名** の説明を参照してください

---

### 素材の場合
アイテムを複数入手します

#### ・アイテム名
アイテム名を文字列で入力します  
例えば『ポーション』を入手する場合は、 **ポーション** と入力します

また、数字を入力するとゴールドを入手することもできます  
後述する **最低入手数** ～ **アイテム名** で設定した値が入手範囲になります

*<設定例>**
アイテム名： 1000
最低入手数： 100

この場合、 100G ～ 1000G を入手するようになります  
入手ゴールドを固定したい場合、 **アイテム名** と **最低入手数** は
同じ値を設定してください

#### ・抽選確率
素材の入手確率(1 ～ 100%)です  
後述する **素材入手回数** 分、入手判定を行います

以下のように設定すると **雑草** を 80 % の確率で 10回
入手判定し、 5 ～ 10個 雑草を入手します  
*薬草** を 50 % の確率で 10回入手判定し、 3 ～ 10個 薬草を入手します  
*レア草** を 10 % の確率で 10回入手判定し、 0 ～ 10個 レア草を入手します

|アイテム名|抽選確率(%)|素材入手回数|最低入手数|
|---|---|---|---|
|雑草|80|10|5|
|薬草|50|10|3|
|レア草|10|10|0|

#### ・素材入手回数
*抽選確率** の確率で **素材入手回数** で指定した回数分  
アイテム入手判定を実施します  
詳しくは **抽選確率** の説明を参照してください

#### ・最低入手数
判定の結果に関わらず、 **最低入手数** で  
指定したアイテム数は確実に入手できます  
詳しくは **抽選確率** の説明を参照してください

*アイテム名** に数字(ゴールド)を指定した場合  
この値が最低入手ゴールドとなります  
設定方法は、 **アイテム名** の説明を参照してください

---

## 抽選か素材か
アイテムリストの仕様が変更されます  
詳しくは **アイテムリスト** の説明を参照してください

### 抽選
1つのアイテムのみ入手する場合に使用します  
(ランダム宝箱やガチャなどに利用)

#### 素材
複数のアイテムを入手する場合に使用します  
(採取ポイントなどに利用)

## 必要アイテムリスト

### 必要アイテム名
必要になるアイテム名を指定します  
鍵がないと開けられない宝箱や  
ピッケルを使用する採掘ポイントなどに利用します

例えば『ピッケル』が必要になる場合は、 **ピッケル** と入力します  
必要アイテムは装備品は含めない仕様ですが  
引数で設定出来るように今後アップデートする予定です

### 必要アイテム個数
必要になるアイテム個数を指定します  
オーブを5つ集めるなど、同じアイテムが複数必要になる場合の機能です  
デフォルトは、1個のため、この機能を使わない場合は変更の必要はありません

### 消費確率
必要アイテムを消費する確率(0～100%)を指定します  
ピッケルの破壊率などに利用します。小数点も利用可能です

指定した確率で必要アイテム個数分、アイテムを消費します  
アイテムを消費しないようにする場合は、 **0** を指定してください

### 必要アイテム未所持メッセージ
必要アイテムがない場合の表示メッセージです  
必要なアイテムの情報を表示したい場合に利用してください  
何も入力しない場合、メッセージは表示されません

## アイテム入手SE
アイテムを入手したときのSEです  
指定しない場合、SEは再生しません

### 再生するSEの音量
アイテム入手SEの音量です

### 再生するSEのピッチ
アイテム入手SEのピッチです

### 再生するSEの位相
アイテム入手SEの位相です

## アイテム入手メッセージ
アイテムを入手したときのメッセージです  
何も入力しない場合、メッセージは表示されません

@param GoldIconIndex
@type number
@text ゴールド入手アイコン
@desc ゴールド入手時のアイコン
@default 314

@param GoldMessage
@type multiline_string
@text ゴールド入手メッセージ
@desc ゴールド入手時のメッセージ
%1: アイコン番号 %2: 入手ゴールド %3: 通貨
@default \I[%1]%2%3手に入れた！

@command random_item
@text ランダムアイテム取得
@desc リストの中から抽選でアイテムを取得します

    @arg items
    @type struct<ItemList>[]
    @text アイテムリスト

    @arg lottery
    @type boolean
    @text 抽選か素材か
    @desc 抽選: 1つのアイテムのみ(ランダム宝箱やガチャなどに利用)
    素材: 複数アイテム(採取ポイントなどに利用)
    @on 抽選
    @off 素材
    @default true

    @arg uses
    @type struct<UseList>[]
    @text 必要アイテムリスト

        @arg use_message
        @parent uses
        @type multiline_string
        @text 必要アイテム未所持メッセージ
        @desc 必要アイテムを未所持のときのメッセージ
        空文字の場合、表示しません
        @default \I[%1]%2が%3個必要です

    @arg se
    @type struct<SE>
    @text アイテム入手SE
    @desc アイテム入手SE。指定しない場合、再生しません
    宝箱を開ける音、ピッケルの音などを指定
    @default {"name":"Item3","volume":"90","pitch":"100","pan":"0"}

    @arg get_message
    @type multiline_string
    @text アイテム入手メッセージ
    @desc アイテム入手時のメッセージ。空文字の場合、表示しません
    %1: アイコン番号 %2: アイテム名 %3: 個数
    @default \I[%1]%2を%3個手に入れた！

@command treasure_chest
@text プリセット(抽選): ランダム宝箱
@desc ランダムにアイテムを入手する宝箱のサンプル

    @arg items
    @type struct<ItemList>[]
    @text アイテムリスト

    @arg lottery
    @type boolean
    @text 抽選か素材か
    @desc 抽選: 1つのアイテムのみ(ランダム宝箱やガチャなどに利用)
    素材: 複数アイテム(採取ポイントなどに利用)
    @on 抽選
    @off 素材
    @default true

    @arg uses
    @type struct<UseList>[]
    @text 必要アイテムリスト

        @arg use_message
        @parent uses
        @type multiline_string
        @text 必要アイテム未所持メッセージ
        @desc 必要アイテムを未所持のときのメッセージ
        空文字の場合、表示しません
        @default 宝箱を開けるには\I[%1]%2が%3個必要です

    @arg se
    @type struct<SE>
    @text アイテム入手SE
    @desc アイテム入手SE。指定しない場合、再生しません
    宝箱を開ける音、ピッケルの音などを指定
    @default {"name":"Chest1","volume":"90","pitch":"100","pan":"0"}

    @arg get_message
    @type multiline_string
    @text アイテム入手メッセージ
    @desc アイテム入手時のメッセージ。空文字の場合、表示しません
    %1: アイコン番号 %2: アイテム名 %3: 個数
    @default \I[%1]%2を%3個手に入れた！

@command felling
@text プリセット(素材): 伐採
@desc 木を切ったときにアイテムを入手するサンプル

    @arg items
    @type struct<ItemList>[]
    @text アイテムリスト

    @arg lottery
    @type boolean
    @text 抽選か素材か
    @desc 抽選: 1つのアイテムのみ(ランダム宝箱やガチャなどに利用)
    素材: 複数アイテム(採取ポイントなどに利用)
    @on 抽選
    @off 素材
    @default false

    @arg uses
    @type struct<UseList>[]
    @text 必要アイテムリスト

        @arg use_message
        @parent uses
        @type multiline_string
        @text 必要アイテム未所持メッセージ
        @desc 必要アイテムを未所持のときのメッセージ
        空文字の場合、表示しません
        @default \I[%1]%2が%3個必要です
        \I[%1]%2は道具屋で買うことが出来ます

    @arg se
    @type struct<SE>
    @text アイテム入手SE
    @desc アイテム入手SE。指定しない場合、再生しません
    宝箱を開ける音、ピッケルの音などを指定
    @default {"name":"Slash1","volume":"90","pitch":"100","pan":"0"}

    @arg get_message
    @type multiline_string
    @text アイテム入手メッセージ
    @desc アイテム入手時のメッセージ。空文字の場合、表示しません
    %1: アイコン番号 %2: アイテム名 %3: 個数
    @default \I[%1]%2を%3個手に入れた！

@command mining
@text プリセット(素材): 採掘
@desc 採掘したときにアイテムを入手するサンプル

    @arg items
    @type struct<ItemList>[]
    @text アイテムリスト

    @arg lottery
    @type boolean
    @text 抽選か素材か
    @desc 抽選: 1つのアイテムのみ(ランダム宝箱やガチャなどに利用)
    素材: 複数アイテム(採取ポイントなどに利用)
    @on 抽選
    @off 素材
    @default false

    @arg uses
    @type struct<UseList>[]
    @text 必要アイテムリスト

        @arg use_message
        @parent uses
        @type multiline_string
        @text 必要アイテム未所持メッセージ
        @desc 必要アイテムを未所持のときのメッセージ
        空文字の場合、表示しません
        @default \I[%1]%2が%3個必要です
        \I[%1]%2は道具屋で買うことが出来ます

    @arg se
    @type struct<SE>
    @text アイテム入手SE
    @desc アイテム入手SE。指定しない場合、再生しません
    宝箱を開ける音、ピッケルの音などを指定
    @default {"name":"Sword2","volume":"90","pitch":"100","pan":"0"}

    @arg get_message
    @type multiline_string
    @text アイテム入手メッセージ
    @desc アイテム入手時のメッセージ。空文字の場合、表示しません
    %1: アイコン番号 %2: アイテム名 %3: 個数
    @default \I[%1]%2を%3個手に入れた！
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
    function Potadra_random(probability, rate = 1) {
        return Math.random() <= probability / 100 * rate;
    }
    function Potadra_gacha(seed, rates) {
        let sum = 0;
        const rand = Math.randomInt(seed);
        for (let i = 0; i < rates.length; i++) {
            sum += rates[i];
            if (rand < sum) return i;
        }
        return 0;
    }

    // パラメータ用変数
    const plugin_name = Potadra_getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const GoldIconIndex  = Number(params.GoldIconIndex || 314);
    const GoldMessage    = String(params.GoldMessage || '\I[%1]%2%3手に入れた！');

    // 他プラグイン連携(プラグインの導入有無)
    const GetInformation       = Potadra_isPlugin('GetInformation');
    const TinyGetInfoWndMZ     = Potadra_isPlugin('TinyGetInfoWndMZ');
    const SKM_GetInformationMZ = Potadra_isPlugin('SKM_GetInformationMZ');

    // プラグインコマンド(ランダムアイテム取得)
    PluginManager.registerCommand(plugin_name, "random_item", function(args) {
        gacha(this, args);
    });

    // プラグインコマンド(プリセット(抽選): ランダム宝箱)
    PluginManager.registerCommand(plugin_name, "treasure_chest", function(args) {
        gacha(this, args);
    });

    // プラグインコマンド(プリセット(素材): 伐採)
    PluginManager.registerCommand(plugin_name, "felling", function(args) {
        gacha(this, args);
    });

    // プラグインコマンド(プリセット(素材): 採掘)
    PluginManager.registerCommand(plugin_name, "mining", function(args) {
        gacha(this, args);
    });

    // 実際の処理
    function gacha(interpreter, args) {
        if (GetInformation || SKM_GetInformationMZ) {
            CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        }

        let item_lists;
        if (args.items) {
            item_lists = JSON.parse(args.items);
        }

        const lottery     = Potadra_convertBool(args.lottery);
        const use_message = String(args.use_message);
        const se          = Potadra_convertAudio(args.se, 'Item3');
        const get_message = String(args.get_message);

        let first_item, first_name, first_count, use_lists;

        let get_item_count = 0;
        let use_item       = false;

        let uses = args.uses;
        if (uses) {
            use_lists = JSON.parse(uses);
        }

        // 必要アイテムがある場合その処理
        if (use_lists) {
            for (let i = 0; i < use_lists.length; i++) {
                const use_info     = JSON.parse(use_lists[i]);
                const use_name     = use_info.use_name;
                const use_count    = Number(use_info.use_count || 1);
                const use_break    = Number(use_info.use_break || 0);
                const includeEquip = Potadra_convertBool(use_info.includeEquip);
                const item         = Potadra_itemSearch(use_name);
                const count        = $gameParty.numItems(item);

                if (i === 0) {
                    first_item  = item;
                    first_name  = use_name;
                    first_count = use_count;
                }

                // 所持数(装備品を含めない) >= 必要数
                if (count >= use_count && use_break > 0 && Potadra_random(use_break)) {
                    // 消費処理
                    $gameParty.gainItem(item, -1 * use_count, includeEquip);
                    use_item = true;
                    break;
                }
            }
        }

        if (!use_item && first_item) {
            // 必要アイテムが足りないときの処理
            if (use_message) {
                $gameMessage.add(use_message.format(first_item.iconIndex, first_name, first_count));
            }
            // イベント処理の中断
            $gameMap._interpreter.command115();
            return false;
        }

        if (!item_lists) {
            // イベント処理の中断
            $gameMap._interpreter.command115();
            return false;
        }

        // 抽選・素材
        if (lottery) {
            const rates = [];
            const items = [];

            // ガチャ情報作成
            let sum = 0;
            let min = 0;
            for (const item_list of item_lists) {
                const item_info = JSON.parse(item_list);
                const rate      = Number(item_info.rate || 100);
                const name      = item_info.name;
                let item;
                if (isNaN(name)) {
                    item = Potadra_itemSearch(name);
                } else { // ゴールド用
                    item = Number(name);
                    if (Number(item_info.min) > 0) {
                        min = Number(item_info.min);
                    }
                }
                sum += rate;
                rates.push(rate);
                items.push(item);
            }

            // ガチャをまわす
            const index = Potadra_gacha(sum, rates);

            // アイテム入手
            const item = items[index];
            if (item) {
                if (isNaN(item)) {
                    if (TinyGetInfoWndMZ) {
                        let params = [item.id, 0, 0, 1, false];
                        if (DataManager.isItem(item)) {
                            params = [item.id, 0, 0, 1];
                            interpreter.command126(params);
                        } else if (DataManager.isWeapon(item)) {
                            interpreter.command127(params);
                        } else if (DataManager.isArmor(item)) {
                            interpreter.command128(params);
                        } else {
                            return false;
                        }
                    } else {
                        $gameParty.gainItem(item, 1);
                    }
                    if (!GetInformation && !SKM_GetInformationMZ && !TinyGetInfoWndMZ && get_message) {
                        $gameMessage.add(get_message.format(item.iconIndex, item.name, 1));
                    }
                } else { // ゴールド用
                    let gold = Math.randomInt(item) + 1;
                    if (gold < min) {
                        gold = min;
                    }
                    if (TinyGetInfoWndMZ) {
                        const params = [0, 0, gold];
                        interpreter.command125(params);
                    } else {
                        $gameParty.gainGold(gold);
                    }
                    if (!GetInformation && !SKM_GetInformationMZ && !TinyGetInfoWndMZ && get_message) {
                        $gameMessage.add(GoldMessage.format(GoldIconIndex, gold, TextManager.currencyUnit));
                    }
                }
                get_item_count = 1;
            }
        } else {
            for (const item_list of item_lists) {
                const item_info = JSON.parse(item_list);
                const rate      = Number(item_info.rate || 100);
                const count     = Number(item_info.count || 1);
                const min       = Number(item_info.min || 0);
                const name      = item_info.name;
                let item;
                if (isNaN(name)) {
                    item = Potadra_itemSearch(name);
                } else { // ゴールド用
                    item = Number(name);
                }

                if (item) {
                    if (isNaN(item)) {
                        let item_count = 0;
                        for (let j = 0; j < count; j++) {
                            if (Potadra_random(rate)) {
                                item_count++;
                            }
                        }
                        if (item_count < min) {
                            item_count = min;
                        }

                        // アイテム入手
                        if (item_count > 0) {
                            if (TinyGetInfoWndMZ) {
                                let params = [item.id, 0, 0, item_count, false];
                                if (DataManager.isItem(item)) {
                                    params = [item.id, 0, 0, item_count];
                                    interpreter.command126(params);
                                } else if (DataManager.isWeapon(item)) {
                                    interpreter.command127(params);
                                } else if (DataManager.isArmor(item)) {
                                    interpreter.command128(params);
                                } else {
                                    return false;
                                }
                            } else {
                                $gameParty.gainItem(item, item_count);
                            }
                            if (!GetInformation && !SKM_GetInformationMZ && !TinyGetInfoWndMZ && get_message && item_count > 0) {
                                $gameMessage.add(get_message.format(item.iconIndex, item.name, item_count));
                            }
                            get_item_count++;
                        }
                    } else { // ゴールド用
                        let gold = 0;
                        for (let j = 0; j < count; j++) {
                            if (Potadra_random(rate)) {
                                gold += Math.randomInt(item) + 1;
                            }
                        }
                        if (gold < min) {
                            gold = min;
                        }
                        // ゴールド入手
                        if (gold > 0) {
                            if (TinyGetInfoWndMZ) {
                                const params = [0, 0, gold];
                                interpreter.command125(params);
                            } else {
                                $gameParty.gainGold(gold);
                            }
                            if (!GetInformation && !SKM_GetInformationMZ && !TinyGetInfoWndMZ && get_message) {
                                $gameMessage.add(GoldMessage.format(GoldIconIndex, gold, TextManager.currencyUnit));
                            }
                            get_item_count++;
                        }
                    }
                }
            }
        }

        // アイテム入手SE
        if (se && get_item_count > 0) AudioManager.playSe(se);

        if (GetInformation || SKM_GetInformationMZ) {
            CommonPopupManager._popEnable = false;
        }
    }
})();
