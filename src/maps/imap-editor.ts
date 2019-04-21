import { WorldSprite } from "../assets/world-sprite";

export interface IMapEditor {
    RemoveMapTile(worldSprite: WorldSprite): void;
    CanInsertMapTile(worldSprite: WorldSprite): boolean;
    InsertMapTile(worldSprite: WorldSprite): void;
}