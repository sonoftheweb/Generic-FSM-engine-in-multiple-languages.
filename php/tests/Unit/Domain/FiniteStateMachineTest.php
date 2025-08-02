<?php

namespace Tests\Unit\Domain;

use App\Fsm\Domain\Entities\FiniteStateMachine;
use App\Fsm\Domain\ValueObjects\TransitionRules;
use App\Fsm\Domain\ValueObjects\State;
use PHPUnit\Framework\TestCase;
use InvalidArgumentException;

class FiniteStateMachineTest extends TestCase
{
    public function test_it_correctly_runs_a_sequence()
    {
        $fsm = $this->createEvenOddFsm();
        $finalState = $fsm->run(['1', '0', '1']);
        $this->assertTrue($finalState->equals(new State('EVEN')));
    }

    public function test_it_throws_exception_for_invalid_symbol()
    {
        $this->expectException(InvalidArgumentException::class);
        $fsm = $this->createEvenOddFsm();
        $fsm->run(['1', '2']);
    }

    private function createEvenOddFsm(): FiniteStateMachine
    {
        $rules = new TransitionRules([
            'EVEN' => ['0' => 'EVEN', '1' => 'ODD'],
            'ODD' => ['0' => 'ODD', '1' => 'EVEN'],
        ]);

        return new FiniteStateMachine(
            initialState: new State('EVEN'),
            rules: $rules,
            alphabet: ['0', '1']
        );
    }
}
