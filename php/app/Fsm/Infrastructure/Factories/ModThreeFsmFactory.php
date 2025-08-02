<?php

namespace App\Fsm\Infrastructure\Factories;

use App\Fsm\Application\Ports\ModThreeFsmFactoryInterface;
use App\Fsm\Domain\Entities\FiniteStateMachine;
use App\Fsm\Domain\ValueObjects\State;
use App\Fsm\Domain\ValueObjects\TransitionRules;

/**
 * A concrete factory (an Adapter) that builds the ModThree FSM.
 */
class ModThreeFsmFactory implements ModThreeFsmFactoryInterface
{
    public function create(): FiniteStateMachine
    {
        $rules = new TransitionRules([
            'S0' => ['0' => 'S0', '1' => 'S1'],
            'S1' => ['0' => 'S2', '1' => 'S0'],
            'S2' => ['0' => 'S1', '1' => 'S2'],
        ]);

        return new FiniteStateMachine(
            initialState: new State('S0'),
            rules: $rules,
            alphabet: ['0', '1']
        );
    }
}