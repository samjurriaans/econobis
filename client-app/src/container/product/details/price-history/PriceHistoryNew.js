import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from "validator";

import ProductDetailsAPI from '../../../../api/product/ProductDetailsAPI';
import { addProductPriceHistory } from '../../../../actions/product/ProductDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputDate from "../../../../components/form/InputDate";

class PriceHistoryNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vatPercentages:[
                {'id':  '0', name: '0'},
                {'id':  '6', name: '6'},
                {'id':  '21', name: '21'},
            ],
            priceHistory:{
                productId: props.productId,
                dateStart: '',
                price: '',
                vatPercentage: '',
            },
            errors: {
                dateStart: false,
                price: false,
                vatPercentage: false,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            priceHistory: {
                ...this.state.priceHistory,
                [name]: value
            },
        });
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            priceHistory: {
                ...this.state.priceHistory,
                [name]: value
            },
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        const {priceHistory} = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(priceHistory.dateStart)){
            errors.dateStart = true;
            hasErrors = true;
        };

        if(validator.isEmpty(priceHistory.price)){
            errors.price = true;
            hasErrors = true;
        };

        if(validator.isEmpty(priceHistory.vatPercentage)){
            errors.vatPercentage = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        if(!hasErrors){
               this.props.addProductPriceHistory(priceHistory);
               this.props.toggleShowNew();
        }
    };

    render() {
        const {dateStart, price, vatPercentage } = this.state.priceHistory;


        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={"Product"}
                                id={"name"}
                                name={"name"}
                                value={this.props.productName}
                                readOnly={true}
                            />
                            <InputDate
                                label="Startdatum"
                                name="dateStart"
                                value={dateStart}
                                onChangeAction={this.handleInputChangeDate}
                                required={"required"}
                                error={this.state.errors.dateStart}
                            />

                        </div>

                        <div className="row">
                            <InputText
                                label={"Prijs ex. BTW"}
                                id={"price"}
                                name={"price"}
                                type={"number"}
                                min={"0"}
                                max={"1000000"}
                                value={price}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.price}
                            />
                            <InputSelect
                                label={"BTW percentage"}
                                name={"vatPercentage"}
                                options={this.state.vatPercentages}
                                value={vatPercentage}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.vatPercentage}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={this.props.toggleShowNew}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        productId: state.productDetails.id,
        productName: state.productDetails.name,
        users: state.systemData.users,
    };
};

const mapDispatchToProps = dispatch => ({
    addProductPriceHistory: (priceHistory) => {
        dispatch(addProductPriceHistory(priceHistory));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceHistoryNew);
