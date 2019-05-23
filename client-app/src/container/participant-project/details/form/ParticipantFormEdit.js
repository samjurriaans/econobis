import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');
import validator from 'validator';

import ParticipantProjectDetailsAPI from '../../../../api/participant-project/ParticipantProjectDetailsAPI';

import { fetchParticipantProjectDetails } from '../../../../actions/participants-project/ParticipantProjectDetailsActions';
import ContactsAPI from '../../../../api/contact/ContactsAPI';
import * as ibantools from 'ibantools';
import ViewText from '../../../../components/form/ViewText';
import InputToggle from '../../../../components/form/InputToggle';
import InputSelect from '../../../../components/form/InputSelect';
import InputText from '../../../../components/form/InputText';
import moneyPresenter from '../../../../helpers/MoneyPresenter';
import PanelFooter from '../../../../components/panel/PanelFooter';
import ButtonText from '../../../../components/button/ButtonText';
import ParticipantFormEditPostalcodeLinkCapital from './edit/ParticipantFormEditPostalcodeLinkCapital';
import ParticipantFormEditCapital from './edit/ParticipantFormEditCapital';
import ParticipantFormEditObligation from './edit/ParticipantFormEditObligation';

class ParticipantFormEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            didAcceptAgreement,
            giftedByContactId,
            ibanPayout,
            legalRepContactId,
            ibanPayoutAttn,
            typeId,
            powerKwhConsumption,
        } = props.participation;

        this.state = {
            contacts: [],
            participation: {
                id,
                didAcceptAgreement: Boolean(didAcceptAgreement),
                giftedByContactId: giftedByContactId ? giftedByContactId : '',
                ibanPayout: ibanPayout ? ibanPayout : '',
                legalRepContactId: legalRepContactId ? legalRepContactId : '',
                ibanPayoutAttn: ibanPayoutAttn ? ibanPayoutAttn : '',
                typeId,
                powerKwhConsumption: powerKwhConsumption ? powerKwhConsumption : '',
            },
            errors: {
                typeId: false,
                ibanPayout: false,
            },
        };
    }

    componentDidMount() {
        ContactsAPI.getContactsPeek().then(payload => {
            this.setState({
                contacts: payload,
            });
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            participation: {
                ...this.state.participation,
                [name]: value,
            },
        });
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            participation: {
                ...this.state.participation,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { participation } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(participation.contactId + '')) {
            errors.contactId = true;
            hasErrors = true;
        }
        if (validator.isEmpty(participation.statusId + '')) {
            errors.statusId = true;
            hasErrors = true;
        }
        if (validator.isEmpty(participation.projectId + '')) {
            errors.projectId = true;
            hasErrors = true;
        }
        if (validator.isEmpty(participation.typeId + '')) {
            errors.typeId = true;
            hasErrors = true;
        }
        if (!validator.isEmpty(participation.ibanPayout)) {
            if (!ibantools.isValidIBAN(participation.ibanPayout)) {
                errors.ibanPayout = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            ParticipantProjectDetailsAPI.updateParticipantProject(participation.id, participation).then(payload => {
                this.props.fetchParticipantProjectDetails(participation.id);
                this.props.switchToView();
            });
    };

    render() {
        const { didAcceptAgreement, giftedByContactId, ibanPayout, ibanPayoutAttn, typeId } = this.state.participation;

        const {
            contact,
            uniqueMutationStatuses,
            project,
            participationsDefinitive,
            participationsDefinitiveWorth,
            amountDefinitive,
            powerKwhConsumption,
        } = this.props.participation;

        const projectTypeCodeRef = project.projectType.codeRef;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <ViewText
                        label={'Contact'}
                        value={contact ? contact.fullName : ''}
                        link={contact ? 'contact/' + contact.id : ''}
                        className={'col-sm-6 form-group'}
                    />
                    <ViewText
                        label={'Status'}
                        value={uniqueMutationStatuses.map(item => item.name).join(', ')}
                        className={'col-sm-6 form-group'}
                    />
                </div>
                <div className="row">
                    <ViewText
                        label={'Project'}
                        value={project ? project.name : ''}
                        link={project ? 'project/' + project.id : ''}
                        className={'col-sm-6 form-group'}
                    />
                    <ViewText
                        label={'Administratie'}
                        value={project.administration ? project.administration.name : ''}
                        className={'col-sm-6 form-group'}
                    />
                </div>
                <div className="row">
                    <InputToggle
                        label={'Akkoord reglement'}
                        name={'didAcceptAgreement'}
                        id={'didAcceptAgreement'}
                        value={didAcceptAgreement}
                        onChangeAction={this.handleInputChange}
                    />
                </div>
                <div className="row">
                    <InputSelect
                        label={'Schenker'}
                        name={'giftedByContactId'}
                        id={'giftedByContactId'}
                        options={this.state.contacts}
                        optionName={'fullName'}
                        value={giftedByContactId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={'IBAN uitkeren'}
                        name={'ibanPayout'}
                        id={'ibanPayout'}
                        value={ibanPayout}
                        onChangeAction={this.handleInputChange}
                        error={this.state.errors.ibanPayout}
                    />
                </div>
                <div className="row">
                    {projectTypeCodeRef === 'obligation' ? (
                        <div className={'form-group col-md-6'} />
                    ) : (
                        <InputText
                            label={`Huidig saldo ${projectTypeCodeRef === 'loan' ? 'lening' : 'kapitaal'} rekening`}
                            name={'amountDefinitive'}
                            id={'amountDefinitive'}
                            value={amountDefinitive}
                            onChangeAction={() => {}}
                            readOnly={true}
                        />
                    )}
                    <InputText
                        label={'IBAN uitkeren t.n.v.'}
                        name={'ibanPayoutAttn'}
                        id={'ibanPayoutAttn'}
                        value={ibanPayoutAttn}
                        onChangeAction={this.handleInputChange}
                    />
                </div>
                <div className="row">
                    <ViewText
                        label={'Totale opbrengsten'}
                        id={'totalWorthParticipations'}
                        className={'col-sm-6 form-group'}
                        value={moneyPresenter(0)}
                    />
                    <InputSelect
                        label={'Uitkeren op'}
                        name={'typeId'}
                        id={'typeId'}
                        options={this.props.participantProjectPayoutTypes}
                        value={typeId}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.typeId}
                    />
                </div>
                {projectTypeCodeRef === 'obligation' ? (
                    <ParticipantFormEditObligation
                        participationWorth={project.participationWorth}
                        participationsDefinitive={participationsDefinitive}
                        participationsDefinitiveWorth={participationsDefinitiveWorth}
                        valueCourses={project.valueCourses}
                    />
                ) : null}
                {projectTypeCodeRef === 'capital' ? (
                    <ParticipantFormEditCapital
                        participationWorth={project.participationWorth}
                        participationsDefinitive={participationsDefinitive}
                        participationsDefinitiveWorth={participationsDefinitiveWorth}
                        valueCourses={project.valueCourses}
                    />
                ) : null}
                {projectTypeCodeRef === 'postalcode_link_capital' ? (
                    <ParticipantFormEditPostalcodeLinkCapital
                        participationWorth={project.participationWorth}
                        participationsDefinitive={participationsDefinitive}
                        participationsDefinitiveWorth={participationsDefinitiveWorth}
                        valueCourses={project.valueCourses}
                        powerKwhConsumption={powerKwhConsumption}
                        handleInputChange={this.handleInputChange}
                    />
                ) : null}
                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={this.props.switchToView}
                        />
                        <ButtonText
                            buttonText={'Opslaan'}
                            onClickAction={this.handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                        />
                    </div>
                </PanelFooter>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchParticipantProjectDetails: id => {
        dispatch(fetchParticipantProjectDetails(id));
    },
});

const mapStateToProps = state => {
    return {
        participation: state.participantProjectDetails,
        participantProjectStatuses: state.systemData.participantProjectStatus,
        participantProjectPayoutTypes: state.systemData.participantProjectPayoutTypes,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ParticipantFormEdit);