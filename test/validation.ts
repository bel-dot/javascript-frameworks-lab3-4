import * as assert from "assert";
import { describe, it } from "mocha";
import { JSDOM } from "jsdom";
import { Validation } from "../src/validation";

describe("Validation", function () {
    describe("#validateForm()", function () {
        it("should return false for invalid form", function () {
            // Create a mock form element
            const dom = new JSDOM(`<!DOCTYPE html><form></form>`);
            const form = dom.window.document.querySelector(
                "form",
            ) as HTMLFormElement;
            const input = dom.window.document.createElement("input");
            input.setAttribute("required", "true");
            form.appendChild(input);

            // The form is invalid because the required input is empty

            const object = Validation.getInstance();
            const result = object.validateForm(form);
            assert.strictEqual(result, false);
        });

        it("should return true for valid form", function () {
            // Create a mock form element
            const dom = new JSDOM(`<!DOCTYPE html><form></form>`);
            const form = dom.window.document.querySelector(
                "form",
            ) as HTMLFormElement;
            const input = dom.window.document.createElement("input");
            input.setAttribute("required", "true");
            input.value = "Some value"; // Fill the required input
            form.appendChild(input);

            // The form is valid because the required input is filled
            const object = Validation.getInstance();
            const result = object.validateForm(form);
            assert.equal(result, true);
        });
    });
});
