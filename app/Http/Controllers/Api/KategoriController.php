<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use Illuminate\Http\Request;

class KategoriController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'List of Kategori.',
            'data' => Kategori::orderBy('jenis_kategori')->get()
        ]);
    }

    public function show($jenis_kategori)
    {
        try {
            $kategori = Kategori::where('jenis_kategori', $jenis_kategori)
                ->orderBy('nama_kategori')->get();

            return response()->json([
                'data' => $kategori,
                'message' => 'Kategori found.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Kategori not found.',
                'message' => $e->getMessage()
            ], 404);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'jenis_kategori' => 'required|in:PENDAPATAN,PENGELUARAN',
                'nama_kategori' => 'required|string|max:255',
            ]);

            $kategori = Kategori::create($request->all());
            return response()->json([
                'data' => $kategori,
                'message' => 'Kategori created successfully.'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create kategori.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            Kategori::findOrFail($id)->delete();

            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete kategori.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
