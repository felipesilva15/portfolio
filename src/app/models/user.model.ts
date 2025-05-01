import { Link } from "./link.model";

export interface User {
    id: number;
    name: string;
    email: string;
    job_title: string;
    avatar_url: string;
    phone_number: string;
    birth_date: Date;
    locality: string;
    links: Link[];
    created_at?: Date;
    updated_at?: Date;
}
