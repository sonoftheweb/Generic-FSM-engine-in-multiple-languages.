"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modThree_1 = require("./modules/modThree/modThree");
function runDemo() {
    console.log('--- Running FSM Mod-Three Demonstration ---');
    const testCases = [
        { binary: '1101', decimal: 13 }, // 13 mod 3 = 1
        { binary: '1110', decimal: 14 }, // 14 mod 3 = 2
        { binary: '1111', decimal: 15 },
        { binary: '100', decimal: 4 },
        { binary: '0', decimal: 0 },
        { binary: '', decimal: 0 },
    ];
    for (const test of testCases) {
        const result = (0, modThree_1.modThree)(test.binary);
        console.log(`modThree("${test.binary}") (decimal ${test.decimal}) => ${result}`);
    }
    console.log("--- Demonstration Complete ---");
}
runDemo();
