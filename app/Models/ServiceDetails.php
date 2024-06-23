<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceDetails extends Model
{
    use HasFactory;

    public function Service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
    public function Branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }
}
