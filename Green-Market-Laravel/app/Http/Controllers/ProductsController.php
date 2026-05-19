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
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'trace'   => $e->getTraceAsString()
            ], 500);
        }
    }

    /**
     * Crée un nouveau produit (réservé aux producers)
     */
    public function store(Request $request)
    {
        $name = 'name';
        
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'price' => 'required|numeric|min:0',
                'stock' => 'required|integer|min:0',
            ]);

            $user = $request->user();

            if ($user->role !== 'producer') {
                return response()->json([
                    'success' => false,
                    'message' => 'Seuls les producteurs peuvent créer des produits'
                ], 403);
            }

            $product = Product::create([
                'user_id' => $user->id,
                'name' => $validated['name'],
                'price' => $validated['price'],
                'stock' => $validated['stock'],
            ]);

            return response()->json([
                'success' => true,
                'data' => $product->load('user')
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Affiche un produit spécifique
     */
    public function show($id)
    {
        try {
            $product = Product::with('user')->findOrFail($id);
            return response()->json([
                'success' => true,
                'data'    => $product
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Produit non trouvé'
            ], 404);
        }
    }
}