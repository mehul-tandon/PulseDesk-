<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TicketFactory extends Factory
{
    public function definition(): array
    {
        return [
            'organization_id' => \App\Models\Organization::factory(),
            'subject' => $this->faker->sentence(6),
            'description' => $this->faker->paragraph(),
            'status' => $this->faker->randomElement(['open', 'pending', 'resolved', 'closed']),
            'priority' => $this->faker->randomElement(['low', 'normal', 'high', 'urgent']),
            'requester_id' => \App\Models\User::factory(),
            'assignee_id' => null,
        ];
    }
}
