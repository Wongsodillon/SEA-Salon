<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Reservation;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function AdminDashboard()
    {
        $totalReservations = Reservation::count();
        $totalUsers = User::count();
        $totalBranches = Branch::count();
        $averageRating = Review::avg('rating');
        $reservations = Reservation::with(['Service', 'Branch'])->get();
        return Inertia::render('Admin/AdminDashboard', [
            'totalReservations' => $totalReservations,
            'totalUsers' => $totalUsers,
            'totalBranches' => $totalBranches,
            'averageRating' => $averageRating,
            'reservations' => $reservations,
        ]);
    }
}
