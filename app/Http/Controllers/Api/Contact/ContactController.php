<?php

namespace App\Http\Controllers\Api\Contact;

use App\Eco\Contact\Contact;
use App\Eco\User\User;
use App\Http\Resources\Contact\ContactPeek;
use App\Http\Resources\Contact\FullContact;
use App\Jobs\SoftDeleteContact;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;

class ContactController extends Controller
{
    public function show(Contact $contact, Request $request)
    {
        $this->authorize('view', $contact);

        $contact->load('addresses');
        $contact->load('emailAddresses');
        $contact->load('phoneNumbers');
        $contact->load('notes.createdBy');
        $contact->load('notes.updatedBy');
        $contact->load('createdBy');
        $contact->load('updatedBy');
        $contact->load('owner');
        if($contact->isAccount()) $contact->load(['account.type', 'account.industry', 'account.people.occupation']);
        if($contact->isPerson()) $contact->load(['person.lastNamePrefix', 'person.title', 'person.account', 'person.type', 'person.occupation']);

        return new FullContact($contact);
    }

    public function destroy(Contact $contact)
    {
        $this->authorize('delete', $contact);

        SoftDeleteContact::dispatch($contact);
    }

    public function registrations(Contact $contact)
    {
        $registrations = $contact->registrations;

        $result = [];
        foreach ($registrations as $registration){
            $result[] = [
                'id' => $registration->id,
                'addressName' =>  $registration->address->present()->streetAndNumber(),
                'createdAt' => $registration->created_at,
            ];
        }

        return $result;
    }

    public function peek()
    {
        $contact = Contact::select('id', 'full_name')->get();

        return ContactPeek::collection($contact);
    }

    public function groups(Contact $contact)
    {
        $groups = $contact->groups()->select('name', 'id')->get();

        return $groups;
    }

}
