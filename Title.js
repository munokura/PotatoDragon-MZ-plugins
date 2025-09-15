/*------------------------------
Copyright (c) 2025 PotatoDragon
Released under the MIT License.
https://opensource.org/license/mit
------------------------------*/

/*:
@target MZ
@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Scene/Title/Title.js
@plugindesc Title Processing Ver. 1.4.1 (2025/1/18)
@author PotatoDragon
@license MIT License

@help
English Help Translator: munokura
Please check the URL below for the latest version of the plugin.
URL https://github.com/pota-gon/RPGMakerMZ/wiki
-----

## Overview
Changes the title display in various ways.

## Usage
You can control title functions by changing the plugin parameters.

### Parameter Description

#### Title Text Color (TitleColor)
Changes the title text color.

#### Always New Game (SelectOnlyNewGame)
Always starts a new game, regardless of whether saved data is available or
not.

#### Fixed Title (FixedTitle)
Displays this title instead of the System 1 game title.
This function prevents the version from being displayed in the title when a
version is included in the game title.

#### Subtitle (SubTitle)
Adds a subtitle that can be displayed directly below the title.
Setting it to blank suppresses the subtitle.

#### Version Display (Version)
Displays the version number in the lower left corner of the title.

##### Version Name (VersionName)
When the game title is written as Project ver1.0.0, the characters following
this character will be treated as the version number.

##### Version Position (VersionPos)
Which part of the game title is treated as the version? For Project version
1.0.0, the values to specify are as follows:

0: Project
1: version 1.0.0

##### Version ID Display (VersionId)
Whether to display $dataSystem["versionId"], which changes with each save.

###### Version ID Separator (VersionIdName)
Separator between $dataSystem["versionId"] and the version ID.
The default is .

@param TitleColor
@text Title text color
@desc Title text color
@type color
@default 0

@param SelectOnlyNewGame
@text Always New Game
@desc Always select New Game
@type boolean
@on Select
@off Do not select
@default false

@param FixedTitle
@text Fixed Title
@desc Fixed title display content

@param SubTitle
@text subtitle
@desc Subtitle display content

@param Version
@text Version Display
@desc Show version number in the bottom left corner of the title
@type boolean
@on Show
@off Do not display
@default true

@param VersionName
@text Version Name
@desc The title after this character will be treated as the version.
@default ver
@parent Version

@param VersionPos
@text Version Split Location
@desc Titles divided by version name
@type number
@default 1
@parent Version

@param VersionId
@text Version ID Display
@desc Setting whether to display $dataSystem["versionId"]
@type boolean
@on Show
@off Do not display
@default false
@parent Version

@param VersionIdName
@text Version ID Separator
@desc Character used to separate version IDs
@default .
@parent VersionId
*/

