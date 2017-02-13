export class Chicken {
    name: string;
    eggs: number;
    breed: string;


    constructor(name: string, eggs?: number, breed?: string) {
        this.name = name;
        if (eggs) {
            this.eggs = eggs;
        } else {
            this.eggs = 0;
        }
        if (breed) {
            this.breed = breed;
        } else {
            this.breed = "Leghorn";
        }

    }

    addEgg () {
        this.eggs++;
    }
    
    collectEggs() { 
        let collected = this.eggs;
        this.eggs = 0;
        return collected;
    }
}
