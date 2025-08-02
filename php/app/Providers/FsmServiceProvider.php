<?php

namespace App\Providers;

use App\Fsm\Application\Ports\ModThreeFsmFactoryInterface;
use App\Fsm\Infrastructure\Factories\ModThreeFsmFactory;
use Illuminate\Support\ServiceProvider;

class FsmServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            ModThreeFsmFactoryInterface::class,
            ModThreeFsmFactory::class
        );
    }
}
