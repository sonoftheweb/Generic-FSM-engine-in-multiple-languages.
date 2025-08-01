import { IState, IAlphabet, IFSMDefinition } from "./types/app";

/**
 * A generic, reusable Finite State Machine engine.
 * It is initialized with a specific FSM definition and can run input sequences.
 *
 * @template TState The type used for states in this FSM instance.
 * @template TAlphabet The type used for the alphabet in this FSM instance.
 */
export class FiniteStateMachine<TState extends IState, TAlphabet extends IAlphabet> {
    private readonly definition: IFSMDefinition<TState, TAlphabet>;
    private currentState: TState;

    /**
     * Creates an instance of the FSM engine
     * @param definition The 5-tuple definition of the FSM to simulate.
     */
    constructor(definition: IFSMDefinition<TState, TAlphabet>) {
        this.definition = definition;

        // validate the initial state is part of the defined states
        if (!this.definition.states.includes(definition.initialState)) {
            throw new Error(`Initial state '${definition.initialState}' is not in the set of states.`)
        }
        this.currentState = this.definition.initialState;
    }

    /**
     * Process an input sequence and returns the final state.
     *
     * @param input An array of alphabet characters to be processed.
     * @returns the state of the machine after processing the entire inpput sequence.
     */
    public run(input: TAlphabet[]): TState {
        // reset to initial state for each run
        this.currentState = this.definition.initialState;

        for (const symbol of input) {
            this.transition(symbol);
        }

        return this.currentState
    }

    /**
     * Perform a single state transition based on the current state and input symbol
     *
     * @Param symbol The input symbol from the alphabet
     */
    private transition(symbol: TAlphabet): void {
        // Check if the input symbol is valid for the FSM's alphabet
        if (!this.definition.alphabet.includes(symbol)) {
            throw new Error(`Input symbol '${symbol}' is not in the FSM's alphabet.`);
        }

        const stateTransitions = this.definition.transitions[this.currentState];
        if (!stateTransitions) {
            throw new Error(`No transitions defined for the current state '${this.currentState}'.`);
        }

        const nextState = stateTransitions[symbol];
        if (nextState === undefined) {
            throw new Error(`No transition defined for symbol '${symbol}' from state '${this.currentState}'.`);
        }

        this.currentState = nextState;
    }
}