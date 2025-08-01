"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modThreeFsmDefinition = void 0;
/**
 * Specific FSM defeinition for the "modThree" problem
 * Object represents the 5-Tuple (Q, Σ, δ, q0, F)

  */
exports.modThreeFsmDefinition = {
    // Q: A finite set of states
    states: ['S0', 'S1', 'S2'],
    // Σ: A finite set of symbols, the alphabet
    alphabet: ['0', '1'],
    // q0: Ze initial state
    initialState: 'S0',
    // F: A set of accepting/final states
    finalStates: ['S0', "S1", "S2"],
    // δ: Le transition function
    transitions: {
        S0: { '0': 'S0', '1': 'S1' },
        S1: { '0': 'S2', '1': 'S0' },
        S2: { '0': 'S1', '1': 'S2' },
    }
};
