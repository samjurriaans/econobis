<?php

namespace App\Http\Resources\Measure;

use App\Http\Resources\GenericResource;
use Illuminate\Http\Resources\Json\Resource;

class GridMeasure extends Resource
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
            'measureCategory' => GenericResource::make($this->whenLoaded('measureCategory')),
            'name' => $this->name,
        ];
    }
}
