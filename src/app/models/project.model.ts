import { ProjectStatus } from "../shared/enums/project-status";
import { Tag } from "./tag.model";

export interface Project {
    id: number;
    title: string;
    description: string;
    completion_date?: Date;
    thumbnail_url: string;
    status: ProjectStatus;
    tags: Array<Tag>;
    created_at?: Date;
    updated_at?: Date;
}
