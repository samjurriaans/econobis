<?php

namespace App\Eco\Measure;

use App\Eco\Address\Address;
use App\Eco\Document\Document;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Organisation\Organisation;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class Measure extends Model
{
    use RevisionableTrait;

    protected $table = 'measures';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    public function addresses()
    {
        return $this->belongsToMany(Address::class, 'housing_file_measure_taken')->withPivot('measure_date');;
    }

    public function deliveredByOrganisations()
    {
        return $this->belongsToMany(Organisation::class, 'organisation_delivers_measure');
    }

    public function faqs()
    {
        return $this->hasMany(MeasureFaq::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class);
    }

    public function measureCategory()
    {
        return $this->belongsTo(MeasureCategory::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class)->orderBy('documents.id', 'desc');
    }

    public function opportunities()
    {
        return $this->belongsToMany(Opportunity::class);
    }
}
