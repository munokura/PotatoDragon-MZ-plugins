/*------------------------------
Copyright (c) 2025 PotatoDragon
Released under the MIT License.
https://opensource.org/license/mit
------------------------------*/

/*:
@target MZ
@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Game/Map/FastTravel.js
@plugindesc Fast Travel Ver. 1.0.3 (August 6, 2025)
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
Easily implement fast travel

## Usage
Provides a fast travel function that can be invoked from menus or plugin
commands.
You can manage destination display conditions with switches,
and set common events to execute before and after travel.

Fast travel can be invoked in two ways: from a menu or
from an event.

### 1. Invoking from a menu
1. Set the plugin parameter `MenuCommand`.
2. Setting the `Menu Display Name` of `MenuCommand`
will add the command to the menu (leaving it empty will not add it).
3. Register a list of fast travel destinations in `Destination Map
Information` (`mapLists`).
You can register multiple lists and switch between them using the `Destination
Map Information Number` variable.
4. Set the details of each destination (destination name, travel coordinates,
display conditions, etc.) in `Destination Map Information`.

### 2. Invoking from an event
1. Select "Plugin Command" in the event command.
2. Select the `fast_travel` command.
3. Set the list of locations you want to travel to directly in the
`Destination Map Information` argument.
The settings here are independent of the menu settings.

## Plugin Commands

### Fast Travel (`fast_travel`)
Calls the fast travel screen directly from an event.
The list of locations specified in the `Destination Map Information` argument
is displayed.

### Call Menu Contents (`fast_travel_menu`)
Calls the same fast travel screen as set in the `MenuCommand` plugin
parameter.

## Plugin Parameters

### Menu Settings (`MenuCommand`)
- **Menu Display Name**
The command name displayed in the main menu. If left blank, it will not be
displayed.

- **Menu Display Switch**
This command will only be displayed in the menu when ON. If set to 0, it will
always be displayed.

- **Menu Disable Switch**
When ON, the command will be disabled (grayed out).

- **Destination Map Information Number**
Specifies which `Destination Map Information` list to use using a variable.
For example, if the variable value is 1, the second `Destination Map
Information` list will be used.
If set to 0, the first list will always be used.

- **Destination Map Information**
This is a list of fast travel destinations. You can create multiple lists.

### Other
- **Cancel Switch**
This switch turns ON when you cancel on the fast travel screen.

- **Destination Map ID Memory Variable**, etc.
This is a global variable setting for storing the coordinates of the
"destination," "origin," and "escape destination" when fast traveling.
You can also set this individually for each destination.

- **Number of Destination Display Columns**
Sets the number of columns to display in the fast travel destination list.

## Destination Map Information Settings (`MoveMapList`)
Detailed settings for each fast travel destination.

- **Destination Display Switch**
When this switch is ON, the destination will be displayed in the list.

- **Destination Hide Switch**
When this switch is ON, the destination will be hidden from the list.
(This takes precedence over the Display switch.)

- **Move Switch**
This switch turns ON when you move to this location.

- **Destination Map Information Number Change**
When you move to this location, the `destination map information number` will
be displayed. Changes the value of the specified variable.
This allows you to change the list contents when you go to a specific
location.

- **Map Destination Name**
The name of the destination displayed in the list.

- **Map Description**
When you select a destination, this description appears in the help window on
the right.

- **Common Event ID**:
- **Common Event ID for Movement Process**
If specified, this common event will be executed instead of the usual location
move.

- **Pre-Move Common Event ID**
This common event is executed immediately before a location change.

- **Post-Move Common Event ID**
This common event is executed immediately after a location change.

- **Map**
- **Map**
Specifies the destination map and coordinates.

- **Direction**
Specifies the player's orientation after the move.

- **Fade**
Specifies how the screen fades when changing locations.

- **Location Change Sound Effects**
Sound effects to play when changing locations.

- **Various Coordinate Memory Variables**
Specifies the coordinate memory variables specific to this destination.
Variables set here take priority over global settings.

- **Ship/Ship/Airship Coordinates**
When changing locations, each vehicle's position is moved to the specified
coordinates.

@param MenuCommand
@text Menu Display Name
@desc Commands that can display menus
@type combo
@default ファストトラベル
@option ファストトラベル

@param MenuSwitch
@text Menu display switch
@desc When ON, the command is displayed in the menu.
@type switch
@default 0
@parent MenuCommand

@param DisableMenuSwitch
@text Menu disable switch
@desc When ON, the command is prohibited.
@type switch
@default 0
@parent MenuCommand

@param MapListVariable
@text Destination map information number
@desc Variable to manage the destination map information number
@type variable
@default 0
@parent MenuCommand

@param mapLists
@text Destination map information
@type struct<MapList>[]
@parent MenuCommand

@param cancelSwitch
@text Cancellation judgment switch
@desc This switch will turn ON when you cancel.
@type switch
@default 0

@param MapIdVariable
@text Destination map ID storage variable
@desc Variable to store destination map ID
@type variable
@default 0
@parent mapId

@param X_Variable
@text Destination map X coordinate storage variable
@desc Destination map X coordinate storage variable
@type variable
@default 0
@parent MapIdVariable

@param Y_Variable
@text Destination map Y coordinate storage variable
@desc Map Y coordinate storage variable for destination
@type variable
@default 0
@parent MapIdVariable

@param ExitMapIdVariable
@text Exit map ID storage variable
@desc Variable to store the map ID of the exit
@type variable
@default 0

@param Exit_X_Variable
@text Exit map X coordinate storage variable
@desc Exit map X coordinate storage variable
@type variable
@default 0
@parent ExitMapIdVariable

@param Exit_Y_Variable
@text Exit map Y coordinate storage variable
@desc Exit map Y coordinate storage variable
@type variable
@default 0
@parent ExitMapIdVariable

@param EscapeMapIdVariable
@text Escape map ID storage variable
@desc Variable to store the escape map ID
@type variable
@default 0

@param Escape_X_Variable
@text Escape map X coordinate storage variable
@desc Escape map X coordinate storage variable
@type variable
@default 0
@parent EscapeMapIdVariable

@param Escape_Y_Variable
@text Escape map Y coordinate storage variable
@desc Escape map Y coordinate storage variable
@type variable
@default 0
@parent EscapeMapIdVariable

@param MaxCols
@text Number of columns to display destination
@desc Number of columns to display destination
@type number
@default 1
@min 1
@max 3

@command fast_travel
@text Fast Travel
@desc Invoke fast travel
@arg maps
@text Destination map information
@type struct<MoveMapList>[]

@command fast_travel_menu
@text Calls up the same content as the menu
@desc Calls up the same content as the menu
*/

