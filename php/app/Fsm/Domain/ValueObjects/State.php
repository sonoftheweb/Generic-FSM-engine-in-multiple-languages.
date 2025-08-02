<?php

namespace App\Fsm\Domain\ValueObjects;

/**
 * A Value Object representing a state. It is identified by its value, not a unique ID.
 */

readonly class State
{
    public function __construct(public string|int $name)
    {}

    public function equals(self $other): bool
    {
        return $this->name === $other->name;
    }
}
