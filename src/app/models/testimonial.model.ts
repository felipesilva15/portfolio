import { Sex } from "../shared/enums/sex";

export interface Testimonial {
    id: number;
    user_id: number;
    name: string;
    sex: Sex;
    date: Date;
    testimonial: string;
    original_url?: string;
    created_at?: Date;
    updated_at?: Date;
}
