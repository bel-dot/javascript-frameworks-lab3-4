export class Library<T> {
    private _objects: T[];
    
    constructor(arr: T[] = []) {
        this._objects = arr;
    }
    
    get(): T[] {
        return this._objects;
    }
    
    add(obj: T): void {
        this._objects.push(obj);
    }
    
    remove(obj: T | undefined): void {
        if(obj != undefined) {
            const index = this._objects.indexOf(obj);
            
            this._objects.splice(index, 1);
        }
    }
    
    search(predicate: (obj: T) => boolean): T | undefined {
        return this._objects.find(predicate);
    }
}
