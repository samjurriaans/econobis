<?php

namespace App\Eco\Campaign;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Measure\Measure;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Organisation\Organisation;
use App\Eco\Intake\Intake;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class Campaign extends Model
{
    use RevisionableTrait;

    protected $table = 'campaigns';
     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [

    ];

    public function intakes()
    {
        return $this->hasMany(Intake::class);
    }

    public function opportunities()
    {
        return $this->hasMany(Opportunity::class);
    }

    public function measures()
    {
        return $this->belongsToMany(Measure::class);
    }

    public function status()
    {
        return $this->belongsTo(CampaignStatus::class);
    }

    public function type()
    {
        return $this->belongsTo(CampaignType::class);
    }

    public function responses(){
        return $this->hasMany(CampaignResponse::class);
    }

    public function organisations(){
        return $this->belongsToMany(Organisation::class);
    }

    public function createdBy(){
        return $this->belongsTo(User::class);
    }

    public function ownedBy(){
        return $this->belongsTo(User::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function documents(){
        return $this->hasMany(Document::class);
    }
}