/*:ja
@plugindesc
ファストトラベル Ver1.0.3(2025/8/6)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Game/Map/FastTravel.js
@target MZ
@author ポテトードラゴン

・アップデート情報
Ver1.0.3: マップ名の表示機能が正しく動作していない問題を修正
Ver1.0.2: ヘルプ更新
Ver1.0.1
- メニュー表示名の説明を修正
- コモンイベントの設定の説明に「0(なし)の場合、使用しません」を追加
Ver1.0.0
- 「@type location」に対応(再設定が必要になります)
  + マップIDの指定
  + 乗り物の指定
- プラグインパラメータ move_common_event を after_common_event に変更(再設定が必要になります)
Ver0.9.9
- マップIDの指定をMZ1.9.0アップデートで追加された「@type map」に対応しました
  + 次回アップデート(Ver1.0.0)で「@type location」に対応するため、再設定が必要になります
    旧バージョン(Ver0.9.9)は、こちら(https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Base/Old/FastTravel.js)で公開しています
Ver0.9.8
- メニュー項目に設定がないときにエラー落ちしないようにした
- SE設定の共通処理を修正
- ヘルプ更新
Ver0.9.7: 移動前コモンイベントを追加
Ver0.9.6: メニュー表示名の設定をコンボボックスに変更

・TODO
- ページ対応
- 右にコマンド配置
- エスケープ機能実装
- エスケープ先から1歩動く機能搭載
- 移動時アニメーション・SE

Copyright (c) 2025 ポテトードラゴン
Released under the MIT License.
https://opensource.org/license/mit

@help
## 概要
ファストトラベルを簡単に実装します

## 使い方
メニューやプラグインコマンドから呼び出せるファストトラベル機能を提供
行き先の表示条件をスイッチで管理したり、
移動前後にコモンイベントを実行する設定等が可能

ファストトラベルは、メニューから呼び出す方法と
イベントから呼び出す方法の2通りがあります

### 1. メニューから呼び出す場合
1. プラグインパラメータの `MenuCommand` 以下を設定します
2. `MenuCommand` の `メニュー表示名` を設定すると
   メニューにコマンドが追加されます(空にすると追加されません)
3. `移動先マップ情報` (`mapLists`) に
   ファストトラベルで行ける場所のリストを登録します
   複数のリストを登録し、`移動先マップ情報番号` の変数で切り替えることも可能
4. 各移動先の詳細(行き先名、移動座標、表示条件など)を
   `移動先マップ情報` の中で設定します

### 2. イベントから呼び出す場合
1. イベントコマンドの「プラグインコマンド」を選択します
2. `fast_travel` コマンドを選択します
3. 引数の `移動先マップ情報` に移動させたい場所のリストを直接設定します
   こちらで設定した内容は、メニュー用の設定とは独立しています

## プラグインコマンド

### ファストトラベル (`fast_travel`)
イベントから直接ファストトラベル画面を呼び出します
引数 `移動先マップ情報` で指定した場所のリストが表示されます

### メニューと同じ内容を呼び出す (`fast_travel_menu`)
プラグインパラメータの `MenuCommand` で設定した内容と
同じファストトラベル画面をイベントから呼び出します

## プラグインパラメータ

### メニュー設定 (`MenuCommand`)
- **メニュー表示名**
メインメニューに表示されるコマンド名です。空にすると表示されません

- **メニュー表示スイッチ**
ONのときだけメニューにコマンドを表示します。0の場合は常に表示されます

- **メニュー禁止スイッチ**
ONのときコマンドが使用不可（灰色表示）になります

- **移動先マップ情報番号**
`移動先マップ情報`のどのリストを使用するかを変数で指定します。
例えば変数の値が1なら、`移動先マップ情報`の2番目のリストが使われます
0の場合は常に1番目のリストが使われます

- **移動先マップ情報**
ファストトラベル先のリストです。複数のリストを作成できます

### その他
- **キャンセル判定スイッチ**
ファストトラベル画面でキャンセルした時にONになるスイッチです

- **移動先マップID記憶変数**など
ファストトラベルで移動した際の「移動先」「移動元」「エスケープ先」の
座標を記憶するためのグローバルな変数設定です
各移動先で個別に設定することもできます

- **行き先の表示列数**
ファストトラベル先のリストを何列で表示するかを設定します

## 移動先マップ情報の設定 (`MoveMapList`)
ファストトラベルの行き先一つ一つに対する詳細設定です

- **移動先表示スイッチ**
このスイッチがONの時に、行き先がリストに表示されます

- **移動先非表示スイッチ**
このスイッチがONの時に、行き先がリストから非表示になります
（表示スイッチより優先されます）

- **移動判定スイッチ**
この場所へ移動した時にONになるスイッチです

- **移動先マップ情報番号変更**
この場所へ移動した時に `移動先マップ情報番号` で
指定した変数の値を変更します
これにより、特定の場所へ行くとリストの内容が切り替わるといった演出が可能

- **マップ移動先名**
リストに表示される行き先の名前です

- **マップ説明**
行き先を選択した時に、右側のヘルプウィンドウに表示される説明文です

- **コモンイベントID**:
  - **移動処理のコモンイベントID**
  指定すると、通常の場所移動の代わりにこのコモンイベントが実行されます。

  - **移動前コモンイベントID**
  場所移動の直前に実行されるコモンイベントです

  - **移動後コモンイベントID**
  場所移動の直後に実行されるコモンイベントです

- **マップ**
  - **マップ**
  移動先のマップと座標を指定します

  - **向き**
  移動後のプレイヤーの向きを指定します

  - **フェード**
  場所移動時の画面のフェード方法を指定します

  - **場所移動SE**
  場所移動時に再生するSEです

  - **各種座標記憶変数**
  この移動先独自の座標記憶変数を設定します
  ここで設定した変数が、グローバルな設定より優先されます

- **小型船/大型船/飛行船座標**
場所移動と同時に、各乗り物の位置を指定した座標に移動させます

@param MenuCommand
@type combo
@text メニュー表示名
@desc メニューの表示が出来るコマンド
空文字でメニューに表示しません
@default ファストトラベル
@option ファストトラベル

    @param MenuSwitch
    @parent MenuCommand
    @type switch
    @text メニュー表示スイッチ
    @desc ONのときメニューにコマンドを表示します
    0(なし)の場合、常にメニューへ表示します
    @default 0

    @param DisableMenuSwitch
    @parent MenuCommand
    @type switch
    @text メニュー禁止スイッチ
    @desc ONのときコマンドの使用を禁止します
    @default 0

    @param MapListVariable
    @parent MenuCommand
    @type variable
    @text 移動先マップ情報番号
    @desc 移動先マップ情報の番号を管理する変数
    0(なし)の場合、0番目が常に参照されます
    @default 0

    @param mapLists
    @parent MenuCommand
    @type struct<MapList>[]
    @text 移動先マップ情報

@param cancelSwitch
@type switch
@text キャンセル判定スイッチ
@desc キャンセルをしたときにこのスイッチがONになります
0(なし)の場合、使用しません
@default 0

    @param MapIdVariable
    @parent mapId
    @type variable
    @text 移動先マップID記憶変数
    @desc 移動先マップIDを記憶する変数
    0 の場合は、移動先マップIDは記憶しません
    @default 0

    @param X_Variable
    @parent MapIdVariable
    @type variable
    @text 移動先マップX座標記憶変数
    @desc 移動先のマップX座標記憶変数
    0 の場合は、移動先マップX座標は記憶しません
    @default 0

    @param Y_Variable
    @parent MapIdVariable
    @type variable
    @text 移動先マップY座標記憶変数
    @desc 移動先のマップY座標記憶変数
    0 の場合は、移動先マップY座標は記憶しません
    @default 0

@param ExitMapIdVariable
@type variable
@text 出口マップID記憶変数
@desc 出口のマップIDを記憶する変数
0 の場合は、出口のマップIDは記憶しません
@default 0

    @param Exit_X_Variable
    @parent ExitMapIdVariable
    @type variable
    @text 出口マップX座標記憶変数
    @desc 出口のマップX座標記憶変数
    0 の場合は、出口のマップX座標は記憶しません
    @default 0

    @param Exit_Y_Variable
    @parent ExitMapIdVariable
    @type variable
    @text 出口マップY座標記憶変数
    @desc 出口のマップY座標記憶変数
    0 の場合は、出口のマップY座標は記憶しません
    @default 0

@param EscapeMapIdVariable
@type variable
@text エスケープマップID記憶変数
@desc エスケープのマップIDを記憶する変数
0 の場合は、エスケープのマップIDは記憶しません
@default 0

    @param Escape_X_Variable
    @parent EscapeMapIdVariable
    @type variable
    @text エスケープマップX座標記憶変数
    @desc エスケープのマップX座標記憶変数
    0 の場合は、エスケープのマップX座標は記憶しません
    @default 0

    @param Escape_Y_Variable
    @parent EscapeMapIdVariable
    @type variable
    @text エスケープマップY座標記憶変数
    @desc エスケープのマップY座標記憶変数
    0 の場合は、エスケープのマップY座標は記憶しません
    @default 0

@param MaxCols
@type number
@text 行き先の表示列数
@desc 行き先の表示列数
@default 1
@min 1
@max 3

@command fast_travel
@text ファストトラベル
@desc ファストトラベルを呼び出します

    @arg maps
    @type struct<MoveMapList>[]
    @text 移動先マップ情報

@command fast_travel_menu
@text メニューと同じ内容を呼び出す
@desc メニューと同じ内容を呼び出します
*/

