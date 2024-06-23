<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function AddReview(Request $request) {
        $messages = [
            'full_name.required' => 'Full name is required',
            'full_name.max' => 'Full name must not exceed 20 characters',
            'rating.required' => 'Rating is required',
            'rating.integer' => 'Rating must be an integer',
            'rating.min' => 'Rating must be at least 1',
            'rating.max' => 'Rating must not exceed 5',
            'review.required' => 'Review is required',
            'review.max' => 'Review must not exceed 50 characters',
        ];
        $rules = [
            'full_name' => 'required|max:20',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|max:50',
        ];
        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $recentReviews = Review::where('user_id', auth()->id())
            ->where('created_at', '>=', now()->subDays(30))
            ->get();
        if ($recentReviews) {
            return redirect()->back()->withErrors(['review' => 'You have already submitted a review']);
        }
        Review::create([
            'user_id' => auth()->id(),
            'full_name' => $request->full_name,
            'rating' => $request->rating,
            'review' => $request->review,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        return redirect()->back()->with('success', 'Review added successfully');
    }
}
