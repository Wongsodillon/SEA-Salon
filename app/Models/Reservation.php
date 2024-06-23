<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reservation extends Model
{
    use HasFactory;
    public function User(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function Branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }
    public function Service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
    public function ServiceDetails(): BelongsTo
    {
        return $this->belongsTo(ServiceDetails::class);
    }
}
