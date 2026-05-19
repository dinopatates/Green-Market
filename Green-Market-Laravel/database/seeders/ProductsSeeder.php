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
            'image' => 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
        ]);

        Product::create([
            'user_id' => $producer->id,
            'name' => 'Jean en Denim Recyclé',
            'price' => 89.00,
            'stock' => 45,
            'image' => 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1000&auto=format&fit=crop',
        ]);

        Product::create([
            'user_id' => $producer->id,
            'name' => 'Pull en Laine Éthique',
            'price' => 65.00,
            'stock' => 20,
            'image' => 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1000&auto=format&fit=crop',
        ]);
    }
}