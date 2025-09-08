export class Storage {
    static set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
    
    static get(key: string): void {
        localStorage.getItem(key);
    }
    
    static remove(key: string): void {
        localStorage.removeItem(key);
    }
    
    static clear(): void {
        localStorage.clear();
    }
}