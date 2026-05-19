<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * Récupère la liste de tous les utilisateurs
     */
    public function index()
    {
        try {
            $users = User::select('id', 'name', 'email', 'role', 'created_at')->get();
            return response()->json([
                'success' => true,
                'data'    => $users
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Récupère un utilisateur spécifique
     */
    public function show($id)
    {
        try {
            $user = User::select('id', 'name', 'email', 'role', 'created_at')
                ->findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data'    => $user
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non trouvé'
            ], 404);
        }
    }
}
