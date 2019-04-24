import { WorldAssetDefinition } from "./world-asset-definition";

export class WorldSprite {

    definition: WorldAssetDefinition;
    sprite: PIXI.Sprite;
    name: string;
    width: number;
    height: number;
    x: number;
    y: number;

    public constructor(definition: WorldAssetDefinition, sprite: PIXI.Sprite) {
        this.definition = definition;
        this.sprite = sprite;
        this.name = definition.name;
        this.width = sprite.texture.width;
        this.height = sprite.texture.height;
        this.x = 0
        this.y = 0;
    }

    public SetPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.sprite.position.set(x,y);
    }


}