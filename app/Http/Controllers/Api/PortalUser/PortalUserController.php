<?php

namespace App\Http\Controllers\Api\PortalUser;

use App\Eco\Portal\PortalUser;
use App\Http\Controllers\Api\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PortalUserController extends ApiController
{
    public function update(Request $request, PortalUser $portalUser)
    {
        $this->validateEmail($request, $portalUser);

        $this->authorize('update', $portalUser);

        $data = $request->validate([
            'email' => '',
        ]);
        $portalUser->fill($this->arrayKeysToSnakeCase($data));
        $portalUser->save();

//        return new FullPortalUser($portalUser->fresh()->load('createdBy', 'updatedBy'));
        return new $portalUser;
    }

    protected function validateEmail(Request $request, PortalUser $portalUser)
    {
        $this->validate($request, ['email' => 'required|email']);

        if(PortalUser::where('email', $request->input('email'))->where('id', '!=', $portalUser->id)->count() !== 0){
            abort(404, 'E-mail bestaat al bij een andere Portal gebruiker.');
        }
    }

    public function destroy(PortalUser $portalUser)
    {
        $contact =  $portalUser->contact;
        if($contact)
        {
            $this->authorize('delete', $portalUser);
            $portalUser->delete();

            $contact->portal_registration_code = Str::random(32);
            $contact->save();
        }else{
            abort(404, 'Geen contact bekend.');
        }
    }



}