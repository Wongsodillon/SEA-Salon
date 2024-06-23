<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Branch extends Model
{
    use HasFactory;

    public function ServiceDetails(): HasMany
    {
        return $this->hasMany(ServiceDetails::class);
    }

    public function Services(): HasManyThrough
    {
        return $this->hasManyThrough(Service::class, ServiceDetails::class, 'branch_id', 'id', 'id', 'service_id');
    }
}
