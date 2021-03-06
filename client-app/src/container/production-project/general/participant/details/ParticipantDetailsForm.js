import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import ParticipantFormGeneral from './form/ParticipantFormGeneral';
import TransactionForm from './transaction/TransactionForm';
import ObligationNumberForm from './obligation-number/ObligationNumberForm';

class ParticipantDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van participanten.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.participantProductionProject)) {
            loadingText = 'Geen participanten gevonden!';
        } else {
            loading = false;
        }
        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <ParticipantFormGeneral />
                <TransactionForm />
                <ObligationNumberForm />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        participantProductionProject: state.participantProductionProjectDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps)(ParticipantDetailsForm);
