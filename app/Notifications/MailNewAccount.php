<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class MailNewAccount extends Notification
{
    public $emailAddress;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($emailAddress)
    {
        $this->emailAddress = $emailAddress;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject("Bevestiging gebruik Econobis")
            ->greeting("Hallo! Je bent nu gebruiker van Econobis")
            ->line("Je bent nu gebruiker van de Econobis van " . \Config::get('app.name') . ". Met jouw account bestaande uit je gebruikersnaam " . $this->emailAddress . " en je aangemaakte wachtwoord, kun je inloggen op de Econobis-omgeving van je organisatie:")
            ->line(\Config::get('app.url'))
            ->line('Je was reeds gebruiker op Alfresco. Je inloggegevens blijven hetzelfde en zijn niet gewijzigd.')
            ->line('<b>Econobis Community Portaal</b>')
            ->line('In Alfresco hebben we een <a href="https://alfresco.econobis.nl/share/page/site/econobis-community-portaal/dashboard">Community Portaal</a> ingericht.')
            ->line('Dit is een informatiesite voor gebruikers van Econobis. Je kunt inloggen met je gebruikersnaam wachtwoord (zelfde als Econobis).')
            ->line('Op deze site vind je:')
            ->line("<ul>")
            ->line("<li><p><a href='https://alfresco.econobis.nl/share/page/site/econobis-community-portaal/wiki-page?title=Main_Page'>Wiki Econobis:</a> De handleiding van Econobis, in de vorm van een wiki.</p></li>")
            ->line("<li><p><a href='https://alfresco.econobis.nl/share/page/site/econobis-community-portaal/discussions-topiclist'>Forum Econobis</a>: De plek om vragen te stellen aan je medegebruikers.</p></li>")
            ->line("</ul>")
            ->line("NB. De wikipagina’s van Econobis zijn ‘work in progress’. We doen onze uiterste best om deze pagina’s volledig en up to date te houden, maar het kan voorkomen dat informatie (nog) niet compleet of verouderd is. Heb je informatie of werkwijzen die interessant zijn voor deze wiki, geef dit dan door aan de key user van je organisatie.")
            ->line("<b>Alfresco organisatiesite</b>")
            ->line("Het kan zijn dat jouw organisatie ook gebruik gaat maken van een eigen site in Alfresco om documenten te delen. In dat geval informeert de Econobis key user van je organisatie je hierover. ")
            ->line("<b>Econobis key user</b>")
            ->line("Heb je vragen over het gebruik van Econobis? Raadpleeg dan eerst de Econobis key user van je organisatie. Hij of zij kan indien nodig contact opnemen met de Econobis beheerders.");
    }

}