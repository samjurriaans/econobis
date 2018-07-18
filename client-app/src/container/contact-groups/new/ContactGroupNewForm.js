import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import validator from 'validator';
import moment from 'moment';

import UsersAPI from '../../../api/user/UsersAPI';
import ContactGroupAPI from '../../../api/contact-group/ContactGroupAPI';
import InputText from '../../../components/form/InputText';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';
import InputToggle from "../../../components/form/InputToggle";

class ContactGroupNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactsWithPermission: [],
            contactGroup: {
                id: '',
                name: '',
                description: '',
                closed: false,
                responsibleUserId: '',
                dateStarted: '',
                dateFinished: '',
                showContactForm: false,
                showPortal: false,
                editPortal: false,
            },
            errors: {
                name: false,
            },
        }
    };

    componentDidMount() {
        const { permissions } = this.props;

        UsersAPI.fetchUsersWithPermission(permissions.find((permission) => permission.name === 'manage_group').id).then((payload) => {
            this.setState({ contactsWithPermission: payload });
        });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            contactGroup: {
                ...this.state.contactGroup,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { contactGroup }  = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(contactGroup.name)){
            errors.name = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors })

        // If no errors send form
        !hasErrors &&
            ContactGroupAPI.newContactGroup(contactGroup).then((payload) => {
                hashHistory.push("/contact-groep/" + payload.id);
            });
    };

    handleChangeStartedDate = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            contactGroup: {
                ...this.state.contactGroup,
                dateStarted: formattedDate
            },
        });
    };

    handleChangeFinishedDate = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            contactGroup: {
                ...this.state.contactGroup,
                dateFinished: formattedDate
            },
        });
    };

    render() {
        const { name, description, responsibleUserId, closed, dateStarted, dateFinished, showPortal, editPortal, showContactForm } = this.state.contactGroup;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label="Naam"
                        name={"name"}
                        value={name}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.name}
                    />
                </div>

                <div className="row">
                    <div className="form-group col-sm-12">
                        <div className="row">
                            <div className="col-sm-3">
                                <label htmlFor="description" className="col-sm-12">Omschrijving</label>
                            </div>
                            <div className="col-sm-9">
                                <textarea name='description' value={description} onChange={this.handleInputChange}
                                          className="form-control input-sm"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className='form-group col-sm-6'>
                        <label htmlFor='responsibleUserId' className='col-sm-6'>Verantwoordelijke</label>
                        <div className={"col-sm-6"}>
                            <select className='form-control input-sm' id='responsibleUserId' name='responsibleUserId' value={responsibleUserId} onChange={this.handleInputChange} >
                                <option value=''></option>
                                { this.state.contactsWithPermission.map((option) => {
                                    return <option key={ option.id } value={ option.id }>{ option.fullName }</option>
                                }) }
                            </select>
                        </div>
                    </div>
                    <InputToggle
                        label={"Gesloten"}
                        name={"closed"}
                        value={closed}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label="Startdatum"
                        size={"col-sm-6"}
                        name="dateStarted"
                        value={dateStarted}
                        onChangeAction={this.handleChangeStartedDate}

                    />
                    <InputDate
                        label="Datum gereed"
                        size={"col-sm-6"}
                        name="dateFinished"
                        value={dateFinished}
                        onChangeAction={this.handleChangeFinishedDate}
                    />
                </div>

                <div className="row">
                    <InputToggle
                        label={"Zichtbaar op portaal"}
                        name={"showPortal"}
                        value={showPortal}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputToggle
                        label={"Veranderen op portaal"}
                        name={"editPortal"}
                        value={editPortal}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputToggle
                        label={"Zichtbaar bij contact"}
                        name={"showContactForm"}
                        value={showContactForm}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={"Gemaakt op"}
                        name={"createdAt"}
                        value={ moment().format('DD-MM-Y') }
                        readOnly={true}
                    />
                    <InputText
                        label={"Gemaakt door"}
                        name={"createdBy"}
                        value={ this.props.meDetails.fullName}
                        readOnly={true}
                    />
                </div>

                <div className="panel-footer">
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit}/>
                    </div>
                </div>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        meDetails: state.meDetails,
        permissions: state.systemData.permissions,
    };
};

export default connect(mapStateToProps)(ContactGroupNewForm);