(() => {
    'use strict';

    // ベースプラグインの処理
    function Potadra_getPluginName(extension = 'js') {
        const reg = new RegExp(".+\/(.+)\." + extension);
        return decodeURIComponent(document.currentScript.src).replace(reg, '$1');
    }
    function Potadra_checkSwitch(switch_no, bool = true) {
        return switch_no === 0 || $gameSwitches.value(switch_no) === bool;
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
    function Potadra_convertMap(struct_map, cast = false) {
        if (!struct_map) return false;
        let map;
        try {
            map = JSON.parse(struct_map);
        } catch(e){
            return false;
        }
        let map_id = map.mapId;
        if (cast) map_id = Number(map_id || 0);
        const x = Number(map.x || 0);
        const y = Number(map.y || 0);
        return {"mapId": map_id, "x": x, "y": y};
    }
    function Potadra_checkName(data, name, val = false) {
        if (isNaN(name)) {
            return Potadra_nameSearch(data, name.trim(), "id", "name", val);
        }
        return Number(name || val);
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
    function Potadra_nameSearch(data, name, column = "id", search_column = "name", val = "", initial = 1) {
        return Potadra_search(data, name, column, search_column, val, initial);
    }

    // パラメータ用変数
    const plugin_name = Potadra_getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const MenuCommand         = String(params.MenuCommand);
    const MenuSwitch          = Number(params.MenuSwitch || 0);
    const DisableMenuSwitch   = Number(params.DisableMenuSwitch || 0);
    const MapListVariable     = Number(params.MapListVariable || 0);
    const cancelSwitch        = Number(params.cancelSwitch || 0);
    const MapIdVariable       = Number(params.MapIdVariable || 0);
    const X_Variable          = Number(params.X_Variable || 0);
    const Y_Variable          = Number(params.Y_Variable || 0);
    const ExitMapIdVariable   = Number(params.ExitMapIdVariable || 0);
    const Exit_X_Variable     = Number(params.Exit_X_Variable || 0);
    const Exit_Y_Variable     = Number(params.Exit_Y_Variable || 0);
    const EscapeMapIdVariable = Number(params.EscapeMapIdVariable || 0);
    const Escape_X_Variable   = Number(params.Escape_X_Variable || 0);
    const Escape_Y_Variable   = Number(params.Escape_Y_Variable || 0);
    const MaxCols             = Number(params.MaxCols || 1);

    let MoveMapList;
    if (MenuCommand && params.mapLists) {
        const MapList = JSON.parse(params.mapLists);
        const map_list_number = MapListVariable === 0 ? MapListVariable : $gameVariables.value(MapListVariable);
        const move_map_list = JSON.parse(MapList[map_list_number]);
        MoveMapList = JSON.parse(move_map_list.maps);
    }

    // プラグインコマンド(ファストトラベル)
    PluginManager.registerCommand(plugin_name, "fast_travel", args => {
        const move_map_lists = JSON.parse(args.maps);
        SceneManager.push(Scene_FastTravel);
        SceneManager.prepareNextScene(move_map_lists);
    });

    // プラグインコマンド(メニューと同じ設定を呼び出す)
    PluginManager.registerCommand(plugin_name, "fast_travel_menu", args => {
        SceneManager.push(Scene_FastTravel);
        SceneManager.prepareNextScene(MoveMapList);
    });

    /**
     * 強制的に乗り物から降りる
     *    現在乗り物に乗っていることが前提
     *
     * @returns {} 
     */
    function forceGetOffVehicle() {
        if ($gamePlayer.isInAirship()) {
            $gamePlayer.vehicle()._altitude = 0;
            $gamePlayer.setDirection(2);
        }
        $gamePlayer.vehicle().getOff();
        $gamePlayer._vehicleGettingOff = false;
        $gamePlayer._vehicleType = "walk";
        $gamePlayer.setTransparent(false);
        $gamePlayer.setMoveSpeed(4);
        $gamePlayer.setThrough(false);
        return $gamePlayer._vehicleGettingOff;
    }

    /**
     * ファストトラベル画面の処理を行うクラスです
     *
     * @class
     */
    class Scene_FastTravel extends Scene_MenuBase {
        /**
         * 準備
         *
         * @param {} move_map_lists - マップ移動先の一覧
         */
        prepare(moveMapLists) {
            this._moveMapLists = [];
            if (moveMapLists) {
                for (const value of moveMapLists) {
                    const map_data   = JSON.parse(value);
                    const showSwitch = Number(map_data.showSwitch || 0);
                    const hideSwitch = Number(map_data.hideSwitch || 0);
                    if (Potadra_checkSwitch(showSwitch) && Potadra_checkSwitch(hideSwitch, false)) {
                        this._moveMapLists.push(map_data);
                    }
                }
            }
        }

        /**
         *
         */
        create() {
            super.create();
            // キャンセル判定スイッチ
            if (cancelSwitch !== 0) {
                $gameSwitches.setValue(cancelSwitch, false);
            }
            this.createHelpWindow();
            this.createFastTravelWindow();
        }

        /**
         * 
         */
        createFastTravelWindow() {
            const rect = this.fastTravelWindowRect();
            this._fastTravelWindow = new Window_FastTravel(rect);
            this._fastTravelWindow.setHandler('ok',     this.commandMap.bind(this));
            this._fastTravelWindow.setHandler("cancel", this.onCancel.bind(this));
            this._fastTravelWindow.setupMapLists(this._moveMapLists);
            this._fastTravelWindow.setHelpWindow(this._helpWindow);
            this.addWindow(this._fastTravelWindow);
        }

        /**
         * 
         *
         * @returns {} 
         */
        fastTravelWindowRect() {
            const wx = 0;
            const wy = this.helpAreaTop();
            const ww = Graphics.boxWidth / 3;
            const wh = Graphics.boxHeight - this.buttonAreaHeight();
            return new Rectangle(wx, wy, ww, wh);
        }

        /**
         * ヘルプ下部表示モード
         *
         * @returns {} 
         */
        isBottomHelpMode() {
            return false;
        }

        /**
         * 
         *
         * @returns {} 
         */
        helpWindowRect() {
            const wx = Graphics.boxWidth / 3;
            const wy = this.helpAreaTop();
            const ww = (Graphics.boxWidth  / 3) * 2;
            const wh = Graphics.boxHeight - this.buttonAreaHeight();
            return new Rectangle(wx, wy, ww, wh);
        }

        // onPersonalCancel でも良いが、メニュー以外からも呼び出したいのでこの実装
        onCancel() {
            // キャンセル判定スイッチ
            if (cancelSwitch !== 0) {
                $gameSwitches.setValue(cancelSwitch, true);
            }
            this.popScene();
        }

        /**
         * コマンド［マップ移動］
         */
        commandMap() {
            const map_data           = this._moveMapLists[this._fastTravelWindow.index()];
            const moveSwitch         = Number(map_data.moveSwitch || 0);
            const moveChangeVariable = Number(map_data.moveChangeVariable || 0);
            const se                 = Potadra_convertAudio(map_data.se, 'Move1');

            const map       = Potadra_convertMap(map_data.map);
            const mapId     = Potadra_checkName($dataMapInfos, map.mapId, 1);
            const direction = Number(map_data.direction || 0);
            const fade_type = Number(map_data.fade_type || 0);

            const boat     = Potadra_convertMap(map_data.boat);
            const ship     = Potadra_convertMap(map_data.ship);
            const air_ship = Potadra_convertMap(map_data.air_ship);

            const common_event        = Potadra_checkName($dataCommonEvents, map_data.common_event, 0);
            const before_common_event = Potadra_checkName($dataCommonEvents, map_data.before_common_event, 0);
            const after_common_event  = Potadra_checkName($dataCommonEvents, map_data.after_common_event, 0);

            let map_id_variable        = Number(map_data.map_id_variable || 0);
            let x_variable             = Number(map_data.x_variable || 0);
            let y_variable             = Number(map_data.y_variable || 0);
            let exit_map_id_variable   = Number(map_data.exit_map_id_variable || 0);
            let exit_x_variable        = Number(map_data.exit_x_variable || 0);
            let exit_y_variable        = Number(map_data.exit_y_variable || 0);
            let escape_map_id_variable = Number(map_data.escape_map_id_variable || 0);
            let escape_x_variable      = Number(map_data.escape_x_variable || 0);
            let escape_y_variable      = Number(map_data.escape_y_variable || 0);

            if (map_id_variable === 0) map_id_variable = MapIdVariable;
            if (x_variable === 0) x_variable = X_Variable;
            if (y_variable === 0) y_variable = Y_Variable;
            if (exit_map_id_variable === 0) exit_map_id_variable = ExitMapIdVariable;
            if (exit_x_variable === 0) exit_x_variable = Exit_X_Variable;
            if (exit_y_variable === 0) exit_y_variable = Exit_Y_Variable;
            if (escape_map_id_variable === 0) escape_map_id_variable = EscapeMapIdVariable;
            if (escape_x_variable === 0) escape_x_variable = Escape_X_Variable;
            if (escape_y_variable === 0) escape_y_variable = Escape_Y_Variable;

            SceneManager.goto(Scene_Map);

            // 乗る動作の途中(乗ったことにする)
            if ($gamePlayer._vehicleGettingOn) {
                $gamePlayer._vehicleGettingOn = false;
            }

            // 乗り物に乗っている(強制的に降ろす)
            if ($gamePlayer.isInVehicle()) {
                forceGetOffVehicle();
            }

            // 小型船
            let boatX = boat.x;
            let boatY = boat.y;
            if (boatX === 0) boatX = $dataSystem.boat.startX;
            if (boatY === 0) boatY = $dataSystem.boat.startY;

            // 大型船
            let shipX = ship.x;
            let shipY = ship.y;
            if (shipX === 0) shipX = $dataSystem.ship.startX;
            if (shipY === 0) shipY = $dataSystem.ship.startY;

            // 飛行船
            let airX = air_ship.x;
            let airY = air_ship.y;
            if (airX === 0) airX = $dataSystem.airship.startX;
            if (airY === 0) airY = $dataSystem.airship.startY;

            // 乗り物の位置設定
            $gameMap.boat().setPosition(boatX, boatY);
            $gameMap.ship().setPosition(shipX, shipY);
            $gameMap.airship().setPosition(airX, airY);

            // 移動先記憶
            if (map_id_variable !== 0) $gameVariables.setValue(map_id_variable, mapId);
            if (x_variable !== 0) $gameVariables.setValue(x_variable, map.x);
            if (y_variable !== 0) $gameVariables.setValue(y_variable, map.y);

            // 出口記憶
            if (exit_map_id_variable !== 0) $gameVariables.setValue(exit_map_id_variable, $gameMap._mapId);
            if (exit_x_variable !== 0) $gameVariables.setValue(exit_x_variable, $gamePlayer.x);
            if (exit_y_variable !== 0) $gameVariables.setValue(exit_y_variable, $gamePlayer.y);

            if (before_common_event !== 0) {
                $gameTemp.reserveCommonEvent(before_common_event);
            }
            if (common_event === 0) {
                if (se) AudioManager.playSe(se);
                $gameMap._interpreter.command201([0, mapId, map.x, map.y, direction, fade_type]);
            } else {
                $gameTemp.reserveCommonEvent(common_event);
            }
            if (after_common_event !== 0) {
                $gameTemp.reserveCommonEvent(after_common_event);
            }

            // 移動判定スイッチ
            if (moveSwitch !== 0) {
                $gameSwitches.setValue(moveSwitch, true);
            }

            // 移動先マップ情報番号変更
            if (Potadra_checkVariable(MapListVariable)) {
                $gameVariables.setValue(MapListVariable, moveChangeVariable);
            }
        }
    }

    if (MenuCommand) {
        /**
         * メニュー画面で表示するコマンドウィンドウです。
         *
         * @class
         */

        /**
         * 独自コマンドの追加用
         */
        const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
        Window_MenuCommand.prototype.addOriginalCommands = function() {
            _Window_MenuCommand_addOriginalCommands.apply(this, arguments);
            if (Potadra_checkSwitch(MenuSwitch)) {
                this.addCommand(MenuCommand, "fast_travel_menu", Potadra_checkSwitch(DisableMenuSwitch, false));
            }
        };

        /**
         * メニュー画面の処理を行うクラスです。
         *
         * @class
         */

        /**
         * コマンドウィンドウの作成
         */
        const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
        Scene_Menu.prototype.createCommandWindow = function() {
            _Scene_Menu_createCommandWindow.apply(this, arguments);
            this._commandWindow.setHandler("fast_travel_menu", this.fast_travel_menu.bind(this));
        };

        /**
         * コマンド［ファストトラベル］
         */
        Scene_Menu.prototype.fast_travel_menu = function() {
            SceneManager.push(Scene_FastTravel);
            SceneManager.prepareNextScene(MoveMapList);
        };
    }

    /**
     * ファストトラベル画面の表示を行うウィンドウクラスです
     *
     * @class
     */
    class Window_FastTravel extends Window_Command {
        /**
         * 桁数の取得
         *
         * @returns {number} 桁数
         */
        maxCols() {
            return MaxCols;
        }

        /**
         * ヘルプテキスト更新
         */
        updateHelp() {
            super.updateHelp();
            const map_data = this._data[this.index()];
            if (map_data) this._helpWindow.setText(map_data.map_help);
        }

        /**
         * 行き先マップ一覧を設定
         *
         * @param {} moveMapLists - 
         */
        setupMapLists(moveMapLists) {
            this._data = moveMapLists;
            this.refresh();
            this.select(0);
        }

        /*
         * コマンドリストの作成
         */
        makeCommandList() {
            if (this._data) {
                for (const map_data of this._data) {
                    const move_map_name     = String(map_data.move_map_name);
                    const mapName           = String(map_data.mapName);
                    const common_event_name = String(map_data.common_event_name);

                    const map = Potadra_convertMap(map_data.map);
                    let mapId = Potadra_checkName($dataMapInfos, map.mapId, 1);
                    let common_event = Number(map_data.common_event || 0);
                    let command_name;

                    if (mapId === 0 && mapName) {
                        mapId = Potadra_nameSearch($dataMapInfos, mapName, 'id', 'name', 1);
                    }

                    if (common_event === 0 && common_event_name) {
                        common_event = Potadra_nameSearch($dataCommonEvents, common_event_name, 'id', 'name', 0);
                    }

                    if (common_event !== 0) command_name = $dataCommonEvents[common_event].name;
                    if (mapId !== 0) command_name = $dataMapInfos[mapId].name || mapId;
                    if (move_map_name) command_name = move_map_name;

                    this.addCommand(command_name, "map");
                }
            }
        }
    }
})();
