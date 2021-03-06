<?php

namespace App\Http\Resources\Opportunity;

use Illuminate\Http\Resources\Json\Resource;

class GridOpportunity extends Resource
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
            'id' => $this->id,
            'number' => $this->number,
            'createdAt' => $this->created_at,
            'contactName' => optional(optional($this->intake)->contact)->full_name,
            'measureCategoryName' => $this->measureCategory->name,
            'campaignName' => optional(optional($this->intake)->campaign)->name,
            'statusName' => optional($this->whenLoaded('status'))->name,
            'amountQuotations' => count($this->quotationRequests),
            'contactId' => optional(optional($this->intake)->contact)->id,
        ];
    }
}
