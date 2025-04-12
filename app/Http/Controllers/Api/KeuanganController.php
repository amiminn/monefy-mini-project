<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Keuangan;
use Illuminate\Http\Request;

class KeuanganController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'List of Keuangan.',
            'data' => Keuangan::orderBy("id", "desc")->with('kategori')->get()
        ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'kategori_id' => 'required|exists:kategoris,id',
                'tanggal' => 'required|date_format:Y-m-d',
                'jumlah' => 'required|numeric',
            ]);

            $keuangan = Keuangan::create($request->all());
            return response()->json([
                'data' => $keuangan,
                'message' => 'Transaction was successfully created.'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create keuangan.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            Keuangan::findOrFail($id)->delete();

            return response()->json([
                'message' => 'Keuangan deleted successfully.'
            ], 204);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete keuangan.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
