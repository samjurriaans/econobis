import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import moment from 'moment';
moment.locale('nl');

import ButtonText from '../../../components/button/ButtonText';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import PortalSettingsAPI from '../../../api/portal-settings/PortalSettingsAPI';
import { bindActionCreators } from 'redux';
import { fetchSystemData } from '../../../actions/general/SystemDataActions';
import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import EmailTemplateAPI from '../../../api/email-template/EmailTemplateAPI';
import DocumentTemplateAPI from '../../../api/document-template/DocumentTemplateAPI';

class PortalSettingsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portalSettings: {
                ...props.portalSettings,
            },
            documentTemplates: [],
            emailTemplates: [],
            errors: {
                portalUrl: false,
                backgroundColor: false,
                responsibleUserId: false,
                documentTemplateAgreementId: false,
                emailTemplateAgreementId: false,
            },
        };

        // DocumentTemplateAPI.fetchDocumentTemplates().then(payload => {
        //     this.setState({
        //         documentTemplates: payload,
        //     });
        // });
        // EmailTemplateAPI.fetchEmailTemplatesPeek().then(payload => {
        //     this.setState({
        //         emailTemplates: payload,
        //     });
        // });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            portalSettings: {
                ...this.state.portalSettings,
                [name]: value,
            },
        });
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            portalSettings: {
                ...this.state.portalSettings,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { portalSettings } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(portalSettings.portalUrl)) {
            errors.portalUrl = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            PortalSettingsAPI.updatePortalSettings(portalSettings)
                .then(payload => {
                    this.props.updateState(portalSettings);
                    this.props.fetchSystemData();
                    this.props.switchToView();
                })
                .catch(error => {
                    alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
                });
    };

    render() {
        const {
            portalUrl,
            backgroundColor,
            responsibleUserId,
            documentTemplateAgreementId,
            emailTemplateAgreementId,
        } = this.state.portalSettings;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Portal URL"
                                name={'portalUrl'}
                                value={portalUrl}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.portalUrl}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Achtergrondkleur"
                                name={'backgroundColor'}
                                value={backgroundColor}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.backgroundColor}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Portal log gebruiker"
                                name={'responsibleUserId'}
                                value={responsibleUserId}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.responsibleUserId}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Document template"
                                name={'documentTemplateAgreementId'}
                                value={documentTemplateAgreementId}
                                // options={this.state.documentTemplates}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.documentTemplateAgreementId}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="E-mail template"
                                name={'emailTemplateAgreementId'}
                                value={emailTemplateAgreementId}
                                // options={this.state.emailTemplates}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.emailTemplateAgreementId}
                            />
                        </div>
                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Sluiten'}
                                onClickAction={this.props.switchToView}
                            />
                            <ButtonText buttonText={'Opslaan'} type={'submit'} value={'Submit'} />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSystemData }, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(PortalSettingsFormGeneralEdit);