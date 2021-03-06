export default (type, field) => {
    switch (type) {
        case 'field':
            switch (field) {
                case 'id':
                    return 'Id';
                case 'number':
                    return 'Contact nummer';
                case 'typeId':
                    return 'Type';
                case 'fullName':
                    return 'Naam';
                case 'streetAndNumber':
                    return 'Straat';
                case 'postalCode':
                    return 'Postcode';
                case 'city':
                    return 'Woonplaats';
                case 'emailAddress':
                    return 'E-mailadres';
                case 'phoneNumber':
                    return 'Telefoon nummer';
                case 'statusId':
                    return 'Status';
                case 'name':
                    return 'Naam';
                case 'postalCodeNumber':
                    return 'Postcode nummer';
                case 'currentParticipations':
                    return 'Aantal participaties';
                case 'occupation':
                    return 'Verbinding';
                case 'opportunity':
                    return 'Kans';
                case 'product':
                    return 'Product';
                case 'dateStart':
                    return 'Product - Begin datum';
                case 'dateFinish':
                    return 'Product - Eind datum';
                case 'orderStatus':
                    return 'Product - Order status';
                case 'contactType':
                    return 'Contact type';
                case 'address':
                    return 'Adres';
                case 'participationStatusId':
                    return 'Participatie status';
                case 'dateRegister':
                    return 'Datum inschrijving';
                case 'energySupplierId':
                    return 'Energie leverancier';
                case 'datePayed':
                    return 'Datum betaald';
                case 'contactBirthday':
                    return 'Contact geboortedatum';
                case 'productionProjectId':
                    return 'Productieproject';
                case 'dateOfBirth':
                    return 'Geboortedatum';
                case 'energySupplier':
                    return 'Energie leverancier';
                case 'dateContractSend':
                    return 'Datum contract verzonden';
                case 'dateContractRetour':
                    return 'Datum contract retour';
                case 'dateEnd':
                    return 'Einddatum';
                case 'giftedByContactId':
                    return 'Geschonken door';
                case 'participationsSold':
                    return 'Participaties overgedragen';
                case 'didAcceptAgreement':
                    return 'Akkoord reglement';
                case 'participationsRequested':
                    return 'Participaties aangevraagd';
            }
            break;
        case 'comperator':
            switch (field) {
                case 'eq':
                    return 'gelijk aan';
                case 'neq':
                    return 'niet gelijk aan';
                case 'ct':
                    return 'bevat';
                case 'lt':
                    return 'kleiner dan';
                case 'lte':
                    return 'kleiner of gelijk aan';
                case 'gt':
                    return 'groter dan';
                case 'gte':
                    return 'groter dan of gelijk aan';
                case 'nl':
                    return 'is leeg';
                case 'nnl':
                    return 'is niet leeg';
                case 'bw':
                    return 'begint met';
                case 'nbw':
                    return 'begint niet met';
                case 'ew':
                    return 'eindigd met';
                case 'new':
                    return 'eindigd niet met';
            }
    }
};
