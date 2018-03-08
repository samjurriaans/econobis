<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\PostalCodeLink\Grid;


use App\Eco\Intake\Intake;
use App\Eco\PostalCodeLink\PostalCodeLink;
use App\Eco\Team\Team;
use Illuminate\Http\Request;

class RequestQuery extends \App\Helpers\RequestQuery\RequestQuery
{

    public function __construct(Request $request,
                                Filter $filter,
                                Sort $sort,
                                Joiner $joiner)
    {
        parent::__construct($request, $filter, $sort, $joiner);
    }

    protected function baseQuery()
    {
        return PostalCodeLink::query()
            ->select('postalcode_links.*');
    }
}