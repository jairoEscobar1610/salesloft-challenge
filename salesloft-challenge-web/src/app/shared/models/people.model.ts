import { IDeserializable } from './deserializable.interface';

export class People implements IDeserializable {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    last_contacted_at?: Date;
    last_replied_at?: Date;
    name?:string;
    first_name?: string;
    last_name?: string;
    display_name?: string;
    email_address?: string;
    full_email_address?: string;
    secondary_email_address?: string;
    personal_email_address?: string;
    phone?: string;
    phone_extension?: string;
    home_phone?: string;
    mobile_phone?: string;
    linkedin_url?: string;
    title?: string;
    city?: string;
    state?: string;
    country?: string;
    work_city?: string;
    work_state?: string;
    work_country?: string;
    crm_url?: string;
    crm_id?: string;
    crm_object_type?: string;
    owner_crm_id?: string;
    person_company_name?: string;
    person_company_website?: string;
    person_company_industry?: string;
    do_not_contact?: boolean;
    bouncing?: boolean;
    locale?: string;
    personal_website?: string;
    job_role?:string;
    twitter_handle?: string;
    last_contacted_type?: string;
    job_seniority?: string;
    custom_fields?: object;
    tags?: [];
    contact_restrictions?: [];
    counts?: object;
    account?: object;
    owner?: object;
    last_contacted_by?: object;
    import?: object;
    person_stage?: object;

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