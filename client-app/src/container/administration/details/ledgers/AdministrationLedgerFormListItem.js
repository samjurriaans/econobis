import React, {Component} from 'react';
import { connect } from 'react-redux';

import AdministrationDetailsAPI from '../../../../api/administration/AdministrationDetailsAPI';
import {updateLedger} from '../../../../actions/administration/AdministrationDetailsActions';
import AdministrationLedgerFormView from './AdministrationLedgerFormView';
import AdministrationLedgerFormEdit from './AdministrationLedgerFormEdit';
import {isEqual} from "lodash";
import validator from "validator";

class AdministrationLedgerFormListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            ledger: {
                ...props.ledger,
            },
            errors: {
                code: false,
                name: false,
            },
        };
    };

    onLineEnter = () => {
        this.setState({
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            showActionButtons: false,
            highlightLine: '',
        });
    };

    openEdit = () => {
        this.setState({showEdit: true});
    };

    closeEdit = () => {
        this.setState({showEdit: false});
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            ledger: {...this.props.ledger},
        });

        this.closeEdit();
    };


    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            ledger: {
                ...this.state.ledger,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { ledger } = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(ledger.code)){
            errors.code = true;
            hasErrors = true;
        }

        if(validator.isEmpty(ledger.name)){
            errors.name = true;
            hasErrors = true;
        }


        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
        AdministrationDetailsAPI.updateLedger(ledger).then((payload) => {
            this.props.updateLedger(payload);
            this.closeEdit();
        });
    };

    render() {
        return (
            <div>
                <AdministrationLedgerFormView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    ledger={this.state.ledger}
                />
                {
                    this.state.showEdit && this.props.permissions.manageFinancial &&
                    <AdministrationLedgerFormEdit
                        ledger={this.state.ledger}
                        handleInputChange={this.handleInputChange}
                        handleSubmit={this.handleSubmit}
                        cancelEdit={this.cancelEdit}
                        errors={this.state.errors}
                    />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        id: state.administrationDetails.id,
        permissions: state.meDetails.permissions,
    };
};

const mapDispatchToProps = dispatch => ({
    updateLedger: (obligationNumber) => {
        dispatch(updateLedger(obligationNumber));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdministrationLedgerFormListItem);
