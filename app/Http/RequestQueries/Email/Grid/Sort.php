<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\Email\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{

    protected $fields = [
        'date',
        'mailbox',
        'sentBy',
        'to',
        'subject',
        'statusId',
    ];

    protected $mapping = [
        'date' => 'emails.date_sent',
        'mailbox' => 'mailboxes.name',
        'sentBy' => 'emails.from',
        'to' => 'emails.to',
        'subject' => 'emails.subject',
        'statusId'  => 'emails.status',
    ];

    protected $joins = [
        'mailbox' => 'mailboxes',
    ];

}
