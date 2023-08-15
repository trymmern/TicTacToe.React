export class User {
    
    constructor(name: string) {
        if (!this.id) {
            this.id = name.replaceAll(" ", "-").toLowerCase();
        }
        this.name = name;
    }

    id!: string;
    name!: string;
}