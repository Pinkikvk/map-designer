import { WorldSprite } from "../../assets/world-sprite";

export interface Tool {
    MouseMove(x: number, y: number, worldSprite: WorldSprite | undefined): void;
    MouseClick(x: number, y: number, worldSprite: WorldSprite | undefined): void;
    MouseLeve(): void;
}