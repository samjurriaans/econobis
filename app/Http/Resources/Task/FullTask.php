<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 12-12-2017
 * Time: 16:04
 */

namespace App\Http\Resources\Task;


use App\Http\Resources\Campaign\FullCampaign;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\ContactGroup\FullContactGroup;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\Intake\FullIntake;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullTask extends Resource
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
                'name' => $this->name,
                'description' => $this->description,
                'typeId' => $this->type_id,
                'type' => GenericResource::make($this->whenLoaded('type')),
                'contactId' => $this->contact_id,
                'contact' => FullContact::make($this->whenLoaded('contact')),
                'statusId' => $this->status_id,
                'status' => GenericResource::make($this->getStatus()),
                'intakeId' => $this->intake_id,
                'intakeName' => $this->intake ? $this->intake->address->present()->streetAndNumber() : '',
                'contactGroupId' => $this->contact_group_id,
                'contactGroup' => FullContactGroup::make($this->whenLoaded('contactGroup')),
                'campaignId' => $this->campaign_id,
                'campaign' => FullCampaign::make($this->whenLoaded('campaign')),
                'datePlanned' => $this->date_planned,
                'startTimePlanned' => $this->start_time_planned,
                'endTimePlanned' => $this->end_time_planned,
                'dateFinished' => $this->date_finished,
                'responsibleUserId' => $this->responsible_user_id,
                'responsibleUser' => FullUser::make($this->whenLoaded('responsibleUser')),
                'finishedById' => $this->finished_by_id,
                'finishedBy' => FullUser::make($this->whenLoaded('finishedBy')),
                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'attachments' => FullTaskAttachment::collection($this->whenLoaded('attachments')),
                'attachmentCount' => $this->attachments()->count(),
                'properties' => FullTaskPropertyValue::collection($this->whenLoaded('properties')),
                'opportunityId' => $this->opportunity_id,
                'opportunity' => FullOpportunity::make($this->whenLoaded('opportunity')),
                'opportunityName' => $this->opportunity ? $this->opportunity->measure->name . ' ' . $this->opportunity->status->name : '',
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ];
    }
}