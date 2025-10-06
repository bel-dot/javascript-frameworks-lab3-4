import * as assert from "assert";
import { describe, it } from "mocha";
import { Validation } from "../src/validation";

describe("Validation", function () {
    describe("#validateForm()", function () {
        it("should return false for invalid form", function () {
            // Create a mock form element
            const form = document.createElement("form");
            const input = document.createElement("input");
            input.setAttribute("required", "true");
            form.appendChild(input);

            // The form is invalid because the required input is empty

            const object = Validation.getInstance();
            const result = object.validateForm(form);
            assert.strictEqual(result, false);
        });

        it("should return true for valid form", function () {
            // Create a mock form element
            const form = document.createElement("form");
            const input = document.createElement("input");
            input.setAttribute("required", "true");
            input.value = "Valid Input";
            form.appendChild(input);

            // The form is valid because the required input is filled
            const object = Validation.getInstance();
            const result = object.validateForm(form);
            assert.strictEqual(result, true);
        });
    });
});
