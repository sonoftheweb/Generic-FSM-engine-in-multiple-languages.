<?php

namespace Tests\Unit\Application;

use App\Fsm\Application\Ports\ModThreeFsmFactoryInterface;
use App\Fsm\Application\UseCases\CalculateModThree;
use App\Fsm\Domain\Entities\FiniteStateMachine;
use App\Fsm\Domain\ValueObjects\State;
use Mockery;
use PHPUnit\Framework\TestCase;

class CalculateModThreeTest extends TestCase
{
    public function test_it_returns_correct_remainder()
    {
        // Arrange: We mock the FSM and the factory that creates it.
        $mockFsm = Mockery::mock(FiniteStateMachine::class);
        $mockFsm->shouldReceive('run')
            ->with(['1', '1', '0', '1'])
            ->andReturn(new State('S1')); // 13 mod 3 = 1

        $mockFactory = Mockery::mock(ModThreeFsmFactoryInterface::class);
        $mockFactory->shouldReceive('create')->andReturn($mockFsm);

        // Act: We execute the use case with our mocked dependency.
        $useCase = new CalculateModThree($mockFactory);
        $result = $useCase->execute('1101');

        // Assert: The result should be correct based on the mocked final state.
        $this->assertSame(1, $result);
    }
} 
