import { DESTRUCTION } from "dns";

export class Education{
    university!: string;
    uniLogo!: string;
    career!: string;
    description!: string;
    date!: string;
    degreeDate!: string | null;
    degree!: boolean;

    constructor(university: string, career: string, date: string, degree: boolean, degreeDate: string | null,uniLogo: string, description: string){
        this.university = university;
        this.career = career;
        this.date = date;
        this.degree = degree;
        this.degreeDate = degreeDate;
        this.uniLogo = uniLogo;
        this.description = description;
    }
    
}