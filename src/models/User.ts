export class User {
    
    constructor(name: string) {
        if (!this.id) {
            this.id = name.replace(" ", "-").toLowerCase();
        }
        this.name = name;
    }

    id!: string;
    name!: string;
}