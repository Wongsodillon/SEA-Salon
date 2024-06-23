<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user_ids = User::pluck('id')->toArray();
        return [
            'user_id' => $this->faker->randomElement($user_ids),
            'full_name' => $this->faker->name(),
            'rating' => $this->faker->numberBetween(1, 5),
            'review' => $this->faker->paragraph(2),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
