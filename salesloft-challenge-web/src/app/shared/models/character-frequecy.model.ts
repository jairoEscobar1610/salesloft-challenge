import { IDeserializable } from './deserializable.interface';

export class CharacterFrequency implements IDeserializable {
    key: string;
    frequency:number;

    constructor(key:string, frequency:number){
        this.key = key;
        this.frequency = frequency;
    }

    /**
     * @author Jairo Juvenal Escobar Calzada
     * @description Object deserialization for any model
     * @param input JSON to be mapped on the model
     * @returns Url
     */ 
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}