import { WorldSprite } from "./world-sprite";
import { WorldAssetDefinition } from "./world-asset-definition";
import _ from "lodash";

export class WorldSpriteLoader {

    private definitions: WorldAssetDefinition[];

    private constructor(definitions: WorldAssetDefinition[]){
        this.definitions = definitions;
    }

    static CreateLoader(definitions: WorldAssetDefinition[]): Promise<WorldSpriteLoader> {
        return new Promise<WorldSpriteLoader>((resolve, reject) =>{
            let frames = _.map(_.flatten(_.map(definitions, d => d.frames)), f => "assets/world/" + f);

            PIXI.loader.add(frames).load(() => {
                return resolve(new WorldSpriteLoader(definitions));
            })
        });
        
    }

    public Load(name: string): WorldSprite | undefined {
        let definition = _.find(this.definitions, d => d.name === name);
        if (definition) {
            return this.Build(definition);
        }
        return undefined;
    }

    private Build(definition: WorldAssetDefinition): WorldSprite {
        let frames = _.map(definition.frames, f => "assets/world/" + f);
        let animationFrames = _.concat(frames, _.reverse(_.clone(frames)));

        let textures = _.map(animationFrames, f => PIXI.loader.resources[f].texture);
        let sprite = this.BuildSprite(textures);

        return new WorldSprite(definition, sprite);
    }

    private BuildSprite(textures: PIXI.Texture[]): PIXI.Sprite {
        let sprite = new PIXI.extras.AnimatedSprite(textures);
        sprite.animationSpeed = 2/60;
        sprite.play();
        return sprite;
    }
}