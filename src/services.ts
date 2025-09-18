import {Book, User, IBook, IUser} from './models';
import {Library} from './library';
import { Storage } from './storage';

export class LibraryService {
    private _books: Library<Book>;
    private _users: Library<User>;
    private static _instance: LibraryService;
    
    public static getInstance(): LibraryService {
        if(!this._instance) this._instance = new LibraryService();
        
        return this._instance;
    }
    
    constructor() {
        const storageBooks = Storage.get('books');
        const storageUsers = Storage.get('users');
        
        this._books = new Library<Book>(JSON.parse(storageBooks ?? '[]'));
        this._users = new Library<User>(JSON.parse(storageUsers ?? '[]'));
        
        window.addEventListener('beforeunload', () => {
            Storage.set('books', JSON.stringify(this._books));
            Storage.set('users', JSON.stringify(this._users));
        })
    }
    
    public getBooks(): Book[] {
        return this._books.get();
    }
    
    public getUsers(): User[] {
        return this._users.get();
    }
    
    public addBook(book: Book): void {
        this._books.add(book);
    }
    
    public addUser(user: User): void {
        this._users.add(user);
    }

    public removeBook(bookName: string): void {
        this._books.remove(this._books.search(book => book.getName() === bookName));
    }
    
    public removeUser(userId: number): void {
        this._users.remove(this._users.search(user => user.getId() === userId));
    }

    public findBook(bookName: string): Book | undefined {
        return this._books.search(book => book.getName() === bookName);
    }
    
    public findUser(userId: number): User | undefined {
        return this._users.search(user => user.getId() === userId);
    }
}
