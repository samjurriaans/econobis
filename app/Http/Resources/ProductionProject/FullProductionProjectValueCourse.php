<?php

namespace App\Http\Resources\ProductionProject;

use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullProductionProjectValueCourse extends Resource
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
                'date' => $this->date,
                'bookWorth' => $this->book_worth,
                'transferWorth' => $this->transfer_worth,
                'createdAt' => $this->created_at,
                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'productionProject' => FullProductionProject::make($this->whenLoaded('productionProject')),
            ];
    }
}
