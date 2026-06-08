<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrdersSeeder extends Seeder
{
    public function run(): void
    {
        $client = User::where('role', 'client')->first();

        Order::create([
            'user_id' => $client->id,
            'total' => 0, // Sera calculé par OrderLinesSeeder
            'status' => 'payée',
        ]);
    }
}
