export interface Certification {
    id: number;
    title: string;
    institution_name: string;
    issued_date: Date;
    expiration_date?: Date;
    credential_id?: string;
    credential_url?: string;
    created_at?: Date;
    updated_at?: Date;
}
