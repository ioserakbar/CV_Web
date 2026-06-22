export class Ability{
    name!: string;
    tools!: string[];

    constructor(name: string, tools: string[]){
        this.name = name;
        this.tools = tools;
    }
}