/*:ja
@plugindesc
タイトル処理 Ver1.4.1(2025/1/18)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Scene/Title/Title.js
@target MZ
@author ポテトードラゴン

・アップデート情報
Ver1.4.1
- バージョンIDの非表示設定が正しく動作していないバグ修正
- ヘルプ更新
Ver1.4.0
- 固定タイトルとサブタイトルの設定を簡易化
- タイトルの文字色がタイトル固定表示しか有効になっていなかったのを修正

Copyright (c) 2025 ポテトードラゴン
Released under the MIT License.
https://opensource.org/license/mit

@help
## 概要
タイトルの表示を色々変更します

## 使い方
プラグインのパラメータを変更することで、タイトルの機能を制御できます

### パラメータ説明

#### タイトル文字色(TitleColor)
タイトルの文字色を変更できます

#### 常にニューゲーム(SelectOnlyNewGame)
セーブデータの有無にかかわらず、常にニューゲームから開始するようになります

#### 固定タイトル(FixedTitle)
システム1のゲームタイトルではなく、こちらのタイトルを表示するようにします  
ゲームタイトルにバージョンを入れたときに  
タイトルにはバージョンを表示しないための機能です

#### サブタイトル(SubTitle)
タイトルの直下に表示できるサブタイトルを追加します  
空文字でサブタイトルは表示しません

#### バージョン表示(Version)
バージョン番号をタイトル左下に表示します

##### バージョン名(VersionName)
ゲームタイトルに Project ver1.0.0 のように記載したとき  
ここに記載した文字以降をバージョン番号とするか

##### バージョン分割位置(VersionPos)
ゲームタイトルのどこをバージョンとして扱うか  
Project ver1.0.0 の場合、指定する数値は以下のようになる

0: Project
1: ver1.0.0

##### バージョンID表示(VersionId)
保存するたびに変更される $dataSystem["versionId"] を表示するか

###### バージョンID区切り文字(VersionIdName)
$dataSystem["versionId"]とバージョンIDの区切り文字  
デフォルトは .

@param TitleColor
@type color
@text タイトル文字色
@desc タイトルの文字色
@default 0

@param SelectOnlyNewGame
@type boolean
@text 常にニューゲーム
@desc 常にニューゲームを選択するかの設定
@on 選択する
@off 選択しない
@default false

@param FixedTitle
@text 固定タイトル
@desc 固定タイトルの表示内容
空文字で固定タイトルは使用しません

@param SubTitle
@text サブタイトル
@desc サブタイトルの表示内容
空文字でサブタイトルは表示しません

@param Version
@type boolean
@text バージョン表示
@desc バージョン番号をタイトル左下に表示するか
@on 表示する
@off 表示しない
@default true

    @param VersionName
    @parent Version
    @text バージョン名
    @desc この文字以降のタイトルをバージョンとして扱います
    @default ver

    @param VersionPos
    @parent Version
    @type number
    @text バージョン分割位置
    @desc バージョン名で分割したタイトルの
    どこをバージョンとして使うかの設定
    @default 1

    @param VersionId
    @parent Version
    @type boolean
    @text バージョンID表示
    @desc $dataSystem["versionId"]を表示するかの設定
    @on 表示する
    @off 表示しない
    @default false

        @param VersionIdName
        @parent VersionId
        @text バージョンID区切り文字
        @desc バージョンIDの区切りとして使う文字
        @default .
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
    const TitleColor        = Number(params.TitleColor || 0);
    const SelectOnlyNewGame = Potadra_convertBool(params.SelectOnlyNewGame);
    const FixedTitle        = String(params.FixedTitle);
    const SubTitle          = String(params.SubTitle);
    const Version           = Potadra_convertBool(params.Version);
    const VersionName       = String(params.VersionName || 'ver');
    const VersionIdName     = String(params.VersionIdName);
    const VersionPos        = Number(params.VersionPos || 1);
    const VersionId         = Potadra_convertBool(params.VersionId);

    /**
     * タイトル画面で、ニューゲーム／コンティニューを選択するウィンドウです。
     *
     * @class
     */
    if (SelectOnlyNewGame) {
        Window_TitleCommand.prototype.selectLast = function() {
            this.selectSymbol('newGame');
        };
    }

    /**
     * タイトル画面の処理を行うクラスです。
     *
     * @class
     */
    if (FixedTitle) {
        /**
         * ゲームタイトルの描画
         */
        Scene_Title.prototype.drawGameTitle = function() {
            const x = 20;
            const y = Graphics.height / 4;
            const maxWidth = Graphics.width - x * 2;
            const text = FixedTitle;
            const bitmap = this._gameTitleSprite.bitmap;
            bitmap.fontFace = $gameSystem.mainFontFace();
            bitmap.outlineColor = "black";
            bitmap.outlineWidth = 8;
            bitmap.fontSize = 72;

            if (TitleColor !== 0) {
                bitmap.textColor = ColorManager.textColor(TitleColor);
            }

            bitmap.drawText(text, x, y, maxWidth, 48, "center");
        };
    } else {
        /**
         * ゲームタイトルの描画
         */
        Scene_Title.prototype.drawGameTitle = function() {
            const x = 20;
            const y = Graphics.height / 4;
            const maxWidth = Graphics.width - x * 2;
            const text = $dataSystem.gameTitle;
            const bitmap = this._gameTitleSprite.bitmap;
            bitmap.fontFace = $gameSystem.mainFontFace();
            bitmap.outlineColor = "black";
            bitmap.outlineWidth = 8;
            bitmap.fontSize = 72;

            if (TitleColor !== 0) {
                bitmap.textColor = ColorManager.textColor(TitleColor);
            }

            bitmap.drawText(text, x, y, maxWidth, 48, "center");
        };
    }

    /**
     * 前景の作成
     */
    const _Scene_Title_createForeground = Scene_Title.prototype.createForeground;
    Scene_Title.prototype.createForeground = function() {
        _Scene_Title_createForeground.apply(this, arguments);

        // サブタイトルの描画
        if (SubTitle) {
            this.drawSubTitle();
        }

        // バージョンの描画
        if (Version) {
            this.drawVersion();
        }
    };

    /**
     * サブタイトルの描画
     */
    Scene_Title.prototype.drawSubTitle = function() {
        const x = 20;
        const y = Graphics.height / 4 + 70;
        const maxWidth = Graphics.width - x * 2;
        const text = SubTitle;
        const bitmap = this._gameTitleSprite.bitmap;
        bitmap.outlineColor = 'black';
        bitmap.outlineWidth = 8;
        bitmap.fontSize = 36;
        bitmap.textColor = ColorManager.normalColor();
        bitmap.drawText(text, x, y, maxWidth, 48, 'center');
    };

    /**
     * バージョンの描画
     */
    Scene_Title.prototype.drawVersion = function() {
        const x = 12;
        const y = Graphics.height - 48;
        const maxWidth = Graphics.width - x * 2;

        let text = VersionName;
        if ($dataSystem.gameTitle.includes(VersionName)) {
            text += $dataSystem.gameTitle.split(VersionName)[VersionPos];
        }
        if (VersionId) {
            text += VersionIdName + $dataSystem.versionId;
        }

        const bitmap = this._gameTitleSprite.bitmap;
        bitmap.outlineColor = 'black';
        bitmap.outlineWidth = 8;
        bitmap.fontSize = 24;
        bitmap.textColor = ColorManager.normalColor();
        bitmap.drawText(text, x, y, maxWidth, 48);
    };
})();
