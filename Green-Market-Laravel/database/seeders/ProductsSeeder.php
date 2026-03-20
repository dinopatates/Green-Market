<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    public function run(): void
    {
        $producer = User::where('role', 'producer')->first();

        Product::create([
            'user_id' => $producer->id,
            'name' => 'T-shirt Coton Bio GOTS',
            'price' => 29.90,
            'stock' => 100,
        ]);

        Product::create([
            'user_id' => $producer->id,
            'name' => 'Jean en Denim Recyclé',
            'price' => 89.00,
            'stock' => 45,
        ]);

        Product::create([
            'user_id' => $producer->id,
            'name' => 'Pull en Laine Éthique',
            'price' => 65.00,
            'stock' => 20,
        ]);
    }
}