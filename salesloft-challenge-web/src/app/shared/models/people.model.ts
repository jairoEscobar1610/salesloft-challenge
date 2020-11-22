import { IDeserializable } from './deserializable.interface';

export class People implements IDeserializable {
    id?: number;
    name?:string;
    email_address?: string;
    job_role?:string;

    constructor(id:number, name:string, email_address:string, job_role:string){
        this.id = id;
        this.name = name;
        this.email_address = email_address;
        this.job_role = job_role;
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