<?php

namespace App\Fsm\Domain\ValueObjects;

use InvalidArgumentException;

/**
 * A Value Object representing the complete set of transition rules (δ).
 */
readonly class TransitionRules
{
    /** @var array<string|int, array<string|int, string|int>> */
    private array $rules;

    public function __construct(array $rules)
    {
        // here you could add validation to ensure rules are structured correctly
        $this->rules = $rules;
    }

    public function findNextState(State $currentState, string|int $symbol): State
    {
        $nextStateName = $this->rules[$currentState->name][$symbol] ?? null;

        if ($nextStateName === null) {
            throw new InvalidArgumentException(
                "No transition defined for symbol '$symbol' from state '$currentState->name'."
            );
        }

        return new State($nextStateName);
    }
}
