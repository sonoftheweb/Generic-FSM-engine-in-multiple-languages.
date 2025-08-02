<?php

namespace Tests\Feature;

use Tests\TestCase;

class ModThreeControllerTest extends TestCase
{
    public function test_show_method_returns_json_with_results(): void
    {
        $response = $this->get('/mod-three');

        $response->assertStatus(200);
        $response->assertHeader('content-type', 'application/json');
        
        $response->assertJsonStructure([
            '*' => [
                'binary',
                'decimal', 
                'remainder'
            ]
        ]);
        
        $response->assertJsonFragment([
            'binary' => 1101,
            'decimal' => 13,
            'remainder' => 1
        ]);
    }
}
