import { IDeserializable } from './deserializable.interface';

export class People implements IDeserializable {
    id?: number;
    display_name?:string;
    email_address?: string;
    title?:string;

    constructor(id:number, display_name:string, email_address:string, title:string){
        this.id = id;
        this.display_name = display_name;
        this.email_address = email_address;
        this.title = title;
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