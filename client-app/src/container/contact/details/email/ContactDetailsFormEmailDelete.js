import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteEmailAddress } from '../../../../actions/contact/ContactDetailsActions';

const ContactDetailsEmailDelete = props => {
    const confirmAction = () => {
        props.deleteEmailAddress(props.id);
        props.closeDeleteItemModal();
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            <p>
                Verwijder e-mailadres: <strong> {`${props.email}`} </strong>
            </p>

            {props.primary && (
                <p className={'text-danger'}>
                    <strong>Let op!</strong> Dit is een primair e-mailadres
                </p>
            )}
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteEmailAddress: id => {
        dispatch(deleteEmailAddress(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ContactDetailsEmailDelete);
