import { WorldAssetDefinition } from "./world-asset-definition";

export class WorldSprite {

    sprite: PIXI.Sprite;
    width: number;
    height: number;

    public constructor(definition: WorldAssetDefinition, sprite: PIXI.Sprite) {
        this.sprite = sprite;
        this.width = sprite.texture.width;
        this.height = sprite.texture.height;
    }

}