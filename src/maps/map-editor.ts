import { WorldSprite } from "../assets/world-sprite";
import { GridManager } from "./grid-manager";
import { WorldAssetDefinition } from "../assets/world-asset-definition";
import { WorldSpriteLoader } from "../assets/world-sprite-loader";
import { MapBuilder } from "./map-builder";
import { MapDefinition } from "./map-definition";
import _ from "lodash";
import { Tool } from "./tools/tool";
import { SelectTool } from "./tools/select-tool";
import { RemoveTool } from "./tools/remove-tool";
import { IMapEditor } from "./imap-editor";
import { AddTool } from "./tools/add-tool";

export class MapEditor implements IMapEditor {

    private app: PIXI.Application;
    private worldSpriteLoader: WorldSpriteLoader
    private tileSize: number;
    private worldSize: number;
    private mapEditorContainer: PIXI.Container;
    private mapTiles: WorldSprite[] = [];
    private mapTilesContainer: PIXI.Container;
    private tools: Tool[] = [];
    
    gridManager: GridManager;

    selectedTool: Tool;
    selectTool: SelectTool;
    removeTool: RemoveTool;
    addTool: AddTool;


    public constructor(app: PIXI.Application, worldSpriteLoader: WorldSpriteLoader, tileSize: number, worldSize: number) {
        this.app = app;
        this.worldSpriteLoader = worldSpriteLoader;
        this.tileSize = tileSize;
        this.worldSize = worldSize;

        this.mapEditorContainer = new PIXI.Container;
        app.stage.addChild(this.mapEditorContainer);

        this.mapEditorContainer.addChild(this.BuildBackground());

        this.mapTilesContainer = new PIXI.Container;
        this.mapEditorContainer.addChild(this.mapTilesContainer);

        this.selectTool = new SelectTool(this.tileSize, this.worldSize, this.mapEditorContainer, this);
        this.tools.push(this.selectTool);
        this.removeTool = new RemoveTool(this.tileSize, this.worldSize, this.mapEditorContainer, this);
        this.tools.push(this.removeTool);
        this.addTool = new AddTool(this.tileSize, this.worldSize, this.mapEditorContainer, this, this.worldSpriteLoader);
        this.tools.push(this.addTool);

        this.selectedTool = this.selectTool;

        this.gridManager = new GridManager(tileSize, worldSize);
        this.mapEditorContainer.addChild(this.gridManager.GetGrid());

        this.app.view.addEventListener("mousemove", this.MouseOver.bind(this));
        this.app.view.addEventListener("mouseup", this.MouseClick.bind(this));
        this.app.view.addEventListener("mouseleave", this.MouseLeave.bind(this));
    }

    private BuildBackground(): PIXI.Graphics {
        let ocena = new PIXI.Graphics;
        ocena.beginFill(0x41467E, 1);
        ocena.drawRect(0,0, this.tileSize * this.worldSize, this.tileSize * this.worldSize);
        ocena.endFill();
        return ocena;
    }

    public LoadMap(mapDefinition: MapDefinition, worldAssetsDefinitions: WorldAssetDefinition[]) {
        let mapBuilder = new MapBuilder(this.worldSpriteLoader, this.tileSize, this.worldSize);
        this.mapTiles = mapBuilder.BuildMapTiles(mapDefinition);
        _.forEach(this.mapTiles, mt => this.mapTilesContainer.addChild(mt.sprite));
    }

    public RemoveMapTile(worldSprite: WorldSprite): void {
        _.remove(this.mapTiles, worldSprite);
        this.mapTilesContainer.removeChild(worldSprite.sprite);
    }

    public InsertMapTile(worldSprite: WorldSprite): void {
        if (this.CanInsertMapTile(worldSprite)) {
            this.mapTiles.push(worldSprite);
            this.mapTilesContainer.addChild(worldSprite.sprite);
        }
    }

    public CanInsertMapTile(worldSprite: WorldSprite): boolean {
        for (let x = 0; x < worldSprite.width / this.tileSize; x++) {
            for (let y = 0; y < worldSprite.height / this.tileSize; y++) {
                if (this.FindSpriteAtPosition(worldSprite.x + x * this.tileSize, worldSprite.y + y * this.tileSize)) {
                    return false;
                }
            }
        }
        return true;
    }

    private MouseOver(mouseEvent: MouseEvent) {
        let x = this.CalculateMouseX(mouseEvent);
        let y = this.CalculateMouseY(mouseEvent);;
        console.log(`x: ${x} y: ${y}`);

        let sprite = this.FindSpriteAtPosition(x, y);
        this.selectedTool.MouseMove(x, y, sprite);
    }

    private MouseClick(mouseEvent: MouseEvent) {
        let x = this.CalculateMouseX(mouseEvent);
        let y = this.CalculateMouseY(mouseEvent);;
        console.log(`x: ${x} y: ${y}`);

        let sprite = this.FindSpriteAtPosition(x, y);
        this.selectedTool.MouseClick(x, y, sprite);
    }

    private MouseLeave(mouseEvent: MouseEvent) {
        this.selectedTool.MouseLeve();
    }

    private CalculateMouseX(mouseEvent: MouseEvent): number {
        return (mouseEvent.x - this.app.view.getBoundingClientRect().left) / 2;
    }

    private CalculateMouseY(mouseEvent: MouseEvent): number {
        return (mouseEvent.y - this.app.view.getBoundingClientRect().top) / 2;
    }

    private FindSpriteAtPosition(x: number, y: number): WorldSprite {
        let sprite = <WorldSprite>_.find(this.mapTiles, t =>  t.x <= x && t.x + t.width - 1  >= x 
                && t.y <= y && t.y + t.height -1  >= y);
        
        return sprite;
    }
}