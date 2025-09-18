export class Library<T> {
    private objects: T[] = [];
    
    add(obj: T): void {
        this.objects.push(obj);
    }
    
    remove(obj: T): void {
        const index = this.objects.indexOf(obj);
        
        this.objects.splice(index, 1);
    }
    
    search(prop: string, predicate: () => string): T | undefined {
        return this.objects.find(predicate);
    }
}
