import * as PIXI from "pixi.js";

import { WorldSpriteLoader } from "./assets/world-sprite-loader";
import { MapBuilder } from "./maps/map-builder";

import worldAssetsDefinitions from "../assets/world-assets-definitions.json";
import map1 from "../maps/map1.json";
import { WorldAssetDefinition } from "./assets/world-asset-definition";

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
let app = new PIXI.Application({width: 512, height: 512});

document.body.appendChild(app.view);

let grass: PIXI.Sprite;

WorldSpriteLoader.CreateLoader(worldAssetsDefinitions).then((loader) => {
    let mapBuilder = new MapBuilder(loader, 16);
    let mapContainer = mapBuilder.BuildMap(map1);
    mapContainer.scale.set(2,2);
    app.stage.addChild(mapContainer);
});

// PIXI.loader
//     .add("assets/world/land/grass_center_A_f1.png")
//     .add("assets/world/land/grass_center_A_f2.png")
//     .add("assets/world/land/grass_center_A_f3.png")
//     .load(()=> {
//         for(let x = 0; x<8; x++){
//             for(let y = 0; y<8; y++){
//                 let grass =getGrassSprite();
//                 grass.position.set(x*32, y*32);
//                 app.stage.addChild(grass);
//             }
//         }
//     });

// function getGrassSprite(): PIXI.extras.AnimatedSprite {
//     const grassTextures = [];
//     grassTextures.push(PIXI.loader.resources["assets/world/land/grass_center_A_f1.png"].texture);
//     grassTextures.push(PIXI.loader.resources["assets/world/land/grass_center_A_f2.png"].texture);
//     grassTextures.push(PIXI.loader.resources["assets/world/land/grass_center_A_f3.png"].texture);
//     grassTextures.push(PIXI.loader.resources["assets/world/land/grass_center_A_f2.png"].texture);
//     var grass = new PIXI.extras.AnimatedSprite(grassTextures);
//     grass.scale.set(2, 2);
//     grass.animationSpeed = 2/60;
//     grass.play();

//     return grass;
// }
