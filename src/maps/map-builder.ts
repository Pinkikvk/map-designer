import { WorldSpriteLoader } from "../assets/world-sprite-loader";
import { MapDefinition, MapTileDefinition } from "./map-definition";
import _ from "lodash";
import { WorldSprite } from "../assets/world-sprite";

export class MapBuilder {

    private worldSpriteLoader: WorldSpriteLoader
    private tileSize: number;
    private worldSize: number;

    public constructor(worldSpriteLoader: WorldSpriteLoader, tileSize: number, worldSize: number) {
        this.worldSpriteLoader = worldSpriteLoader;
        this.tileSize = tileSize;
        this.worldSize = worldSize;
    }

    public BuildMapTiles(mapDefinition: MapDefinition): WorldSprite[] {
        let usedTiles = _.times(this.worldSize, () => _.times(this.worldSize, _.constant(false)));
        let mapTiles: WorldSprite[] = [];

        _.forEach(mapDefinition.tiles, tile => this.AddTile(tile, usedTiles, mapTiles));
        //this.FillEmptyTiles(usedTiles, mapTiles);

        return mapTiles;
    }

    private AddTile(mapTileDefinition: MapTileDefinition, usedTiles: Boolean[][], mapTiles: WorldSprite[]) {
        let asset = this.worldSpriteLoader.Load(mapTileDefinition.assetName);
        if (asset) {
            asset.SetPosition(mapTileDefinition.x * this.tileSize, mapTileDefinition.y * this.tileSize);
            mapTiles.push(asset);

            for (let x = 0; x < asset.width / this.tileSize; x++) {
                for (let y = 0; y < asset.height / this.tileSize; y++) {
                    usedTiles[mapTileDefinition.x + x][mapTileDefinition.y + y] = true;
                }
            }
        }
    }

    private FillEmptyTiles(usedTiles: Boolean[][], mapTiles: WorldSprite[]) {
        for (let x = 0; x < this.worldSize; x++) {
            for (let y = 0; y < this.worldSize; y++) {
                if (usedTiles[x][y] === false) {
                    let asset = this.worldSpriteLoader.Load("ocean");
                    if (asset) {
                        asset.SetPosition(x * this.tileSize, y * this.tileSize);
                        mapTiles.push(asset);
                    }
                }
            }
        }
    }
}