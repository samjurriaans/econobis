<?php

namespace App\Eco\Portal;

use App\Eco;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laracasts\Presenter\PresentableTrait;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Venturecraft\Revisionable\RevisionableTrait;

class PortalUser extends Authenticatable
{
    use Notifiable, HasApiTokens, RevisionableTrait, HasRoles, PresentableTrait, CanResetPassword;

    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'remember_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function contact()
    {
        return $this->belongsTo(Eco\Contact\Contact::class);
    }
}