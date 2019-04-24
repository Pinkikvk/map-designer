import * as PIXI from "pixi.js";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from "vue";

import { WorldSpriteLoader } from "./assets/world-sprite-loader";
import { MapBuilder } from "./maps/map-builder";

import worldAssetsDefinitions from "../assets/world-assets-definitions.json";
import map1 from "../maps/map1.json";
import { WorldAssetDefinition } from "./assets/world-asset-definition";
import { GridManager } from "./maps/grid-manager";
import { MapEditor } from "./maps/map-editor";

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
let pixiApp = new PIXI.Application({width: 960, height: 960});
let mainContainer = new PIXI.Container;
pixiApp.stage.scale.set(2,2);
pixiApp.stage.addChild(mainContainer);
document.getElementsByClassName("canvas-placeholder")[0].appendChild(pixiApp.view);



WorldSpriteLoader.CreateLoader(worldAssetsDefinitions).then((loader) => {

    let mapEditor = new MapEditor(pixiApp, loader, 16, 30);
    var vueApp = new Vue({
        el: "#vue-app",
        data: {
            mapEditor: mapEditor,
            gridVisible: true,
            worldAssets: worldAssetsDefinitions,
            selectedWorldAssetName: "",
            currentMode: "Select"
        },
        methods: {
            showGrid: function () {
                this.gridVisible = true;
                this.mapEditor.gridManager.ShowGrid();
            },
            hideGrid: function () {
                this.gridVisible = false;
                this.mapEditor.gridManager.HideGrid();
            },
            selectTile: function(assetName: string) {
                this.selectedWorldAssetName = assetName;
                this.mapEditor.addTool.SetCurrentTile(assetName);
                this.mapEditor.selectedTool = this.mapEditor.addTool;
                this.currentMode = "Add";
                console.log(assetName);
            },
            selectTool: function() {
                this.mapEditor.selectedTool = this.mapEditor.selectTool;
                this.currentMode = "Select";
            },
            removeTool: function() {
                this.mapEditor.selectedTool = this.mapEditor.removeTool;
                this.currentMode = "Remove";
            },
            save: function() {
                this.mapEditor.SaveMapToFile();
            },
            load: function(evt: any) {
                let file = <File>evt.target.files[0];
                if (!!file) {
                    this.mapEditor.LoadMapFromFile(file);
                }
            }
        }
    })

    document.getElementById('filePicker')!.addEventListener('change', vueApp.load.bind(vueApp), false);

    mapEditor.LoadMap(map1);
});