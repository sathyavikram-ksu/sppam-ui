import { User } from './user';

export class Project {
    createdAt: number;
    updatedAt: number;
    id: number;
    name: string;
    description: string;
    owner: User;
    teamMembers: User[];

    constructor(name: string, description: string, owner: User, teamMembers: User[]) {
        this.name = name;
        this.description = description;
        this.owner = owner;
        this.teamMembers = teamMembers;
    }
}