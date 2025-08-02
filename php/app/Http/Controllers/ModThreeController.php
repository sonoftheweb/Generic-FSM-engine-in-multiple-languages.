<?php

namespace App\Http\Controllers;

use App\Fsm\Application\UseCases\CalculateModThree;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Response;

class ModThreeController extends Controller
{
    /**
     * Runs the mod-three FSM with example inputs and displays the results.
     * We use method injection to get our application service from the container.
     * We could pass the test cases via request parameters, but that is not in scope of what's needed now. 
     */
    public function show(CalculateModThree $calculateModThree): ResponseFactory|Response
    {
        $testCases = [
            '1101' => 13, // 13 mod 3 = 1
            '1110' => 14, // 14 mod 3 = 2
            '1111' => 15, // 15 mod 3 = 0
            '10101' => 21, // 21 mod 3 = 0
            '100' => 4,   // 4 mod 3 = 1
            '0' => 0,     // 0 mod 3 = 0
            '' => 0,      // 0 mod 3 = 0
        ];

        $results = [];
        foreach ($testCases as $binaryString => $decimal) {
            $results[] = [
                'binary' => $binaryString,
                'decimal' => $decimal,
                // The controller simply executes the use case.
                'remainder' => $calculateModThree->execute($binaryString),
            ];
        }

        return response($results);
    }
}