<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\Product;


use App\Http\Resources\GenericResource;
use Illuminate\Http\Resources\Json\Resource;

class GridProduct extends Resource
{
    public function toArray($request)
    {
           return [
                'id' => $this->id,
                'code' => $this->code,
                'name' => $this->name,
                'priceInclVat' => $this->price_incl_vat,
                'price' => GenericResource::make($this->whenLoaded('price')),
            ];
    }
}