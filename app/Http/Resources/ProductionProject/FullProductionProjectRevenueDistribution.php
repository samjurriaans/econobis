<?php

namespace App\Http\Resources\ProductionProject;

use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\GenericResource;
use App\Http\Resources\ParticipantProductionProject\FullParticipantProductionProject;
use Illuminate\Http\Resources\Json\Resource;

class FullProductionProjectRevenueDistribution extends Resource
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
                'revenueId' => $this->revenue_id,
                'revenue' => FullProductionProjectRevenue::make($this->whenLoaded('revenue')),
                'contact' => FullContact::make($this->whenLoaded('contact')),
                'contactId' => $this->contact_id,
                'contactType' => $this->contact->type,
                'contactName' => $this->contact->full_name,
                'contactPrimaryEmailAddress' => $this->contact->primaryEmailAddress,
                'address' => $this->address,
                'postalCode' => $this->postal_code,
                'city' => $this->city,
                'status' => $this->status,
                'participationsAmount' => $this->participations_amount,
                'payout' => $this->payout,
                'payoutType' => $this->payout_type,
                'datePayout' => $this->date_payout,
                'energySupplierName' => $this->energy_supplier_name,
                'deliveredTotal' => $this->delivered_total,
                'hasInvoice' => $this->paymentInvoices()->exists(),
            ];
    }
}
