<?php

namespace App\Http\Resources\Product;

use App\Http\Resources\Administration\FullAdministration;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullProduct extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     *
     * @return array
     */
    public function toArray($request)
    {
        return
            [
                'id' => $this->id,
                'code' => $this->code,
                'name' => $this->name,
                'invoiceText' => $this->invoice_text,
                'priceInclVat' => $this->price_incl_vat,
                'priceHistory' => GenericResource::collection($this->whenLoaded('priceHistory')),
                'currentPrice' => GenericResource::make($this->current_price),

                'durationId' => $this->duration_id,
                'duration' => FullEnumWithIdAndName::make($this->getDuration()),

                'invoiceFrequencyId' => $this->invoice_frequency_id,
                'invoiceFrequency' => FullEnumWithIdAndName::make($this->getInvoiceFrequency()),

                'paymentTypeId' => $this->payment_type_id,
                'paymentType' => FullEnumWithIdAndName::make($this->getPaymentType()),

                'administrationId' => $this->administration_id,
                'administration' => FullAdministration::make($this->whenLoaded('administration')),

                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ];
    }
}
