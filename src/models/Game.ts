export class Game {
    constructor(json: string) {
        var parsed = JSON.parse(json);
        this.id = parsed["Id"];
        this.winner = parsed["Winner"];
        this.states = parsed["States"];
    }

    id!: number;
    winner!: string | null;
    states!: string[][];
}