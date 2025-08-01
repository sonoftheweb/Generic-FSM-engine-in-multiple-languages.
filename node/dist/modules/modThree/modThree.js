"use strict";
/**
 * This function acts as the clean, user-friendly interface for our solution.
 * It encapsulates all the implementation details. Someone using this function doesn't need to know anything about state machines;
 * they just call modThree("1101") and get 1 back. This file is the "glue" that:
 * - Creates an instance of the FSM engine.
 * - Tells the engine to use the mod-three rules.
 * - Prepares the input string for the engine.
 * - Translates the engine's final state (e.g., 'S2') into the required numerical output (2)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.modThree = modThree;
const modThree_fsm_1 = require("./modThree.fsm");
const fsm_1 = require("../../core/fsm");
// mapping from the final state fo the FSm to the numerical remainder.
const stateToRemainderMap = {
    S0: 0,
    S1: 1,
    S2: 2,
};
/**
 * Instance of our FSM engine, configured specifically for the mod-three problem.
 */
const modThreeFsm = new fsm_1.FiniteStateMachine(modThree_fsm_1.modThreeFsmDefinition);
/**
 * Computes the remainder of a binary integer when divided by three.
 *
 * This function serves as a user-friendly wrapper around the pre-configured
 * FSM engine. It handles string-to-array conversion and maps the
 * final state to its corresponding numerical value.
 *
 * @param binaryString String representing an unsigned binary integer (e.g., "1101").
 * @returns number The remainder (0, 1, or 2).
 */
function modThree(binaryString) {
    if (binaryString.length === 0) {
        // The value of an empty string is 0. 0 mod 3 = 0.
        return 0;
    }
    // Convert the input string into an array of characters that our FSM can process.
    const inputArray = binaryString.split('');
    // Run the FSM with the input.
    const finalState = modThreeFsm.run(inputArray);
    // Convert the final state to its numerical representation.
    return stateToRemainderMap[finalState];
}
