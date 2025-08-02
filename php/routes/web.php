<?php

use App\Http\Controllers\ModThreeController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/mod-three', [ModThreeController::class, 'show']);