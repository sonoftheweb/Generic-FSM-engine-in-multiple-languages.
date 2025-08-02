<?php

namespace App\Fsm\Domain\Entities;

use App\Fsm\Domain\ValueObjects\State;
use App\Fsm\Domain\ValueObjects\TransitionRules;
use InvalidArgumentException;

/**
 * The Aggregate Root for our FSM domain.
 * It encapsulates the state and the core logic for running a simulation.
 */
class FiniteStateMachine
{
    private State $currentState;

    public function __construct(
        private readonly State $initialState,
        private readonly TransitionRules $rules,
        private readonly array $alphabet
    ) {
        $this->currentState = $initialState;
    }

    /**
     * Runs an input sequence through the state machine.
     * @param array<int, string|int> $inputSequence
     */
    public function run(array $inputSequence): State
    {
        // reset to the initial state for each run
        $this->currentState = $this->initialState;

        foreach ($inputSequence as $symbol) {
            if (!in_array($symbol, $this->alphabet)) {
                throw new InvalidArgumentException("Input symbol '$symbol' is not in the FSM's alphabet.");
            }
            $this->currentState = $this->rules->findNextState($this->currentState, $symbol);
        }

        return $this->currentState;
    }
}
