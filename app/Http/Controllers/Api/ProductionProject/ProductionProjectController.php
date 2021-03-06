<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\ProductionProject;

use App\Eco\Contact\ContactStatus;
use App\Eco\Email\Email;
use App\Eco\ParticipantProductionProject\ParticipantProductionProjectStatus;
use App\Eco\ProductionProject\ProductionProject;
use App\Helpers\Delete\Models\DeleteProductionProject;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\ProductionProject\Grid\RequestQuery;
use App\Http\Resources\ProductionProject\FullProductionProject;
use App\Http\Resources\ProductionProject\GridProductionProject;
use App\Http\Resources\ProductionProject\ProductionProjectPeek;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductionProjectController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $productionProjects = $requestQuery->get();

        return GridProductionProject::collection($productionProjects)
            ->additional(['meta' => [
            'total' => $requestQuery->total(),
            ]
        ]);
    }

    public function show(ProductionProject $productionProject)
    {
        $productionProject->load([
            'productionProjectStatus',
            'productionProjectType',
            'ownedBy',
            'createdBy',
            'productionProjectValueCourses.productionProject',
            'productionProjectValueCourses.createdBy',
            'productionProjectRevenues.type',
            'productionProjectRevenues.category',
            'productionProjectRevenues.createdBy',
            'tasks',
            'documents',
            'administration',
            'requiresContactGroups',
        ]);

        $productionProject->relatedEmailsInbox = $this->getRelatedEmails($productionProject->id, 'inbox');
        $productionProject->relatedEmailsSent = $this->getRelatedEmails($productionProject->id, 'sent');

        return FullProductionProject::make($productionProject);
    }

    public function store(Request $request, RequestInput $requestInput)
    {

        $this->authorize('manage', ProductionProject::class);

        $data = $requestInput
            ->string('name')->validate('required')->next()
            ->string('code')->validate('required')->next()
            ->string('description')->next()
            ->integer('ownedById')->validate('required|exists:users,id')->alias('owned_by_id')->next()
            ->integer('productionProjectStatusId')->validate('nullable|exists:production_project_status,id')->onEmpty(null)->alias('production_project_status_id')->next()
            ->integer('administrationId')->validate('nullable|exists:administrations,id')->onEmpty(null)->alias('administration_id')->next()
            ->date('dateStart')->validate('nullable|date')->onEmpty(null)->alias('date_start')->next()
            ->date('dateProduction')->validate('nullable|date')->onEmpty(null)->alias('date_production')->next()
            ->date('dateStartRegistrations')->validate('nullable|date')->onEmpty(null)->alias('date_start_registrations')->next()
            ->date('dateEndRegistrations')->validate('nullable|date')->onEmpty(null)->alias('date_end_registrations')->next()
            ->integer('productionProjectTypeId')->validate('nullable|exists:production_project_type,id')->onEmpty(null)->alias('production_project_type_id')->next()
            ->string('postalCode')->alias('postal_code')->next()
            ->string('address')->next()
            ->string('city')->next()
            ->string('ean')->next()
            ->string('eanManager')->alias('ean_manager')->next()
            ->string('warrantyOrigin')->alias('warranty_origin')->next()
            ->string('eanSupply')->alias('ean_supply')->next()
            ->integer('participationWorth')->alias('participation_worth')->next()
            ->integer('powerKwAvailable')->alias('power_kw_available')->next()
            ->integer('maxParticipations')->alias('max_participations')->next()
            ->string('taxReferral')->alias('tax_referral')->next()
            ->string('postalcodeLink')->onEmpty(null)->alias('postalcode_link')->next()
            ->integer('maxParticipationsYouth')->alias('max_participations_youth')->next()
            ->integer('totalParticipations')->alias('total_participations')->next()
            ->integer('minParticipations')->alias('min_participations')->next()
            ->boolean('isMembershipRequired')->alias('is_membership_required')->next()
            ->boolean('isParticipationTransferable')->alias('is_participation_transferable')->next()
            ->get();

        $productionProject = new ProductionProject();

        $productionProject->fill($data);

        $productionProject->save();

        $contactGroupIds = explode(',', $request->contactGroupIds);

        if ($contactGroupIds[0] == '') {
            $contactGroupIds = [];
        }

        $productionProject->requiresContactGroups()->sync($contactGroupIds);

        return $this->show($productionProject);
    }


    public function update(Request $request, RequestInput $requestInput, ProductionProject $productionProject)
    {
        $this->authorize('manage', ProductionProject::class);

        $data = $requestInput
            ->string('name')->validate('required')->next()
            ->string('code')->validate('required')->next()
            ->string('description')->next()
            ->integer('ownedById')->validate('required|exists:users,id')->alias('owned_by_id')->next()
            ->integer('productionProjectStatusId')->validate('nullable|exists:production_project_status,id')->onEmpty(null)->alias('production_project_status_id')->next()
            ->integer('administrationId')->validate('nullable|exists:administrations,id')->onEmpty(null)->alias('administration_id')->next()
            ->date('dateStart')->validate('nullable|date')->onEmpty(null)->alias('date_start')->next()
            ->date('dateProduction')->validate('nullable|date')->onEmpty(null)->alias('date_production')->next()
            ->date('dateStartRegistrations')->validate('nullable|date')->onEmpty(null)->alias('date_start_registrations')->next()
            ->date('dateEndRegistrations')->validate('nullable|date')->onEmpty(null)->alias('date_end_registrations')->next()
            ->integer('productionProjectTypeId')->validate('nullable|exists:production_project_type,id')->onEmpty(null)->alias('production_project_type_id')->next()
            ->string('postalCode')->alias('postal_code')->next()
            ->string('address')->next()
            ->string('city')->next()
            ->string('ean')->next()
            ->string('eanManager')->alias('ean_manager')->next()
            ->string('warrantyOrigin')->alias('warranty_origin')->next()
            ->string('eanSupply')->alias('ean_supply')->next()
            ->integer('participationWorth')->alias('participation_worth')->next()
            ->integer('powerKwAvailable')->alias('power_kw_available')->next()
            ->integer('maxParticipations')->alias('max_participations')->next()
            ->string('taxReferral')->alias('tax_referral')->next()
            ->string('postalcodeLink')->onEmpty(null)->alias('postalcode_link')->next()
            ->integer('maxParticipationsYouth')->alias('max_participations_youth')->next()
            ->integer('totalParticipations')->alias('total_participations')->next()
            ->integer('minParticipations')->alias('min_participations')->next()
            ->boolean('isMembershipRequired')->alias('is_membership_required')->next()
            ->boolean('isParticipationTransferable')->alias('is_participation_transferable')->next()
            ->get();

        $productionProject->fill($data);

        $productionProject->save();

        $contactGroupIds = explode(',', $request->contactGroupIds);

        if ($contactGroupIds[0] == '') {
            $contactGroupIds = [];
        }

        $productionProject->requiresContactGroups()->sync($contactGroupIds);

        return $this->show($productionProject);
    }

    public function destroy(ProductionProject $productionProject)
    {
        $this->authorize('manage', ProductionProject::class);

        try {
            DB::beginTransaction();

            $deleteProductionProject = new DeleteProductionProject($productionProject);
            $result = $deleteProductionProject->delete();

            if(count($result) > 0){
                DB::rollBack();
                abort(412, implode(";", array_unique($result)));
            }

            DB::commit();
        } catch (\PDOException $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            abort(501, 'Er is helaas een fout opgetreden.');
        }
    }

    public function peek()
    {
        return ProductionProjectPeek::collection(ProductionProject::orderBy('id')->get());
    }

    public function getObligationNumbers(ProductionProject $productionProject){
        $obligationNumbers = [];

        foreach ($productionProject->participantsProductionProject as $participation){
            $obligationNumbers = array_merge($obligationNumbers, $participation->obligationNumbers()->pluck('number')->toArray());
        }

        return $obligationNumbers;
    }

    public function getRelatedEmails($id, $folder)
    {
        return Email::where('production_project_id', $id)->where('folder', $folder)->get();
    }

    public function getActive(){
        return ProductionProject::whereIn('production_project_status_id', [1,2])->pluck('id');
    }

    public function getChartData(ProductionProject $productionProject){
        $participantProductionProjectStatuses = ParticipantProductionProjectStatus::all();

        $chartData = [];

        foreach($participantProductionProjectStatuses as $participantProductionProjectStatus) {
            $chartData[] = [
                "name" => $participantProductionProjectStatus->name,
                "count" => count($productionProject->participantsProductionProject) ? $productionProject->participantsProductionProject()->where('status_id', $participantProductionProjectStatus->id)->count() : 0,
            ];
        };

        return ['code' => $productionProject->code, 'data' => $chartData];
    }

    public function getChartDataParticipations(ProductionProject $productionProject){
        $participantProductionProjectStatuses = ParticipantProductionProjectStatus::all();

        $chartData = [];

        foreach($participantProductionProjectStatuses as $participantProductionProjectStatus) {
            $total = 0;

            foreach ($productionProject->participantsProductionProject as $participant){
                if($participant->status_id == $participantProductionProjectStatus->id){
                    $total += ($participant->participations_granted - $participant->participations_sold);
                }
            }
            $chartData[] = [
                "name" => $participantProductionProjectStatus->name,
                "count" => $total,
            ];
        };

        return ['code' => $productionProject->code, 'data' => $chartData];
    }

    public function getChartDataStatus(ProductionProject $productionProject){
        $contactStatuses = ContactStatus::collection();

        $chartData = [];

        foreach($contactStatuses as $contactStatus) {
            $chartData[] = [
                "name" => $contactStatus->name,
                "count" => count($productionProject->participantsProductionProject) ? $productionProject->participantsProductionProject()->leftJoin('contacts', 'participation_production_project.contact_id', '=', 'contacts.id')->where('contacts.status_id', $contactStatus->id)->count() : 0,
            ];
        };

        return ['code' => $productionProject->code, 'data' => $chartData];
    }
}