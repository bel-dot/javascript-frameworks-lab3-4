export interface IBook {
    name: string,
    author: string,
    releaseYear: number,
}

export class Book implements IBook {
    name: string;
    author: string;
    releaseYear: number;
    
    constructor(name: string, author: string, releaseYear: number) {
        this.name = name;
        this.author = author;
        this.releaseYear = releaseYear;
    }
}

export interface IUser {

}

export class User implements IUser {

}
