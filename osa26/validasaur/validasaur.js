import { validate, required, isNumber } from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

const validationRules = {
    age: [required, isNumber]
};

const data = {
    age: '22'
};

const [passes, errors] = await validate(data, validationRules);

if (passes) {
    console.log('No validation errors.');
} else {
    console.log(errors);
}