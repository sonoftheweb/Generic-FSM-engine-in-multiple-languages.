<?php

namespace App\Fsm\Application\Ports;

use App\Fsm\Domain\Entities\FiniteStateMachine;

/**
 * An interface (a Port in Hexagonal Architecture) defining the contract
 * for creating a pre-configured ModThree Finite State Machine.
 */
interface ModThreeFsmFactoryInterface
{
    public function create(): FiniteStateMachine;
}
