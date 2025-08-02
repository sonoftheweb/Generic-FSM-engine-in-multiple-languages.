<?php

namespace App\Console\Commands;

use App\Fsm\Application\UseCases\CalculateModThree;
use Illuminate\Console\Command;
use InvalidArgumentException;
use Symfony\Component\Console\Command\Command as CommandAlias;

class FsmModThreeCommand extends Command
{
    /**
     * The name and signature of the console command.
     * We expect one required argument: the binary string to process.
     *
     * @var string
     */
    protected $signature = 'fsm:mod-three {binaryString : The binary string to calculate the remainder for.}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Calculates the remainder of a binary integer divided by three using an FSM.';

    /**
     * Execute the console command.
     * We use method injection to resolve our application service from the container.
     */
    public function handle(CalculateModThree $calculateModThree): int
    {
        $binaryString = $this->argument('binaryString');

        // Basic validation for the input string.
        if (preg_match('/[^01]/', $binaryString)) {
            $this->error('Invalid input: The binary string can only contain "0" and "1".');
            return CommandAlias::FAILURE;
        }

        try {
            $remainder = $calculateModThree->execute($binaryString);

            $this->info("Processing binary string: \"{$binaryString}\"");
            $this->line("-------------------------------------------------");
            $this->line("The calculated remainder is: <fg=yellow;options=bold>{$remainder}</>");

            return CommandAlias::SUCCESS;
        } catch (InvalidArgumentException $e) {
            $this->error("An error occurred during processing: {$e->getMessage()}");
            return CommandAlias::FAILURE;
        }
    }
}
