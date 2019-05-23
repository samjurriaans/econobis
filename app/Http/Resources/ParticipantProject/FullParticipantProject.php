<?php

namespace App\Http\Resources\ParticipantProject;

use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\GenericResource;
use App\Http\Resources\ParticipantMutation\FullParticipantMutation;
use App\Http\Resources\ParticipantTransaction\FullParticipantTransaction;
use App\Http\Resources\Project\FullProject;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullParticipantProject extends Resource
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
                'name' => $this->contact->full_name . ' ' . $this->project->name,
                'contactId' => $this->contact_id,
                'contact' => FullContact::make($this->whenLoaded('contact')),
                'statusId' => $this->status_id,
                'status' => GenericResource::make($this->whenLoaded('participantProjectStatus')),
                'projectId' => $this->project_id,
                'project' => FullProject::make($this->whenLoaded('project')),
                'participationsRequested' => $this->participations_requested,
                'participationsGranted' => $this->participations_granted,
                'participationsCurrent' => $this->participations_current,
                'participationsWorthTotal' => $this->participations_worth_total,
                'participationsSold' => $this->participations_sold,
                'participationsRestSale' => $this->participations_rest_sale,
                'didAcceptAgreement' => $this->did_accept_agreement,
                'giftedByContactId' => $this->gifted_by_contact_id,
                'giftedByContact' => FullContact::make($this->whenLoaded('giftedByContact')),
                'ibanPayout' => $this->iban_payout,
                'ibanPayoutAttn' => $this->iban_payout_attn,
                'typeId' => $this->type_id,
                'type' => GenericResource::make($this->whenLoaded('participantProjectPayoutType')),
                'powerKwhConsumption' => $this->power_kwh_consumption,
                'createdAt' => $this->created_at,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'updatedAt' => $this->updated_at,
                'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
                'participantTransactions' => FullParticipantTransaction::collection($this->whenLoaded('transactions')),
                'participantMutations' => FullParticipantMutation::collection($this->whenLoaded('mutations')),
                'obligationNumbers' => GenericResource::collection($this->whenLoaded('obligationNumbers')),
                'documentCount' => $this->documents()->count(),
                'relatedDocuments' => FullDocument::collection($this->whenLoaded('documents')),
                'participationsDefinitive' => $this->participations_definitive,
                'participationsDefinitiveWorth' => $this->participations_definitive_worth,
                'participationsOptioned' => $this->participations_optioned,
                'amountDefinitive' => $this->amount_definitive,
                'amountOptioned' => $this->amount_optioned,
                'uniqueMutationStatuses' => $this->uniqueMutationStatuses,
            ];
    }
}