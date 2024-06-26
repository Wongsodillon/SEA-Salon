<?php

namespace Database\Seeders;

use App\Models\Branch;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Branch::create([
            'branch_name' => 'Sumarecon Mall Serpong',
            'branch_street'=> 'Jl. Boulevard Raya Gading Serpong No.1',
            'branch_city' => 'Tangerang',
            'branch_province' => 'Banten',
            'branch_image' => 'https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2F01_revisi.jpg?alt=media&token=57d7c2a3-364a-4a8f-9744-c4e9b4f978c4',
            'branch_phone' => '0211234567',
            'opening_time' => Carbon::parse('11:00')->format('H:i'),
            'closing_time' => Carbon::parse('21:00')->format('H:i'),
            'created_at' => '2024-06-12 07:14:32',
            'updated_at' => '2024-06-12 07:14:32',
        ]);
        Branch::create([
            'branch_name' => 'Pondok Indah Mall',
            'branch_street'=> 'Jl. Metro Pondok Indah',
            'branch_city' => 'Jakarta Selatan',
            'branch_province' => 'DKI Jakarta',
            'branch_image' => 'https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Ff85d5585-6b34-4a6c-9dfd-630974b752fc-1634606812446-ed3bc408aa0c2ad0d4ecee62dac07210.webp?alt=media&token=63a689b2-b5f4-47b1-85b3-822f8d50ab6e',
            'branch_phone' => '0217654321',
            'opening_time' => Carbon::parse('10:00')->format('H:i'),
            'closing_time' => Carbon::parse('22:00')->format('H:i'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        Branch::create([
            "branch_name" => "Grand Indonesia",
            "branch_street" => "Jl. M.H. Thamrin No.1",
            "branch_city" => "Jakarta Pusat",
            'branch_province' => 'DKI Jakarta',
            'branch_image' => 'https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fabout-3.jpg?alt=media&token=905429cf-c36d-41cb-98c6-4b907fe91812',
            "branch_phone" => "0219876543",
            "opening_time" => Carbon::parse("09:00")->format('H:i'),
            "closing_time" => Carbon::parse("23:00")->format('H:i'),
            "created_at" => now(),
            "updated_at" => now(),
        ]);
        Branch::create([
            'branch_name' => "Central Park",
            'branch_street' => "Jl. Letjen S. Parman No.28",
            'branch_city' => "Jakarta Barat",
            'branch_province' => 'DKI Jakarta',
            'branch_image'=> "https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2F27_20190507153534_6508022_large.jpg?alt=media&token=6b65003e-c748-4d86-8a48-dad9873bd518",
            "branch_phone" => "0218765432",
            "opening_time" => Carbon::parse("08:00")->format('H:i'),
            "closing_time" => Carbon::parse("22:00")->format('H:i'),
            "created_at" => now(),
            "updated_at" => now(),
        ]);
        Branch::create([
            'branch_name' => "Sumarecon Mall Bekasi",
            'branch_street' => "Jl. Boulevard Ahmad Yani",
            'branch_city' => "Bekasi",
            'branch_province' => 'West Java',
            'branch_image' => "https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2F57034350_605.jpg?alt=media&token=2e290c9d-d7a2-41a8-a39a-4db0c83528fa",
            "branch_phone" => "0216543210",
            "opening_time" => Carbon::parse("10:00")->format('H:i'),
            "closing_time" => Carbon::parse("22:00")->format('H:i'),
            "created_at" => now(),
            "updated_at" => now(),
        ]);
        Branch::create([
            'branch_name' => "Living World",
            'branch_street' => "Jl. Alam Sutera Boulevard Kav. 21",
            'branch_city' => "Tangerang",
            'branch_province' => 'Banten',
            'branch_image' => "https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fenvironmentally-conscious-spacesshutterstock_1800193357_j8cnse.jpg?alt=media&token=cd7430b0-f5e9-4a5a-b323-4b354d9ec3e7",
            "branch_phone" => "0215432109",
            "opening_time" => Carbon::parse("09:00")->format('H:i'),
            "closing_time" => Carbon::parse("21:00")->format('H:i'),
            "created_at" => now(),
            "updated_at" => now(),
        ]);
    }
}
