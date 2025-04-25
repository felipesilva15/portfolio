import { ContactStatus } from "../shared/enums/contact-status";

export interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: ContactStatus;
    created_at?: Date;
    updated_at?: Date;
}
