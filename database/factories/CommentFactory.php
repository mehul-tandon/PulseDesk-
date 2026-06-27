<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'ticket_id' => \App\Models\Ticket::factory(),
            'author_id' => \App\Models\User::factory(),
            'body' => $this->faker->paragraph(),
            'is_internal' => $this->faker->boolean(20),
        ];
    }
}
