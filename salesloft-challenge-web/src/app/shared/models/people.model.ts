import { IDeserializable } from './deserializable.interface';

export class People implements IDeserializable {
    id?: number;
    displayName?: string;
    emailAddress?: string;
    title?: string;

    constructor(id: number, displayName: string, emailAddress: string, title: string) {
        this.id = id;
        this.displayName = displayName;
        this.emailAddress = emailAddress;
        this.title = title;
    }

    /**
     * @author Jairo Juvenal Escobar Calzada
     * @description Object deserialization for any model
     * @param input JSON to be mapped on the model
     * @returns Url
     */
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
