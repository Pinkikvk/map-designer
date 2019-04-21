import _ from "lodash";

export class GridManager {

    private tileSize: number;
    private worldSize: number;
    private gridContainer: PIXI.Container;

    public constructor(tileSize: number, worldSize: number) {
        this.tileSize = tileSize;
        this.worldSize = worldSize;
        this.gridContainer = this.BuildGrid();
    }

    private BuildGrid(): PIXI.Container {
        let container = new PIXI.Container;

        _.times(this.worldSize - 1, (i) => {
            let horizontalLine = this.BuildHorizontalLine();
            horizontalLine.position.set(0, this.tileSize * (i + 1));
            container.addChild(horizontalLine);
            let verticalLine = this.BuildVerticalLine();
            verticalLine.position.set(this.tileSize * (i + 1), 0);
            container.addChild(verticalLine);
        })
        return container;
    }

    public GetGrid(): PIXI.Container {
        return this.gridContainer;
    }

    private BuildHorizontalLine(): PIXI.Graphics {
        return new PIXI.Graphics()
            .lineStyle(1, 0xFFFFFF, 0.25)
            .moveTo(0,0)
            .lineTo(this.tileSize * this.worldSize, 0);
    }

    private BuildVerticalLine(): PIXI.Graphics {
        return new PIXI.Graphics()
            .lineStyle(1, 0xFFFFFF, 0.25)
            .moveTo(0,0)
            .lineTo(0, this.tileSize * this.worldSize);
    }
}