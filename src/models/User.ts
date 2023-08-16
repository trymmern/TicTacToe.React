export class User {
    
    constructor(name: string) {
        if (!this.id) {
            this.id = name.replaceAll(" ", "-").toLowerCase();
        }
        this.name = name;
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)]
    }

    id!: string;
    name!: string;
    color!: string;

    private colors = [
        "#FF4500", "#32CD32", "#1E90FF", "#FFD700", "#9932CC",
        "#00CED1", "#FFA500", "#8B008B", "#006400", "#8A2BE2",
        "#FF6347", "#FF8C00", "#696969", "#20B2AA", "#8B0000",
        "#800000", "#4169E1", "#9932CC", "#228B22", "#808080",
        "#FF69B4", "#DC143C", "#483D8B", "#87CEEB", "#008000",
        "#00CED1", "#008080", "#2E8B57", "#9400D3", "#A0522D"
      ];
}