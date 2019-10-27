export class Effort {
    createdAt: number;
    updatedAt: number;
    id: number;
    fromDate: number;
    toDate: number;
    reqAnalysisHrs: number;
    designingHrs: number;
    codingHrs: number;
    testingHrs: number;
    projectManagementHrs: number;

    constructor(fromDate: number, toDate: number,
        reqAnalysisHrs: number, designingHrs: number,
        codingHrs: number, testingHrs: number, projectManagementHrs: number) {
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.reqAnalysisHrs = reqAnalysisHrs;
        this.designingHrs = designingHrs;
        this.codingHrs = codingHrs;
        this.testingHrs = testingHrs;
        this.projectManagementHrs = projectManagementHrs;
    }
}