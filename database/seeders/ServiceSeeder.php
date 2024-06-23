<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Service::create([
            'service_name' => 'Haircut & Styling',
            'service_description' => 'Haircut and styling are hair treatments that involve cutting and styling the hair to enhance the appearance of the hair.',
            'service_image' => 'https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fhaircut-styling.jpg?alt=media&token=677094b4-b21d-488c-948b-1871c7babaaa',
            'service_icon' => "https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fhaircut.png?alt=media&token=74121a81-657b-4c70-ada2-d71228232286"
        ]);
        Service::create([
            'service_name' => "Manicure and Pedicure",
            'service_description' => 'Manicure and pedicure are beauty treatments that trim, shape, and polish the nails.',
            'service_image' => 'https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2F65b1f4ddacfdc.jpg?alt=media&token=80c81d0c-884d-4c3c-aad0-6122656c581c',
            'service_icon' => "https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fpedicure.png?alt=media&token=d77d5497-000d-4d76-a583-e3fd9f09edd2"
        ]);
        Service::create([
            'service_name' => "Facial Treatments",
            'service_description' => 'Facial treatments are a group of procedures that support skin health, improve skin tone, and treat skin conditions.',
            'service_image' => "https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2FGettyImages-963030250.webp?alt=media&token=30b5d4e2-e93d-42b2-95cd-61e5627063b8",
            'service_icon' => "https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Ffacial-treatment.png?alt=media&token=99249369-df67-4afe-bbda-7a2620b2083b"
        ]);
        Service::create([
            'service_name' => "Massage Therapy",
            'service_description' => 'Massage therapy is a treatment that involves rubbing and kneading the body to relieve tension and stress.',
            'service_image' => "https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fservices-1-3.jpg?alt=media&token=e17f5311-86af-469a-9cc4-b840a96a8bc2",
            'service_icon' => "https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fcupping.png?alt=media&token=ad9fb250-c70a-459d-a842-b5013955b85e"
        ]);
        Service::create([
            'service_name' => "Nail Polish",
            'service_description' => 'Nail polish is a liquid that is applied to the nails to give them a colorful appearance.',
            'service_image' => 'https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2F61dub5qhjML._AC_UF1000%2C1000_QL80_.jpg?alt=media&token=6235697b-b3ba-4552-b0a0-2b996b1856d8',
            'service_icon' => "https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fnail-artist.png?alt=media&token=3f6a3894-be63-4bd0-b37a-96c2922c791f"
        ]);
        Service::create([
            'service_name' => "Hair Coloring",
            'service_description' => 'Hair coloring is a treatment that involves changing the color of the hair to enhance the appearance of the hair.',
            'service_image' => 'https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Freegz_side_view_of_a_woman_in_a_hair_salon_chair_with_layered__aa6abeab-d9cf-46cc-8fda-c66ca9284f9b.webp?alt=media&token=de71728f-ae4d-4832-bb75-0946b3260108',
            'service_icon' => "https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fhair-dye.png?alt=media&token=cdd92f61-969e-4f60-8cbb-d598cf34504a"
        ]);
    }
}
