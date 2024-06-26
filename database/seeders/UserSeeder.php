<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(10)->create();
        User::create([
            'name' => "Thomas N",
            'email' => "thomas.n@compfest.id",
            'phone_number' => "08123456789",
            'role' => 'admin',
            'password' => bcrypt('Admin123'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        User::create([
            'name' => "Dillon Wongso",
            'email' => "wongsodillon@gmail.com",
            'phone_number' => "08111235216",
            'role' => 'customer',
            'password' => bcrypt('wongsodillon@gmail.com'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
