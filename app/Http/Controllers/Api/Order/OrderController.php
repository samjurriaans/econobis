<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Order;

use App\Eco\Contact\Contact;
use App\Eco\Order\Order;
use App\Helpers\Delete\DeleteHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Order\Grid\RequestQuery;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Order\OrderPeek;
use App\Http\Resources\Order\FullOrder;
use App\Http\Resources\Order\GridOrder;
use App\OrderProduct;

class OrderController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $orders = $requestQuery->get();

        $orders->load(['contact', 'orderProducts.product']);

        return GridOrder::collection($orders)
            ->additional(['meta' => [
            'total' => $requestQuery->total(),
            ]
        ]);
    }

    public function show(Order $order)
    {
        $order->load([
            'administration',
            'orderProducts.product',
            'contact',
            'createdBy',
            'emailTemplate',
            'emailTemplateReminder',
            'emailTemplateExhortation',
        ]);

        return FullOrder::make($order);
    }

    public function store(RequestInput $input)
    {
        $this->authorize('manage', Order::class);

        $data = $input
            ->integer('contactId')->validate('required|exists:contacts,id')->alias('contact_id')->next()
            ->integer('administrationId')->validate('required|exists:administrations,id')->alias('administration_id')->next()
            ->string('statusId')->validate('required')->alias('status_id')->next()
            ->string('subject')->validate('required')->next()
            ->integer('emailTemplateId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id')->next()
            ->integer('emailTemplateReminderId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_reminder_id')->next()
            ->integer('emailTemplateExhortationId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_exhortation_id')->next()
            ->string('collectionFrequencyId')->onEmpty(null)->whenMissing(null)->alias('collection_frequency_id')->next()
            ->string('collectionFrequencyId')->alias('collection_frequency_id')->next()
            ->string('paymentTypeId')->validate('required')->alias('payment_type_id')->next()
            ->string('IBAN')->onEmpty(null)->whenMissing(null)->next()
            ->string('ibanAttn')->onEmpty(null)->whenMissing(null)->alias('iban_attn')->next()
            ->string('poNumber')->onEmpty(null)->whenMissing(null)->alias('po_number')->next()
            ->string('invoiceText')->onEmpty(null)->whenMissing(null)->alias('invoice_text')->next()
            ->date('dateRequested')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_requested')->next()
            ->date('dateStart')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_start')->next()
            ->date('dateEnd')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_end')->next()
            ->get();

        $order = new Order($data);

        $order->save();

        return $this->show($order);
    }


    public function update(RequestInput $input, Order $order)
    {
        $this->authorize('manage', Order::class);

        $data = $input
            ->string('statusId')->validate('required')->alias('status_id')->next()
            ->string('subject')->validate('required')->next()
            ->integer('emailTemplateId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id')->next()
            ->integer('emailTemplateReminderId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_reminder_id')->next()
            ->integer('emailTemplateExhortationId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_exhortation_id')->next()
            ->string('collectionFrequencyId')->onEmpty(null)->whenMissing(null)->alias('collection_frequency_id')->next()
            ->string('paymentTypeId')->validate('required')->alias('payment_type_id')->next()
            ->string('IBAN')->onEmpty(null)->whenMissing(null)->next()
            ->string('ibanAttn')->onEmpty(null)->whenMissing(null)->alias('iban_attn')->next()
            ->string('poNumber')->onEmpty(null)->whenMissing(null)->alias('po_number')->next()
            ->string('invoiceText')->onEmpty(null)->whenMissing(null)->alias('invoice_text')->next()
            ->date('dateRequested')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_requested')->next()
            ->date('dateStart')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_start')->next()
            ->date('dateEnd')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_end')->next()
            ->get();

        $order = $order->fill($data);

        $order->save();

        //Validation sets string to date object. If we do ->fresh() we get the strings again(easier for front-end).
        return $this->show($order->fresh());
    }

    public function destroy(Order $order)
    {
        $this->authorize('manage', Order::class);

        DeleteHelper::delete($order);
    }

    public function storeOrderProduct(RequestInput $input)
    {
        $this->authorize('manage', Order::class);

        $data = $input
            ->string('productId')->validate('required|exists:products,id')->alias('product_id')->next()
            ->string('orderId')->validate('required|exists:orders,id')->alias('order_id')->next()
            ->integer('amount')->validate('required')->next()
            ->integer('amountReduction')->onEmpty(null)->whenMissing(null)->alias('amount_reduction')->next()
            ->integer('percentageReduction')->onEmpty(null)->whenMissing(null)->alias('percentage_reduction')->next()
            ->date('dateStart')->alias('date_start')->next()
            ->date('dateEnd')->alias('date_end')->next()
            ->get();

        $orderProduct = new OrderProduct($data);

        $orderProduct->save();

        return GenericResource::make($orderProduct);
    }

    public function updateOrderProduct(RequestInput $input)
    {
        $this->authorize('manage', Order::class);

        $data = $input
            ->string('productId')->validate('required|exists:products,id')->alias('product_id')->next()
            ->string('orderId')->validate('required|exists:orders,id')->alias('order_id')->next()
            ->integer('amount')->validate('required')->next()
            ->integer('amountReduction')->onEmpty(null)->whenMissing(null)->alias('amount_reduction')->next()
            ->integer('percentageReduction')->onEmpty(null)->whenMissing(null)->alias('percentage_reduction')->next()
            ->date('dateStart')->alias('date_start')->next()
            ->date('dateEnd')->alias('date_end')->next()
            ->get();

        $orderProduct = OrderProduct::where('product_id', $data['product_id'])->where('order_id', $data['order_id'])->get();

        $orderProduct->fill($data);

        $orderProduct->save();

        return GenericResource::make($orderProduct);
    }

    public function peek()
    {
        return OrderPeek::collection(Order::whereNull('deleted_at')->get());
    }

    public function getContactInfoForOrder(Contact $contact)
    {
        //Get email/name based on priority:
        //1 - organisation - administration email
        //2 - contact person administration + primary
        //3 - contact person administration
        //4 - contact person primary
        //5 - contact person other
        $contactInfo = [
            'email' => 'Geen e-mail bekend',
            'contactPerson' => $contact->full_name
        ];

        if($contact->isOrganisation()){
            $email = $this->getOrganisationAdministrationEmailAddress($contact);

            if (!$email && count($contact->contactPerson))
            {
                $contactInfo['email'] = $contact->contactPerson->contact->getOrderEmail() ? $contact->contactPerson->contact->getOrderEmail()->email : 'Geen e-mail bekend';
                $contactInfo['contactPerson'] = $contact->contactPerson->contact->full_name;
            }
            else{
                $contactInfo['email'] = $email->email;
            }
        }
        else{
            $contactInfo['email'] = $contact->getOrderEmail() ? $contact->getOrderEmail()->email : 'Geen e-mail bekend';
        }

        return $contactInfo;
    }

    protected function getOrganisationAdministrationEmailAddress(Contact $contact){
        $emailAddresses = $contact->emailAddresses->reverse();

        foreach($emailAddresses as $emailAddress) {
            if ($emailAddress->type_id === 'administration' && $emailAddress->primary) {
                return $emailAddress;
            }
        }

        foreach($emailAddresses as $emailAddress) {
            if ($emailAddress->type_id === 'administration') {
                return $emailAddress;
            }
        }

        return null;
    }

}