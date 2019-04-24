import { MapDefinition } from "./map-definition";

export class MapReader {

    public static Read(file: File): Promise<MapDefinition> {

        return new Promise<MapDefinition>((resolve, reject) => {
            let fileReader = new FileReader();
            
            fileReader.onloadend = () => {
                let json = <string>fileReader.result;
                resolve(<MapDefinition>JSON.parse(json));
            }
            
            fileReader.readAsText(file);
        })
    }
}