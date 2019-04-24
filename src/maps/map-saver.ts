import { MapDefinition } from "./map-definition";

export class MapSaver {

    public static SaveMap(mapDefinition: MapDefinition): void {
        var json = JSON.stringify(mapDefinition);
        MapSaver.Download("map.json", json);
    }

    private static Download(filename: string, text: string) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);
    
        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }
    }

}