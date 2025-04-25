export interface Experience {
    id: number;
    company_name: string;
    position: string;
    locality: string;
    description: string;
    start_date: Date;
    end_date?: Date;
    created_at?: Date;
    updated_at?: Date;
}
