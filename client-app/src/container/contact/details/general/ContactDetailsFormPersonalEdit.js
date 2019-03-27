import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import validator from 'validator';

import { updatePerson } from '../../../../actions/contact/ContactDetailsActions';
import PersonAPI from '../../../../api/contact/PersonAPI';
import OrganisationAPI from '../../../../api/contact/OrganisationAPI';
import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';
import InputToggle from '../../../../components/form/InputToggle';

class ContactDetailsFormPersonalEdit extends Component {
    constructor(props) {
        super(props);

        const { number, createdAt, person, newsletter, didAgreeAvg } = props.contactDetails;

        this.state = {
            lastNamePrefixes: props.lastNamePrefixes,
            organisationPeek: [
                {
                    id: person.organisation ? person.organisation.id : '',
                    name: person.organisation ? person.organisation.name : '',
                },
            ],
            person: {
                id: person.id,
                number: number,
                createdAt: createdAt.date,
                titleId: person.title ? person.title.id : '',
                initials: person.initials ? person.initials : '',
                firstName: person.firstName,
                lastNamePrefixId: person.lastNamePrefixId ? person.lastNamePrefixId : '',
                lastNamePrefix: person.lastNamePrefix ? person.lastNamePrefix : '',
                lastName: person.lastName,
                dateOfBirth: person.dateOfBirth ? moment(person.dateOfBirth.date).format('Y-MM-DD') : '',
                newsletter: newsletter,
                didAgreeAvg: didAgreeAvg,
            },
            errors: {
                name: false,
            },
        };
    }

    componentDidMount() {
        let lastNamePrefixes = this.state.lastNamePrefixes;

        const hasNullObject = this.hasNullObject({ id: 'null', name: '' }, lastNamePrefixes);
        if (!hasNullObject) {
            lastNamePrefixes.unshift({ id: 'null', name: '' });
        }
        OrganisationAPI.getOrganisationPeek().then(payload => {
            this.setState({
                ...this.state,
                organisationPeek: payload,
                lastNamePrefixes: lastNamePrefixes,
            });
        });
    }

    hasNullObject = (obj, list) => {
        let i;
        for (i = 0; i < list.length; i++) {
            if (list[i].id === 'null') {
                return true;
            }
        }

        return false;
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            person: {
                ...this.state.person,
                [name]: value,
            },
        });
    };

    handleChangeDateOfBirth = date => {
        const formattedDate = date ? moment(date).format('Y-MM-DD') : '';

        this.setState({
            ...this.state,
            person: {
                ...this.state.person,
                dateOfBirth: formattedDate,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { person } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(person.firstName) && validator.isEmpty(person.lastName)) {
            errors.name = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            PersonAPI.updatePerson(person)
                .then(payload => {
                    this.props.updatePerson(payload.data.data);
                    this.props.switchToView();
                })
                .catch(function(error) {
                    console.log(error);
                    alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het opnieuw.');
                });
    };

    render() {
        const {
            number,
            createdAt,
            titleId,
            initials,
            firstName,
            lastNamePrefixId,
            lastName,
            dateOfBirth,
            newsletter,
            didAgreeAvg,
            lastNamePrefix,
        } = this.state.person;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={'Contactnummer'}
                        divSize={'col-xs-12'}
                        name={'number'}
                        readOnly={true}
                        value={number}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={'Gemaakt op'}
                        divSize={'col-xs-12'}
                        id={'created_at'}
                        name={'createdAt'}
                        value={moment(createdAt).format('DD-MM-Y')}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={'Aanspreektitel'}
                        size={'col-xs-12'}
                        name={'titleId'}
                        options={this.props.titles}
                        value={titleId}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Voorletters"
                        divSize={'col-xs-12'}
                        name={'initials'}
                        value={initials}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Voornaam"
                        divSize={'col-xs-12'}
                        name={'firstName'}
                        value={firstName}
                        onChangeAction={this.handleInputChange}
                        required={lastName === '' && 'required'}
                        error={this.state.errors.name}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={'Tussenvoegsel'}
                        size={'col-xs-12'}
                        name={'lastNamePrefixId'}
                        options={this.state.lastNamePrefixes}
                        value={lastNamePrefixId}
                        onChangeAction={this.handleInputChange}
                        placeholder={lastNamePrefix ? lastNamePrefix : ''}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={'Achternaam'}
                        divSize={'col-xs-12'}
                        name="lastName"
                        value={lastName}
                        onChangeAction={this.handleInputChange}
                        required={firstName === '' && 'required'}
                        error={this.state.errors.name}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label={'Geboortedatum'}
                        divSize={'col-xs-12'}
                        name={'dateOfBirth'}
                        value={dateOfBirth}
                        onChangeAction={this.handleChangeDateOfBirth}
                    />
                </div>

                <div className="row">
                    <InputToggle
                        label={'Nieuwsbrief'}
                        divSize={'col-xs-12'}
                        className={'field-to-be-removed'}
                        name={'newsletter'}
                        value={newsletter}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputToggle
                        label="Akkoord privacybeleid"
                        divSize={'col-xs-12'}
                        name="didAgreeAvg"
                        value={didAgreeAvg}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

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

const mapStateToProps = state => {
    return {
        contactDetails: state.contactDetails,
        lastNamePrefixes: state.systemData.lastNamePrefixes,
        titles: state.systemData.titles,
    };
};

const mapDispatchToProps = dispatch => ({
    updatePerson: id => {
        dispatch(updatePerson(id));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactDetailsFormPersonalEdit);
