import { Tool } from "./tool";
import { WorldSprite } from "../../assets/world-sprite";
import { IMapEditor } from "../imap-editor";
import { WorldSpriteLoader } from "../../assets/world-sprite-loader";

export class AddTool implements Tool {

    private tileSize: number;
    private worldSize: number;
    private mapEditor: IMapEditor;
    private worldSpriteLoader: WorldSpriteLoader;

    private hoverSprite: PIXI.Container;
    private occupiedSprite: PIXI.Graphics;
    
    private currentWorldSprite: WorldSprite | undefined;
    private mapEditorContainer: PIXI.Container;

    public constructor(tileSize: number, worldSize: number, mapEditorContainer: PIXI.Container, mapEditor: IMapEditor, worldSpriteLoader: WorldSpriteLoader) {
        this.tileSize = tileSize;
        this.worldSize = worldSize;
        this.mapEditorContainer = mapEditorContainer;
        this.mapEditor = mapEditor;
        this.worldSpriteLoader = worldSpriteLoader;

        this.hoverSprite = new PIXI.Container;
        this.hoverSprite.visible = false;
        mapEditorContainer.addChild(this.hoverSprite);
        this.occupiedSprite = new PIXI.Graphics;
        this.occupiedSprite.beginFill(0xFF0000, 0.5);
        this.occupiedSprite.drawRect(0,0, this.tileSize, this.tileSize);
        this.occupiedSprite.endFill();
        this.occupiedSprite.visible = false;
        this.hoverSprite.addChild(this.occupiedSprite);
    }

    MouseMove(x: number, y: number, worldSprite: WorldSprite | undefined): void {
        if (this.currentWorldSprite) {
            this.hoverSprite.visible = true;
            this.currentWorldSprite.SetPosition(x - (x % this.tileSize), y - (y % this.tileSize));
            this.occupiedSprite.position.set(x - (x % this.tileSize), y - (y % this.tileSize));
            if (this.mapEditor.CanInsertMapTile(this.currentWorldSprite)) {
                this.occupiedSprite.visible = false;
            } else {
                this.occupiedSprite.visible = true;
            }
        }
    }    

    MouseClick(x: number, y: number, worldSprite: WorldSprite | undefined): void {
        if (this.currentWorldSprite) {
            if (this.mapEditor.CanInsertMapTile(this.currentWorldSprite)) {
                var newSprite = this.worldSpriteLoader.Load(this.currentWorldSprite.name);
                if (newSprite) {
                    newSprite.SetPosition(this.currentWorldSprite.x, this.currentWorldSprite.y);
                    this.mapEditor.InsertMapTile(newSprite);
                    this.hoverSprite.visible = false;
                }
            }
        }
    }
    
    MouseLeve(): void {
        this.hoverSprite.visible = false;
    }

    public SetCurrentTile(elementName: string) {
        let worldSprite = this.worldSpriteLoader.Load(elementName);
        if (worldSprite) {
            if (this.currentWorldSprite) {
                this.hoverSprite.removeChild(this.currentWorldSprite.sprite);
            }

            this.currentWorldSprite = worldSprite;
            this.hoverSprite.addChildAt(worldSprite.sprite, 0);
            this.occupiedSprite.scale.set(worldSprite.width / this.tileSize, worldSprite.height / this.tileSize);
        } else {
            this.currentWorldSprite = undefined;
        }
    }
}