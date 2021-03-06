<?php

namespace App\Http\Controllers\Api\User;

use App\Eco\User\User;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Helpers\Email\EmailHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function me(Request $request)
    {
        return $this->show($request->user());
    }

    public function show(User $user)
    {
        $user->load(['lastNamePrefix', 'title', 'administrations']);
        return FullUser::make($user);
    }

    public function store(RequestInput $input, Request $request)
    {
        $this->authorize('create', User::class);

        $data = $input->string('email')->validate(['required', 'email', 'unique:users,email'])->next()
            ->string('titleId')->validate('exists:titles,id')->default(null)->alias('title_id')->next()
            ->string('firstName')->whenMissing('')->alias('first_name')->next()
            ->string('lastNamePrefixId')->validate('exists:last_name_prefixes,id')->default(null)->alias('last_name_prefix_id')->next()
            ->string('lastName')->whenMissing('')->alias('last_name')->next()
            ->string('phoneNumber')->whenMissing('')->alias('phone_number')->next()
            ->string('mobileNumber')->whenMissing('')->alias('mobile')->next()
            ->boolean('active')->whenMissing(true)->next()
            ->string('occupation')->next()
            ->get();

        //create random password
        $data['password'] = Str::random(20);

        $user = new User();
        $user->fill($data);

        $alfrescoHelper = new AlfrescoHelper( \Config::get('app.ALFRESCO_ADMIN_USERNAME'), \Config::get('app.ALFRESCO_ADMIN_PASSWORD'));

        //checks if account exists
        $exists = $alfrescoHelper->checkIfAccountExists($user);
        $exists ? $user->has_alfresco_account = 1 : $user->has_alfresco_account = 0;

        $user->alfresco_password = 'nvt';
        $user->save();

        $user->assignRole(Role::findByName('Medewerker'));

        //Send link to set password
        // Emails moeten vanuit de default mailbox worden verstuurd ipv de mail instellingen in .env
        // Daarom hier eerst de emailconfiguratie overschrijven voordat we gaan verzenden.
        (new EmailHelper())->setConfigToDefaultMailbox();
        (new ForgotPasswordController())->sendResetLinkEmail($request);

        return $this->show($user->fresh());
    }

    public function update(User $user, RequestInput $input)
    {
        $this->authorize('update', $user);

        $data = $input->string('email')->validate(['required', 'email', Rule::unique('users', 'email')->ignore($user->id)])->next()
            ->password('password')->next()
            ->string('titleId')->validate('exists:titles,id')->onEmpty(null)->alias('title_id')->next()
            ->string('firstName')->alias('first_name')->next()
            ->string('lastNamePrefixId')->validate('exists:last_name_prefixes,id')->onEmpty(null)->alias('last_name_prefix_id')->next()
            ->string('lastName')->alias('last_name')->next()
            ->string('phoneNumber')->alias('phone_number')->next()
            ->string('mobile')->next()
            ->boolean('active')->next()
            ->string('occupation')->next()
            ->get();


        $user->fill($data);
        $user->save();

        return $this->show($user->fresh());
    }

    public function withPermission(Permission $permission)
    {
        $users = User::permission($permission)->with(['lastNamePrefix', 'title'])->where('id', '!=', '1')->get();
        return FullUser::collection($users);
    }

    public function addRole(User $user, Role $role)
    {
        $this->authorize('update', $user);

        $user->assignRole($role);
    }

    public function removeRole(User $user, Role $role)
    {
        $this->authorize('update', $user);

        $user->removeRole($role);
    }

    public function sendResetLinkEmail(Request $request)
    {
        // Emails moeten vanuit de default mailbox worden verstuurd ipv de mail instellingen in .env
        // Daarom hier eerst de emailconfiguratie overschrijven voordat we gaan verzenden.
        (new EmailHelper())->setConfigToDefaultMailbox();
        (new ForgotPasswordController())->sendResetLinkEmail($request);
    }
}
