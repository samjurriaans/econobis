<?php

namespace App\Http\Resources\SystemData;

use App\Eco\AccountType\AccountType;
use App\Eco\Address\AddressType;
use App\Eco\BuildingFeature\BuildingFeature;
use App\Eco\BuildingType\BuildingType;
use App\Eco\EnergyLabel\EnergyLabel;
use App\Eco\Measure\Measure;
use App\Eco\Registration\RegistrationReason;
use App\Eco\Registration\RegistrationSource;
use App\Eco\Campaign\Campaign;
use App\Eco\Registration\RegistrationStatus;
use App\Eco\Contact\ContactStatus;
use App\Eco\Contact\ContactType;
use App\Eco\EmailAddress\EmailAddressType;
use App\Eco\Industry\Industry;
use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Eco\Occupation\Occupation;
use App\Eco\PersonType\PersonType;
use App\Eco\PhoneNumber\PhoneNumberType;
use App\Http\Resources\AccountType\FullAccountType;
use App\Eco\Title\Title;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\Industry\FullIndustry;
use App\Http\Resources\LastNamePrefix\FullLastNamePrefix;
use App\Http\Resources\Occupation\FullOccupation;
use App\Http\Resources\PersonType\FullPersonType;
use App\Http\Resources\Title\FullTitle;
use Illuminate\Http\Resources\Json\Resource;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class SystemData extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'contactTypes' => FullEnumWithIdAndName::collection(ContactType::collection()),
            'addressTypes' => FullEnumWithIdAndName::collection(AddressType::collection()),
            'lastNamePrefixes' => FullLastNamePrefix::collection(LastNamePrefix::all()),
            'emailAddressTypes' => FullEnumWithIdAndName::collection(EmailAddressType::collection()),
            'phoneNumberTypes' => FullEnumWithIdAndName::collection(PhoneNumberType::collection()),
            'personTypes' => FullPersonType::collection(PersonType::all()),
            'contactStatuses' => FullEnumWithIdAndName::collection(ContactStatus::collection()),
            'industries' => FullIndustry::collection(Industry::all()),
            'accountTypes' => FullAccountType::collection(AccountType::all()),
            'occupations' => FullOccupation::collection(Occupation::all()),
            'titles' => FullTitle::collection(Title::all()),
            'buildingTypes' => BuildingType::select(['id', 'name'])->get(),
            'measures' => Measure::select(['id', 'name'])->get(),
            'registrationSources' => RegistrationSource::select(['id', 'name'])->get(),
            'campaigns' => Campaign::select(['id', 'name'])->get(),
            'registrationStatuses' => RegistrationStatus::select(['id', 'name'])->get(),
            'registrationReasons' => RegistrationReason::select(['id', 'name'])->get(),
            'energyLabels' => EnergyLabel::select(['id', 'name'])->get(),
            'permissions' => FullEnumWithIdAndName::collection(Permission::all()),
            'roles' => Role::select(['id', 'name'])->get()->toArray(),
        ];
    }
}
