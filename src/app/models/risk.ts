export class Risk {
    createdAt: number;
    updatedAt: number;
    id: number;
    orderNumber: number;
    description: string;
    status: RiskStatus;
    type: RiskType;

    constructor(description: string, status: RiskStatus, type: RiskType) {
        this.description = description;
        this.status = status;
        this.type = type;
    }
}

export enum RiskStatus {
    OPEN = 0,
    INPROGRESS = 1,
    CLOSE = 2
}

export enum RiskType {
    LOW = 0,
    MEDIUM = 1,
    HIGH = 2,
    CRITICAL = 3
}