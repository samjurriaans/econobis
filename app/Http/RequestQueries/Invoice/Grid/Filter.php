<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Invoice\Grid;


use App\Helpers\RequestQuery\RequestFilter;
use Carbon\Carbon;

class Filter extends RequestFilter
{
    protected $fields = [
        'number',
        'dateRequested',
        'contact',
        'subject',
        'paymentTypeId',
        'statusId',
    ];

    protected $mapping = [
        'number' => 'invoices.number',
        'statusId' => 'invoices.status_id',
        'dateRequested' => 'invoices.date_requested',
        'subject' => 'orders.subject',
        'contact' => 'contacts.full_name',
        'paymentTypeId' => 'invoices.payment_type_id',
    ];

    protected $joins = [
        'contact' => 'contact',
        'subject' => 'order',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'paymentTypeId' => 'eq',
    ];

    protected function applyStatusIdFilter($query, $type, $data)
    {
        $extra_statusses = ['reminder', 'reminder_1', 'reminder_2', 'reminder_3', 'exhortation'];
        $closed_statusses = ['paid' ,'irrecoverable'];

        if(in_array($data, $extra_statusses)){
            switch ($data){
                case 'reminder':
                    $query->where(function ($q) use ($closed_statusses) {
                        $q->whereNotNull('invoices.date_reminder_1')
                            ->whereNull('invoices.date_exhortation')
                            ->orWhere(function ($q) {
                                $q->where('invoices.status_id', 'exported')
                                    ->where('invoices.date_requested', '<', Carbon::today()->subMonth());
                            })->orWhere(function ($q) {
                                $q->where('invoices.status_id', 'sent')->where('invoices.payment_type_id', 'transfer')
                                    ->where('invoices.date_requested', '<', Carbon::today()->subMonth());
                            });
                    })->whereNotIn('invoices.status_id', $closed_statusses);
                    return false;
                    break;
                case 'reminder_1':
                    $query->whereNotNull('invoices.date_reminder_1')->whereNull('invoices.date_reminder_2')->whereNull('invoices.date_reminder_3')->whereNull('invoices.date_exhortation')->whereNotIn('invoices.status_id', $closed_statusses);
                    return false;
                    break;
                case 'reminder_2':
                    $query->whereNotNull('invoices.date_reminder_2')->whereNull('invoices.date_reminder_3')->whereNull('invoices.date_exhortation')->whereNotIn('invoices.status_id', $closed_statusses);
                    return false;
                    break;
                case 'reminder_3':
                    $query->whereNotNull('invoices.date_reminder_3')->whereNull('invoices.date_exhortation')->whereNotIn('invoices.status_id', $closed_statusses);
                    return false;
                    break;
                case 'exhortation':
                    $query->whereNotNull('invoices.date_exhortation')->whereNotIn('invoices.status_id', $closed_statusses);
                    return false;
                    break;

            }

        }
        else{
            if(!in_array($data, $closed_statusses)){
                if($data === 'sent'){
                    $query->where(function ($q) {
                        $q->where(function ($q) {
                            $q->where('invoices.payment_type_id', 'transfer')
                                ->where('invoices.date_requested', '>=',
                                    Carbon::today()->subMonth());
                        })->orWhere(function ($q) {
                            $q->where('invoices.payment_type_id', '!=', 'transfer');
                        });});
                }
                if($data === 'exported'){
                    $query->where('invoices.date_requested', '>=', Carbon::today()->subMonth());
                }
                $query->whereNull('invoices.date_reminder_1')->whereNull('invoices.date_reminder_2')->whereNull('invoices.date_reminder_3')->whereNull('invoices.date_exhortation');
            }
            return true;
        }
    }
}
