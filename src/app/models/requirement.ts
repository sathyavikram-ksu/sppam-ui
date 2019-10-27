export class Requirement {
    createdAt: number;
    updatedAt: number;
    id: number;
    description: string;
    type: RequirementType;

    constructor(description: string, type: RequirementType) {
        this.description = description;
        this.type = type;
    }
}

export enum RequirementType {
    FUNCTIONAL = 0,
    NONFUNCTIONAL = 1
}