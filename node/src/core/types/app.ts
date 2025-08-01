/**
 * Represents a state in FSM. Cand be a string or a number.
 */
export type IState = string | number;

/**
 * Represents a character in the input alphabet. Can be a string or a number.
 */
export type IAlphabet = string | number;

/**
 * Defines the structure of the transition map.
 * For each state, it maps an input character to the next state.
 * e.g., { S0: { '0': 'S0', '1': 'S1' } }
 */
export type ITransitionMap<TState extends IState, TAlphabet extends IAlphabet> = {
  [key in TState]: {
    [key in TAlphabet]?: TState;
  };
};

/**
 * Defines the complete 5-tuple structure of a Finite State Machine.
 * @template TState The type for the states (e.g., 'S0', 'S1').
 * @template TAlphabet The type for the alphabet (e.g., '0', '1').
 */
export interface IFSMDefinition<TState extends IState, TAlphabet extends IAlphabet> {
  /** A finite set of states. */
  states: TState[];
  /** A finite set of symbols, called the alphabet. */
  alphabet: TAlphabet[];
  /** The transition function. */
  transitions: ITransitionMap<TState, TAlphabet>;
  /** The initial state. */
  initialState: TState;
  /** A set of accepting/final states. */
  finalStates: TState[];
}