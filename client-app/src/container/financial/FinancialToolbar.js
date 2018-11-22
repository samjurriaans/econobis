import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../components/button/ButtonIcon';
import AdministrationDetailsAPI from "../../api/administration/AdministrationDetailsAPI";
import ButtonText from "../../components/button/ButtonText";
import {setError} from "../../actions/general/ErrorActions";

class FinancialToolbar extends Component {
    constructor(props){
        super(props);

        this.state = {
            syncingToInvoices: false,
            syncingFromInvoices: false,
        }
    };

    syncInvoicesToTwinfield = () => {
        this.setState({syncingToInvoices: true});
        AdministrationDetailsAPI.syncSentInvoicesToTwinfield(this.props.administrationDetails.id).then((payload) => {
            this.setState({syncingToInvoices: false});
            this.props.setError(200, payload.data);
        });
    };

    syncInvoicesFromTwinfield = () => {
        this.setState({syncingFromInvoices: true});
        AdministrationDetailsAPI.syncSentInvoicesFromTwinfield(this.props.administrationDetails.id).then((payload) => {
            this.setState({syncingFromInvoices: false});
            this.props.setError(200, payload.data);
        });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack}/>
                        {this.props.administrationDetails.usesTwinfield == true && this.props.administrationDetails.twinfieldIsValid == true &&
                        <ButtonText loading={this.state.syncingToInvoices}
                                    loadText={'Aan het synchroniseren'}
                                    buttonText={'Facturen naar Twinfield synchroniseren'}
                                    onClickAction={this.syncInvoicesToTwinfield}/>
                        }
                        {this.props.administrationDetails.usesTwinfield == true && this.props.administrationDetails.twinfieldIsValid == true &&
                        <ButtonText loading={this.state.syncingFromInvoices}
                                    loadText={'Betalingen aan het ophalen'}
                                    buttonText={'Betalingen van Twinfield ophalen'}
                                    onClickAction={this.syncInvoicesFromTwinfield}/>
                        }
                    </div>
                </div>
                <div className="col-md-4"><h4 className="text-center">Administratie: {this.props.name}</h4></div>
                <div className="col-md-4"/>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        name: state.administrationDetails.name,
        administrationDetails: state.administrationDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(FinancialToolbar);