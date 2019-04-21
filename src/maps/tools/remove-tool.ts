import { Tool } from "./tool";
import { WorldSprite } from "../../assets/world-sprite";
import { IMapEditor } from "../imap-editor";

export class RemoveTool implements Tool {

    private tileSize: number;
    private worldSize: number;
    private hoverSprite: PIXI.Graphics;
    private mapEditor: IMapEditor;

    public constructor(tileSize: number, worldSize: number, mapEditorContainer: PIXI.Container, mapEditor: IMapEditor) {
        this.tileSize = tileSize;
        this.worldSize = worldSize;
        this.mapEditor = mapEditor;

        this.hoverSprite = new PIXI.Graphics;
        this.hoverSprite.beginFill(0xFF0000, 0.5);
        this.hoverSprite.drawRect(0,0, this.tileSize, this.tileSize);
        this.hoverSprite.endFill();
        this.hoverSprite.visible = false;
        mapEditorContainer.addChild(this.hoverSprite);
    }

    MouseMove(x: number, y: number, worldSprite: WorldSprite | undefined): void {
        if (worldSprite) {
            this.hoverSprite.visible = true;
            this.hoverSprite.position.set(worldSprite.x, worldSprite.y);
            this.hoverSprite.scale.set(worldSprite.width / this.tileSize, worldSprite.height / this.tileSize);
        } else {
            this.hoverSprite.visible = false;
        }
    }    

    MouseClick(x: number, y: number, worldSprite: WorldSprite | undefined): void {
        if (worldSprite) {
            this.mapEditor.RemoveMapTile(worldSprite);
            this.hoverSprite.visible = false;
        }
    }
    
    MouseLeve(): void {
        this.hoverSprite.visible = false;
    }
}