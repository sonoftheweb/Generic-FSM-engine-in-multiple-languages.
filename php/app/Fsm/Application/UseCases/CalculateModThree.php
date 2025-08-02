<?php

namespace App\Fsm\Application\UseCases;

use App\Fsm\Application\Ports\ModThreeFsmFactoryInterface;

class CalculateModThree
{
    private const STATE_TO_REMAINDER_MAP = [
        'S0' => 0,
        'S1' => 1,
        'S2' => 2,
    ];

    public function __construct(private readonly ModThreeFsmFactoryInterface $fsmFactory)
    {}

    public function execute(string $binaryString): int
    {
        if ($binaryString === '') {
            return 0;
        }

        $fsm = $this->fsmFactory->create();
        $inputArray = str_split($binaryString);
        $finalState = $fsm->run($inputArray);

        return self::STATE_TO_REMAINDER_MAP[$finalState->name];
    }
}
