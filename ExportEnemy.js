/*------------------------------
Copyright (c) 2025 PotatoDragon
Released under the MIT License.
https://opensource.org/license/mit
------------------------------*/

/*:
@target MZ
@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Battle/Enemy/ExportEnemy.js
@plugindesc Enemy character image output Ver1.0.0 (2025/1/1)
@author PotatoDragon
@license MIT License

@help
English Help Translator: munokura
Please check the URL below for the latest version of the plugin.
URL https://github.com/pota-gon/RPGMakerMZ/wiki
-----

## Overview
When the game starts, enemy character images (with hue) are output to the
specified folder.

## Usage
1. Set the output path in the "ExportPath" parameter.
2. Start the game.
3. The enemy character images (with hue) will be output to the folder
specified in the "ExportPath" parameter.

### Parameter Description

#### Output Path (ExportPath)
Path to output enemy character images. The default is /export.

@param ExportPath
@text Output Path
@desc Path to output enemy character images
@type string
@default /export
*/

/*:ja
@plugindesc
敵キャラ画像出力 Ver1.0.0(2025/1/1)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/refs/heads/main/plugins/Battle/Enemy/ExportEnemy.js
@target MZ
@author ポテトードラゴン

・アップデート情報
Ver1.0.0: 公開

Copyright (c) 2025 ポテトードラゴン
Released under the MIT License.
https://opensource.org/license/mit

@help
## 概要
ゲーム起動時に敵キャラの画像(色相付き)を指定のフォルダに出力します

## 使い方
1. パラメータの「出力パス(ExportPath)」で出力するパスを設定
2. ゲームを起動します
3. パラメータの「出力パス(ExportPath)」で
   指定したフォルダに敵キャラ画像(色相付き)が出力されます

### パラメータ説明

#### 出力パス(ExportPath)
敵キャラの画像を出力するパス。デフォルトは /export

@param ExportPath
@type string
@text 出力パス
@desc 敵キャラの画像を出力するパス
@default /export
*/
(() => {
    'use strict';

    // ベースプラグインの処理
    function Potadra_getPluginName(extension = 'js') {
        const reg = new RegExp(".+\/(.+)\." + extension);
        return decodeURIComponent(document.currentScript.src).replace(reg, '$1');
    }
    function Potadra_getDirPath(dir) {
        if (StorageManager.isLocalMode()) {
            const path = require("path");
            const base = path.dirname(process.mainModule.filename);
            return path.join(base, dir + '/');
        } else {
            return dir + '/';
        }
    }

    // パラメータ用変数
    const plugin_name = Potadra_getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用定数
    const ExportPath = String(params.ExportPath || '/export');

    /**
     * 開始処理
     */
    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.apply(this, arguments);

        if (StorageManager.isLocalMode()) {
            // バックアップフォルダ作成
            const backupDirPath = Potadra_getDirPath(ExportPath);
            StorageManager.fsMkdir(backupDirPath);

            for (let i = 1; i < $dataEnemies.length; i++) {
                const enemyId = i;
                if ($dataEnemies[enemyId]) {
                    const enemy = new Game_Enemy(enemyId, 200, 200);
                    const name = enemy.battlerName();
                    const hue = enemy.battlerHue();

                    // 画像が指定されていないデータはスキップ
                    if (!name) continue;

                    const path    = require("path");
                    const file    = backupDirPath + name + ".png";
                    const dirName = path.dirname(file);

                    // サブフォルダを作成
                    StorageManager.fsMkdir(dirName);

                    let bitmap;
                    if ($gameSystem.isSideView()) {
                        bitmap = ImageManager.loadSvEnemy(name);
                    } else {
                        bitmap = ImageManager.loadEnemy(name);
                    }

                    bitmap.addLoadListener(() => {
                        if (bitmap.canvas) {
                            const canvas = bitmap.canvas;
                            const context = canvas.getContext('2d');
                            context.filter = `hue-rotate(${hue}deg)`;
                            context.drawImage(canvas, 0, 0);

                            const fs = require('fs');
                            const exportPath = dirName + '/' + path.basename(name) + hue + ".png";
                            if (!fs.existsSync(exportPath)) {
                                const data = canvas.toDataURL('img/png').replace(/^.*,/, '');
                                const buffer = Buffer.from(data, 'base64');
                                fs.writeFileSync(exportPath, buffer);
                            }
                        }
                    });
                }
            }
        }
    };
})();
