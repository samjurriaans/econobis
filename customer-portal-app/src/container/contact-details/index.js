import React, { useState, useEffect, useRef } from 'react';
import { PortalUserConsumer } from '../../context/PortalUserContext';
import DefaultContactView from '../contact/DefaultContactView';
import ContactAPI from '../../api/contact/ContactAPI';
import rebaseContact from '../../helpers/RebaseContact';
import LoadingView from '../../components/general/LoadingView';

const ContactDetails = function(props) {
    const [contact, setContact] = useState({});
    const [isLoading, setLoading] = useState(true);
    const prevInControl = usePrevious(props.currentSelectedContact);

    useEffect(() => {
        // If there is an id and is not the same as previous id
        // then call api
        if (props.currentSelectedContact.id) {
            if (prevInControl.id != props.currentSelectedContact.id) {
                (function callFetchContact() {
                    setLoading(true);
                    ContactAPI.fetchContact(props.currentSelectedContact.id)
                        .then(payload => {
                            const contactData = rebaseContact(payload.data.data);

                            setContact(contactData);
                            setLoading(false);
                        })
                        .catch(error => {
                            alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                            setLoading(false);
                        });
                })();
            }
        }
    }, [props.currentSelectedContact]);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    return (
        <div className="content-section">
            {isLoading ? (
                <LoadingView />
            ) : (
                <div className="content-container w-container">
                    <h1 className="content-heading">Contactgegevens</h1>
                    <div className="w-form" />
                    {/* If contact is person */}
                    {contact.typeId === 'person' ? <DefaultContactView initialContact={contact} /> : null}
                    {/* If contact is organisation */}
                    {contact.typeId === 'organisation' ? <div>{contact.fullName}</div> : null}
                </div>
            )}
        </div>
    );
};

export default function ContactDetailsWithContext(props) {
    return (
        <PortalUserConsumer>
            {({ updateUser, currentSelectedContact }) => (
                <ContactDetails {...props} updateUser={updateUser} currentSelectedContact={currentSelectedContact} />
            )}
        </PortalUserConsumer>
    );
}