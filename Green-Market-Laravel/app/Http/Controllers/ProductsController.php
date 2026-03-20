<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    /**
     * Affiche la liste des vêtements écolos.
     */
public function index()
{
    try {
        $products = Product::with('user')->get();
        return response()->json([
            'success' => true,
            'data'    => $products
        ], 200);
    } catch (\Exception $e) {
        // C'EST ICI : Si ça plante, tu verras le message exact dans ton navigateur
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
            'trace'   => $e->getTraceAsString()
        ], 500);
    }
}
}