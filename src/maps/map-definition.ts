export interface MapDefinition {
    tiles: MapTileDefinition[];
}

export interface MapTileDefinition {
    x: number;
    y: number;
    assetName: string;
}