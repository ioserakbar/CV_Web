export class Experience {
    title!: string;
    company!: string;
    time!: string;
    description!: string;

    constructor(title: string,company: string, time: string, description: string){
        this.title = title;
        this.description = description;
        this.time = time;
        this.company = company;
    }
}