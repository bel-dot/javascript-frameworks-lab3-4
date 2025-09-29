export interface IBook {
    name: string,
    author: string,
    releaseYear: number
}

export class Book implements IBook {
    name: string;
    author: string;
    releaseYear: number;
    private borrower: number = 0;
    
    constructor(name: string, author: string, releaseYear: number) {
        this.name = name;
        this.author = author;
        this.releaseYear = releaseYear;
    }
    
    isBorrowed(): boolean {
        return this.borrower != 0;
    }
    
    borrow(borrowerId: number): void {
        this.borrower = borrowerId;
    }
    
    return(): void {
        this.borrower = 0;
    }
}

export interface IUser {
    id: number,
    name: string,
    email: string
}

export class User implements IUser {
    id: number;
    name: string;
    email: string;
    private borrowedBooks: Book[] = [];

    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    
    borrowBook(book: Book): boolean {
        if(this.borrowedBooks.length > 3 || book.isBorrowed()) {
            return false;
        }
        this.borrowedBooks.push(book);
        book.borrow(this.id);
        return true;
    }
    
    returnBook(book: Book): boolean {
        const index = this.borrowedBooks.indexOf(book);
        if(index != -1) {
            this.borrowedBooks.splice(index, 1);
            book.return();
            return true;
        }
        return false;
    }
}
