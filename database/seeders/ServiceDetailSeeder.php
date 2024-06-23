<?php

namespace Database\Seeders;

use App\Models\ServiceDetails;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ServiceDetails::create([
            'service_id' => 1,
            'branch_id' => 1,
            'price' => 70000,
            'duration' => 1,
            'created_at' => '2024-06-12 07:14:32',
            'updated_at' => '2024-06-12 07:14:32',
        ]);
        ServiceDetails::create([
            'service_id' => 2,
            'branch_id' => 1,
            'price' => 100000,
            'duration' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        ServiceDetails::create([
            'service_id' => 3,
            'branch_id' => 1,
            'price' => 120000,
            'duration' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        ServiceDetails::create([
            'service_id' => 4,
            'branch_id' => 1,
            'price' => 100000,
            'duration' => 1.5,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        ServiceDetails::create([
            'service_id' => 5,
            'branch_id' => 1,
            'price' => 100000,
            'duration' => 1.5,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        ServiceDetails::create([
            'service_id' => 1,
            'branch_id' => 2,
            'price' => 80000,
            'duration' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        ServiceDetails::create([
            'service_id' => 2,
            'branch_id' => 2,
            'price' => 110000,
            'duration' => 1.5,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        ServiceDetails::create([
            'service_id' => 3,
            'branch_id' => 2,
            'price' => 150000,
            'duration' => 1.5,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        ServiceDetails::create([
            'service_id' => 5,
            'branch_id' => 2,
            'price' => 110000,
            'duration' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        ServiceDetails::create([
            'service_id' => 6,
            'branch_id' => 2,
            'price' => 120000,
            'duration' => 1.5,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        ServiceDetails::create([
            'service_id' => 1,
            'branch_id' => 3,
            'price' => 130000,
            'duration' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        ServiceDetails::create([
            'service_id' => 2,
            'branch_id' => 3,
            'price' => 200000,
            'duration' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        ServiceDetails::create([
            'service_id' => 3,
            'branch_id' => 3,
            'price' => 170000,
            'duration' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        ServiceDetails::create([
            'service_id' => 4,
            'branch_id' => 3,
            'price' => 175000,
            'duration' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        ServiceDetails::create([
            'service_id' => 5,
            'branch_id' => 3,
            'price' => 140000,
            'duration' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        ServiceDetails::create([
            'service_id' => 6,
            'branch_id' => 3,
            'price' => 200000,
            'duration' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        ServiceDetails::create([
            'service_id' => 1,
            'branch_id' => 4,
            'price' => 90000,
            'duration' => 1.5,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        ServiceDetails::create([
            'service_id' => 2,
            'branch_id' => 4,
            'price' => 120000,
            'duration' => 1.5,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        ServiceDetails::create([
            'service_id' => 3,
            'branch_id' => 4,
            'price' => 100000,
            'duration' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        ServiceDetails::create([
            'service_id' => 4,
            'branch_id' => 4,
            'price' => 200000,
            'duration' => 2.5,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

    }
}
