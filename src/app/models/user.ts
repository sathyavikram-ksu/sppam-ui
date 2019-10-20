export class User {
    createdAt: number;
    updatedAt: number;
    id: number;
    name: string;
    email: string;
    password: string;

    constructor(name: string, email: string, password: string, id?: number) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = id;
    }
}