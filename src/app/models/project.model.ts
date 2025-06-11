import { ProjectStatus } from "../shared/enums/project-status";
import { ProjectType } from "./project-type.model";
import { Tag } from "./tag.model";
import { Technology } from "./technology.model";

export interface Project {
    id: number;
    title: string;
    description: string;
    short_description?: string;
    completion_date?: Date;
    thumbnail_url: string;
    status: ProjectStatus;
    github_url: string;
    url: string;
    project_type?: ProjectType;
    tags: Tag[];
    technologies: Technology[];
    created_at?: Date;
    updated_at?: Date;
}
