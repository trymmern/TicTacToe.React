import { Game } from "../models/Game";

export class ApiService {
    baseUrl: string = "http://localhost:5268";

    async getAll(): Promise<any> {
        const res = await fetch(this.baseUrl + `/Games`);
        return await res.json() as Promise<Game[]>;
    }

    async get(id: number): Promise<any> {
        const res = await fetch(this.baseUrl + `/Games?id=${id}`);
        return await res.json() as Promise<Game>;
    }

    async create(): Promise<any> {
        const res = await fetch(this.baseUrl + `/Games`, {method: "POST"});
        return await res.json() as Promise<Game>
    }

    async update(id: number, state: string[], winner: string | null): Promise<any> {
        const options = {
            method: "POST",
            body: JSON.stringify({state, winner}),
            headers: {
                "Content-Type": "application/json"
            }
        };
        const res = await fetch(this.baseUrl + `/Games/Update?id=${id}`, options);
        return await res.json() as Promise<Game>;
    }

    async delete(id: number): Promise<any> {
        const options = {
            method: "DELETE"
        };
        const res = await fetch(this.baseUrl + `/Games?id=${id}`, options);
        return await res.json() as Promise<Game[]>
    }
}