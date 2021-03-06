<?php

namespace App\Eco\QuotationRequest;

use App\Eco\Address\Address;
use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\Measure\Measure;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Organisation\Organisation;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class QuotationRequest extends Model
{
    use RevisionableTrait;

    protected $table = 'quotation_requests';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    public function organisation()
    {
        return $this->belongsTo(Organisation::class);
    }

    public function opportunity()
    {
        return $this->belongsTo(Opportunity::class);
    }

    public function status()
    {
        return $this->belongsTo(QuotationRequestStatus::class);
    }

    public function documents(){
        return $this->hasMany(Document::class)->orderBy('documents.id', 'desc');
    }

    public function emails(){
        return $this->hasMany(Email::class)->orderBy('emails.id', 'desc');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class);
    }
}
