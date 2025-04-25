export interface Education {
    id: number;
    institution_name: string;
    degree: string;
    locality: string;
    start_date: Date;
    end_date?: Date;
    created_at?: Date;
    updated_at?: Date;
}
