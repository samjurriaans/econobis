<?php

namespace App\Eco\Order;

use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class Order extends Model
{
    use RevisionableTrait, SoftDeletes, Encryptable;

    protected $guarded = ['id'];

    protected $encryptable = [
        'IBAN'
    ];

    protected $appends
        = [
            'total_price_incl_vat',
        ];

    //Dont boot softdelete scopes. We handle this ourselves
    public static function bootSoftDeletes()
    {
        return false;
    }

    public function orderProducts()
    {
        return $this->hasMany(OrderProduct::class);
    }

    public function administration()
    {
        return $this->belongsTo(Administration::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function emailTemplate(){
        return $this->belongsTo(EmailTemplate::class);
    }

    public function emailTemplateReminder(){
        return $this->belongsTo(EmailTemplate::class);
    }

    public function emailTemplateExhortation(){
        return $this->belongsTo(EmailTemplate::class);
    }

    public function getCollectionFrequency()
    {
        if(!$this->collection_frequency_id) return null;

        return OrderCollectionFrequency::get($this->collection_frequency_id);
    }

    public function getPaymentType()
    {
        if(!$this->payment_type_id) return null;

        return OrderPaymentType::get($this->payment_type_id);
    }

    public function getStatus()
    {
        if(!$this->status_id) return null;

        return OrderStatus::get($this->status_id);
    }

    public function getTotalPriceInclVatAttribute()
    {
        $total = 0;

        foreach ($this->orderProducts as $orderProduct) {
            $total += $orderProduct->total_price_incl_vat_and_reduction;
        }

        return $total;
    }
}
