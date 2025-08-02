<?php

namespace Tests\Feature;

use Tests\TestCase;

class ModThreeControllerTest extends TestCase
{
    public function test_show_method_returns_view_with_results(): void
    {
        $response = $this->get('/mod-three');

        $response->assertStatus(200);
        $response->assertViewIs('mod-three');
        $response->assertViewHas('results');

        // Check that a known value is present on the page.
        // This confirms the entire flow worked correctly.
        $response->assertSeeText('>"1101"<');
        $response->assertSeeInOrder(['Decimal Value', '13', 'FSM Result (Remainder)', '1']);
    }
}
