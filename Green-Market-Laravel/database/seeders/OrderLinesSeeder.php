<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderLine;
use App\Models\Product;
use Illuminate\Database\Seeder;

class OrderLinesSeeder extends Seeder
{
    public function run(): void
    {
        $order = Order::first();
        $tshirt = Product::where('name', 'T-shirt Coton Bio GOTS')->first();
        $jean = Product::where('name', 'Jean en Denim Recyclé')->first();

        // Ligne 1 : 2 T-shirts
        OrderLine::create([
            'order_id'   => $order->id,
            'product_id' => $tshirt->id,
            'quantity'   => 2,
            'unit_price' => $tshirt->price,
        ]);

        // Ligne 2 : 1 Jean
        OrderLine::create([
            'order_id'   => $order->id,
            'product_id' => $jean->id,
            'quantity'   => 1,
            'unit_price' => $jean->price,
        ]);

        // Mise à jour du champ 'total' dans la table 'orders'
        // Calcul : (2 * 29.90) + (1 * 89.00) = 148.80
        $totalFinal = ($tshirt->price * 2) + ($jean->price * 1);
        
        $order->update(['total' => $totalFinal]);
    }
}