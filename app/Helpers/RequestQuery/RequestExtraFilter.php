<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 10:29
 */

namespace App\Helpers\RequestQuery;


abstract class RequestExtraFilter extends RequestFilter
{
    protected $parameterName = 'extraFilters';
}