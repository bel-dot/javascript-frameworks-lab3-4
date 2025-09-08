export interface IBook {
    getName(): string,
    getAuthor(): string,
    getReleaseYear(): number,
}

export class Book implements IBook {
    private name: string;
    private author: string;
    private releaseYear: number;
    
    constructor(name: string, author: string, releaseYear: number) {
        this.name = name;
        this.author = author;
        this.releaseYear = releaseYear;
    }
    
    getName(): string {
        return this.name;
    }

    getAuthor(): string {
        return this.author;
    }

    getReleaseYear(): number {
        return this.releaseYear;
    }
}

export interface IUser {
    getId(): number,
    getName(): string,
    getEmail(): string,
}

export class User implements IUser {
    private id: number;
    private name: string;
    private email: string;

    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    
    getId(): number {
        return this.id;
    }
    
    getName(): string {
        return this.name;
    }
    
    getEmail(): string {
        return this.email;
    }
}
