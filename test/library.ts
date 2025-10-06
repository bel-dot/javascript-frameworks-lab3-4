import * as assert from "assert";
import { describe, it } from "mocha";
import { Library } from "../src/library.ts";

describe("Library", function () {
    describe("#remove(obj: T)", function () {
        it("should remove an object from the library", function () {
            const library = new Library<number>([1, 2, 3]);
            library.remove(2);
            const result = library.get();
            assert.deepStrictEqual(result, [1, 3]);
        });

        it("should do nothing if the object is not found", function () {
            const library = new Library<number>([1, 2, 3]);
            library.remove(4);
            const result = library.get();
            assert.deepStrictEqual(result, [1, 2, 3]);
        });
    });

    describe("#update(oldObj: T, newObj: T)", function () {
        it("should update an existing object in the library", function () {
            const library = new Library<number>([1, 2, 3]);
            library.update(2, 4);
            const result = library.get();
            assert.deepStrictEqual(result, [1, 4, 3]);
        });

        it("should do nothing if the old object is not found", function () {
            const library = new Library<number>([1, 2, 3]);
            library.update(5, 4);
            const result = library.get();
            assert.deepStrictEqual(result, [1, 2, 3]);
        });
    });

    describe("#search(predicate: (obj: T) => boolean)", function () {
        it("should return the first object that matches the predicate", function () {
            const library = new Library<number>([1, 2, 3, 4]);
            const result = library.search((x) => x > 2);
            assert.strictEqual(result, 3);
        });

        it("should return undefined if no object matches the predicate", function () {
            const library = new Library<number>([1, 2, 3]);
            const result = library.search((x) => x > 5);
            assert.strictEqual(result, undefined);
        });
    });
});
