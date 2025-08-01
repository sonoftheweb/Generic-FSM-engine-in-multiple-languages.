import { FiniteStateMachine } from "../../src/core/fsm";
import { IFSMDefinition } from "../../src/core/types/app";

// define a simple FSM for testing the engine's core logic.
// this FSM checks if a string has an even or odd number of `1`s
const evenOddFsmDef: IFSMDefinition<string, string> = {
    states: ['EVEN', 'ODD'],
    alphabet: ['0', '1'],
    initialState: 'EVEN',
    finalStates: ['EVEN', 'ODD'],
    transitions: {
        EVEN: { '0': 'EVEN', '1': 'ODD' },
        ODD: { '0': 'ODD', '1': 'EVEN' },
    },
};

describe('FiniteStateMachine Core Engine', () => {
    let fsm: FiniteStateMachine<string, string>;

    beforeEach(() => {
      fsm = new FiniteStateMachine(evenOddFsmDef);
    });

    it('should be in the initial state before running', () => {
      // We access a private member for testing purposes.
      // In a real-world scenario, we might add a public getter if needed.
      expect((fsm as any).currentState).toBe('EVEN');
    });

    it('should correctly transition states and return the final state', () => {
      expect(fsm.run(['1', '0', '1'])).toBe('EVEN');
      expect(fsm.run(['1', '0', '1', '1'])).toBe('ODD');
      expect(fsm.run(['0', '0', '0'])).toBe('EVEN');
    });

    it('should reset to the initial state for each new run', () => {
      // First run
      fsm.run(['1', '1']);
      expect((fsm as any).currentState).toBe('EVEN');

      // Second run, should start from EVEN again, not the previous final state
      fsm.run(['1']);
      expect((fsm as any).currentState).toBe('ODD');
    });

    it('should handle an empty input sequence by returning the initial state', () => {
      expect(fsm.run([])).toBe('EVEN');
    });

    it('should throw an error for an invalid symbol not in the alphabet', () => {
      expect(() => fsm.run(['1', '2', '0'])).toThrow("Input symbol '2' is not in the FSM's alphabet.");
    });

    it('should throw an error if an initial state is not in the set of states', () => {
      const invalidDef = { ...evenOddFsmDef, initialState: 'UNKNOWN' };
      expect(() => new FiniteStateMachine(invalidDef)).toThrow("Initial state 'UNKNOWN' is not in the set of states.");
    });

    it('should throw an error if no transition is defined for a state-symbol pair', () => {
      const incompleteDef: IFSMDefinition<string, string> = {
        states: ['A', 'B'],
        alphabet: ['0', '1'],
        initialState: 'A',
        finalStates: ['B'],
        transitions: {
          A: { '0': 'B' }, // No transition for '1' from state 'A' 
          B: { '0': 'A', '1': 'B' },
        },
      };
      const testFsm = new FiniteStateMachine(incompleteDef);
      expect(() => testFsm.run(['1'])).toThrow("No transition defined for symbol '1' from state 'A'.");
    });
  });