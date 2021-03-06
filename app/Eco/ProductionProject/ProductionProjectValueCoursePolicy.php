<?php

namespace App\Eco\ProductionProject;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProductionProjectValueCoursePolicy
{
    use HandlesAuthorization;

        public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_financial', 'api');
    }
}
