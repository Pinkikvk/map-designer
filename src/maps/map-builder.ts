import { WorldSpriteLoader } from "../assets/world-sprite-loader";
import { MapDefinition, MapTileDefinition } from "./map-definition";
import _ from "lodash";

export class MapBuilder {

    private worldSpriteLoader: WorldSpriteLoader
    private tileSize: number;

    public constructor(worldSpriteLoader: WorldSpriteLoader, tileSize: number) {
        this.worldSpriteLoader = worldSpriteLoader;
        this.tileSize = tileSize;
    }

    public BuildMap(mapDefinition: MapDefinition): PIXI.Container {
        let usedTiles = _.times(16, () => _.times(16, _.constant(false)));
        let mapContainer = new PIXI.Container;

        _.forEach(mapDefinition.tiles, tile => this.AddTile(tile, usedTiles, mapContainer));
        this.FillEmptyTiles(usedTiles, mapContainer);

        return mapContainer;
    }

    private AddTile(mapTileDefinition: MapTileDefinition, usedTiles: Boolean[][], mapContainer: PIXI.Container) {
        let asset = this.worldSpriteLoader.Load(mapTileDefinition.assetName);
        if (asset) {
            asset.sprite.position.set(mapTileDefinition.x * this.tileSize, mapTileDefinition.y * this.tileSize);
            mapContainer.addChild(asset.sprite);

            for (let x = 0; x < asset.width / this.tileSize; x++) {
                for (let y = 0; y < asset.height / this.tileSize; y++) {
                    usedTiles[mapTileDefinition.x + x][mapTileDefinition.y + y] = true;
                }
            }
        }
    }

    private FillEmptyTiles(usedTiles: Boolean[][], mapContainer: PIXI.Container) {
        for (let x = 0; x < 16; x++) {
            for (let y = 0; y < 16; y++) {
                if (usedTiles[x][y] === false) {
                    let asset = this.worldSpriteLoader.Load("ocean");
                    if (asset) {
                        asset.sprite.position.set(x * this.tileSize, y * this.tileSize);
                        mapContainer.addChild(asset.sprite);
                    }
                }
            }
        }
    }
}