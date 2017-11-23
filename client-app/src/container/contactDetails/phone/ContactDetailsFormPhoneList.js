import React from 'react';
import {connect} from 'react-redux';

import ContactDetailFormPhoneItem from "./ContactDetailsFormPhoneItem";

const ContactDetailsFormPhoneList = props => {
    return (
        <div>
            <div className="row header">
                <div className="col-sm-2">Type</div>
                <div className="col-sm-8">Telefoonnummers</div>
                <div className="col-sm-1">Primair</div>
                <div className="col-sm-1"></div>
            </div>
            {
                props.phoneNumbers.length > 0 ?
                    props.phoneNumbers.map(phoneNumber => {
                        return <ContactDetailFormPhoneItem
                            key={phoneNumber.id}
                            phoneNumber={phoneNumber}
                        />;
                    })
                    :
                    <div>Geen telefoonnummers bekend</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        phoneNumbers: state.contactDetails.phoneNumbers,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormPhoneList);
