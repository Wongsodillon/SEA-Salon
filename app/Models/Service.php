<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Service extends Model
{
    use HasFactory;
    public function Reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
    public function Branches(): HasManyThrough
    {
        return $this->hasManyThrough(Branch::class, ServiceDetails::class, 'service_id', 'id', 'id', 'branch_id');
    }
    public function ServiceDetails(): HasMany
    {
        return $this->hasMany(ServiceDetails::class);
    }
}
