<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function MakeReservation() {
        $branches = Branch::with(['ServiceDetails.Service'])->get();
        $provinces = Branch::select('branch_province')->distinct()->get();
        return Inertia::render('MakeReservation', [
            'branches' => $branches,
            'provinces' => $provinces
        ]);
    }
    public function CreateReservation(Request $request) {
        $messages = [
            'service_id.required' => 'Please select a service',
            'full_name.required' => 'Full name is required',
            'full_name.max' => 'Full name must not exceed 255 characters',
            'phone_number.required' => 'Phone number is required',
            'phone_number.max' => 'Phone number must not exceed 255 characters',
            'reservation_date.required' => 'Reservation date is required',
            'reservation_date.date' => 'Reservation date must be a valid date',
            'reservation_date.after' => 'Reservation date must be after today',
            'reservation_hour.required' => 'Reservation hour is required',
            'reservation_hour.date_format' => 'Reservation hour must be a valid time format',
        ];
        $rules = [
            'full_name' => 'required|max:255',
            'phone_number' => 'required|max:255',
            'service_id' => 'required',
            'reservation_date' => 'required|date|after:today',
        ];
        if ($request->service_id) {
            $rules['reservation_hour'] = 'required|date_format:H:i';
        }
        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $reservationDate = Carbon::parse($request->reservation_date)->setTimezone('Asia/Jakarta')->format('Y-m-d H:i:s');
        $reservationHour = Carbon::parse($request->reservation_hour);

        $conflictReservation = Reservation::where('user_id', auth()->id())
            ->where('reservation_date', Carbon::parse($request->reservation_date)->setTimezone('Asia/Jakarta')->format('Y-m-d H:i:s'))
            ->whereBetween('reservation_hour', [$reservationHour->copy()->subHours(2)->format('H:i:s'), $reservationHour->copy()->addHours(2)->format('H:i:s')])
            ->first();
        if ($conflictReservation) {
            return redirect()->back()->withErrors(['reservation_hour' => 'You already have a reservation at this time.']);
        }

        $reservation = new Reservation();
        $reservation->user_id = auth()->id();
        $reservation->service_id = $request->service_id;
        $reservation->branch_id = $request->branch_id;
        $reservation->full_name = $request->full_name;
        $reservation->phone_number = $request->phone_number;
        $reservation->reservation_date = $reservationDate;
        $reservation->reservation_hour = Carbon::parse($request->reservation_hour)->format('H:i:s');
        $reservation->save();
        return redirect()->route('make-reservation')->with('success', 'Reservation has been made successfully.');
    }

    public function GetMyReservations() {
        $upcoming = Reservation::with(['Branch', 'Service'])->where('user_id', auth()->id())
            ->where('reservation_date', '>=', Carbon::now()->setTimezone('Asia/Jakarta')->format('Y-m-d H:i:s'))
            ->orderBy('reservation_date', 'asc')
            ->get();
        $past = Reservation::with(['Branch', 'Service'])->where('user_id', auth()->id())
            ->where('reservation_date', '<', Carbon::now()->setTimezone('Asia/Jakarta')->format('Y-m-d H:i:s'))
            ->orderBy('reservation_date', 'desc')
            ->get();
        return Inertia::render('MyReservations', [
            'upcoming_reservations' => $upcoming,
            'past_reservations' => $past
        ]);
    }

    public function CancelReservation(Request $request) {
        $reservation = Reservation::find($request->id);
        if ($reservation->user_id != auth()->id()) {
            return redirect()->route('my-reservations')->with('error', 'You are not authorized to cancel this reservation.');
        }
        $reservation->delete();
        return redirect()->route('my-reservations')->with('success', 'Reservation has been cancelled successfully.');
    }

}


