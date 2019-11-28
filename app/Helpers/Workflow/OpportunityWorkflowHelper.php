<?php

namespace App\Helpers\Workflow;

use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Opportunity\Opportunity;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Support\Facades\Mail;

class OpportunityWorkflowHelper
{

    public function __construct(Opportunity $opportunity)
    {
        $this->opportunity = $opportunity;
        $this->opportunity_status = $opportunity->status;
        $this->contact = $opportunity->intake->contact;
//todo toevoegen custom-portal branch
//        $this->cooperativeName = PortalSettings::get('cooperativeName');

    }

    public function processWorkflowEmail(){
        set_time_limit(0);

        // Emails moeten vanuit de default mailbox worden verstuurd ipv de mail instellingen in .env
        // Daarom hier eerst de emailconfiguratie overschrijven voordat we gaan verzenden.
        (new EmailHelper())->setConfigToDefaultMailbox();

        if (!$this->opportunity_status) {
            return false;
        }
        if (!$this->contact) {
            return false;
        }

        $emailTemplate = EmailTemplate::find($this->opportunity_status->email_template_id_wf);
        if (!$emailTemplate) {
            return false;
        }
        if(!$this->contact->primaryEmailAddress)
        {
            return false;
        }

        $mail = Mail::to($this->contact->primaryEmailAddress);
        $this->mailWorkflow($emailTemplate, $mail);
        return true;
    }

    public function mailWorkflow($emailTemplate, $mail)
    {
//todo toevoegen custom-portal branch
//            $subject = $emailTemplate->subject ? $emailTemplate->subject : 'Bericht van ' . $this->cooperativeName;
        $subject = $emailTemplate->subject ? $emailTemplate->subject : 'Bericht van Econobis';
        $htmlBody = $emailTemplate->html_body;

//todo toevoegen custom-portal branch
//        $subject = str_replace('{cooperatie_naam}', $this->cooperativeName, $subject);
        if($this->contact) {
            $subject = str_replace('{contactpersoon}', $this->contact->full_name, $subject);
            $htmlBody = str_replace('{contactpersoon}', $this->contact->full_name, $htmlBody);
            $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody, 'contact', $this->contact);
        }

//todo toevoegen custom-portal branch
//        $htmlBody = TemplateVariableHelper::replaceTemplateCooperativeVariables($htmlBody,'cooperatie' );

        $htmlBody = TemplateVariableHelper::stripRemainingVariableTags($htmlBody);

        $htmlBody
            = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
            . $subject . '</title></head>'
            . $htmlBody . '</html>';


        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }

}