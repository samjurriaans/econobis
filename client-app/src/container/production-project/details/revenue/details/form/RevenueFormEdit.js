import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');
import validator from 'validator';

import InputText from '../../../../../../components/form/InputText';
import InputSelect from '../../../../../../components/form/InputSelect';
import InputDate from '../../../../../../components/form/InputDate';
import ButtonText from '../../../../../../components/button/ButtonText';
import PanelFooter from '../../../../../../components/panel/PanelFooter';

import ProductionProjectRevenueAPI from '../../../../../../api/production-project/ProductionProjectRevenueAPI';

import {
    fetchRevenue,
    getDistribution,
    getParticipants,
} from '../../../../../../actions/production-project/ProductionProjectDetailsActions';
import Modal from '../../../../../../components/modal/Modal';

class RevenueFormEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            categoryId,
            confirmed,
            dateBegin,
            dateEnd,
            dateEntry,
            dateConfirmed,
            kwhStart,
            kwhEnd,
            kwhStartHigh,
            kwhEndHigh,
            kwhStartLow,
            kwhEndLow,
            revenue,
            datePayed,
            payPercentage,
            typeId,
            payoutKwh,
        } = props.revenue;

        this.state = {
            showModal: false,
            revenue: {
                id,
                categoryId: categoryId,
                confirmed: !!confirmed,
                dateBegin: dateBegin,
                dateEnd: dateEnd,
                dateEntry: dateEntry,
                dateConfirmed: dateConfirmed ? dateConfirmed : '',
                kwhStart: kwhStart ? kwhStart : 0,
                kwhEnd: kwhEnd ? kwhEnd : 0,
                kwhStartHigh: kwhStartHigh ? kwhStartHigh : '',
                kwhEndHigh: kwhEndHigh ? kwhEndHigh : '',
                kwhStartLow: kwhStartLow ? kwhStartLow : '',
                kwhEndLow: kwhEndLow ? kwhEndLow : '',
                revenue: revenue ? revenue : '',
                datePayed: datePayed ? datePayed : '',
                payPercentage: payPercentage ? payPercentage : '',
                typeId: typeId ? typeId : '',
                payoutKwh: payoutKwh ? parseFloat(payoutKwh).toFixed(3) : '',
            },
            errors: {
                categoryId: false,
                dateBegin: false,
                dateEnd: false,
                dateEntry: false,
            },
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
        this.handleInputChangeDateConfirmed = this.handleInputChangeDateConfirmed.bind(this);
    }

    toggleShowModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    cancelSetDate = () => {
        this.setState({
            ...this.state,
            revenue: {
                ...this.state.revenue,
                dateConfirmed: '',
                confirmed: false,
            },
        });

        this.setState({
            showModal: !this.state.showModal,
        });
    };

    handleInputChange = event => {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            revenue: {
                ...this.state.revenue,
                [name]: value,
            },
        });

        setTimeout(() => {
            const kwhStart =
                (this.state.revenue.kwhStartLow ? parseFloat(this.state.revenue.kwhStartLow) : 0) +
                (this.state.revenue.kwhStartHigh ? parseFloat(this.state.revenue.kwhStartHigh) : 0);
            const kwhEnd =
                (this.state.revenue.kwhEndLow ? parseFloat(this.state.revenue.kwhEndLow) : 0) +
                (this.state.revenue.kwhEndHigh ? parseFloat(this.state.revenue.kwhEndHigh) : 0);

            this.setState({
                ...this.state,
                revenue: {
                    ...this.state.revenue,
                    kwhStart,
                    kwhEnd,
                },
            });
        }, 200);
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            revenue: {
                ...this.state.revenue,
                [name]: value,
            },
        });
    }

    handleInputChangeDateConfirmed(value, name) {
        if (value) {
            this.setState({
                ...this.state,
                revenue: {
                    ...this.state.revenue,
                    [name]: value,
                    confirmed: true,
                },
            });
            this.toggleShowModal();
        } else {
            this.setState({
                ...this.state,
                revenue: {
                    ...this.state.revenue,
                    [name]: value,
                    confirmed: false,
                },
            });
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        const { revenue } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(revenue.categoryId + '')) {
            errors.categoryId = true;
            hasErrors = true;
        }
        if (validator.isEmpty(revenue.dateBegin + '')) {
            errors.dateBegin = true;
            hasErrors = true;
        }
        if (validator.isEmpty(revenue.dateEnd + '')) {
            errors.dateEnd = true;
            hasErrors = true;
        }
        if (validator.isEmpty(revenue.dateEntry + '')) {
            errors.dateEntry = true;
            hasErrors = true;
        }
        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            ProductionProjectRevenueAPI.updateProductionProjectRevenue(revenue.id, revenue).then(payload => {
                this.props.fetchRevenue(revenue.id);

                setTimeout(() => {
                    if (revenue.confirmed == 1) {
                        this.props.getDistribution(revenue.id, 0);
                    } else {
                        this.props.getParticipants(revenue.id, 0);
                    }
                }, 250);

                this.props.switchToView();
            });
    };

    render() {
        const {
            categoryId,
            confirmed,
            dateBegin,
            dateEnd,
            dateEntry,
            dateConfirmed,
            kwhStart,
            kwhEnd,
            kwhStartHigh,
            kwhEndHigh,
            kwhStartLow,
            kwhEndLow,
            revenue,
            datePayed,
            payPercentage,
            typeId,
            payoutKwh,
        } = this.state.revenue;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className={'panel-heading'}>
                        <span className={'h5 text-bold'}>Algemene informatie</span>
                    </div>
                </div>
                <div className="row">
                    <InputSelect
                        label={'Soort'}
                        name={'categoryId'}
                        options={this.props.productionProjectRevenueCategories}
                        value={categoryId}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.categoryId}
                    />
                    <InputText
                        label={'Definitief'}
                        name={'confirmed'}
                        value={confirmed ? 'Ja' : 'Nee'}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label={'Begin periode'}
                        name={'dateBegin'}
                        value={dateBegin}
                        onChangeAction={this.handleInputChangeDate}
                        required={'required'}
                        error={this.state.errors.dateBegin}
                    />
                    <InputDate
                        label={'Eind periode'}
                        name={'dateEnd'}
                        value={dateEnd}
                        onChangeAction={this.handleInputChangeDate}
                        required={'required'}
                        error={this.state.errors.dateEnd}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label={'Datum invoer'}
                        name={'dateEntry'}
                        value={dateEntry}
                        onChangeAction={this.handleInputChangeDate}
                        required={'required'}
                        error={this.state.errors.dateEntry}
                    />
                    <InputDate
                        label={'Datum definitief'}
                        name={'dateConfirmed'}
                        value={dateConfirmed}
                        onChangeAction={this.handleInputChangeDateConfirmed}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={'Type opbrengst'}
                        name={'typeId'}
                        options={this.props.productionProjectRevenueTypes}
                        value={typeId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputDate
                        label={'Datum uitgekeerd'}
                        name={'datePayed'}
                        value={datePayed}
                        onChangeAction={this.handleInputChangeDate}
                    />
                </div>

                <div className="row">
                    <div className={'panel-part panel-heading'}>
                        <span className={'h5 text-bold'}>Uitkering kWh velden</span>
                    </div>
                </div>

                <div className="row">
                    <InputText
                        type={'number'}
                        label={'Beginstand kWh hoog'}
                        name={'kwhStartHigh'}
                        value={kwhStartHigh}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        type={'number'}
                        label={'Eindstand kWh hoog'}
                        name={'kwhEndHigh'}
                        value={kwhEndHigh}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        type={'number'}
                        label={'Beginstand kWh laag'}
                        name={'kwhStartLow'}
                        value={kwhStartLow}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        type={'number'}
                        label={'Eindstand kWh laag'}
                        name={'kwhEndLow'}
                        value={kwhEndLow}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        type={'number'}
                        label={'Beginstand kWh'}
                        name={'kwhStart'}
                        value={kwhStart}
                        readOnly={true}
                    />
                    <InputText type={'number'} label={'Eindstand kWh'} name={'kwhEnd'} value={kwhEnd} readOnly={true} />
                </div>

                <div className="row">
                    <InputText
                        type={'number'}
                        label={'Opbrengst kWh €'}
                        name={'payoutKwh'}
                        value={payoutKwh}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <div className={'panel-part panel-heading'}>
                        <span className={'h5 text-bold'}>Uitkering euro velden</span>
                    </div>
                </div>
                <div className="row">
                    <InputText
                        type={'number'}
                        label={'Euro opbrengst'}
                        name={'revenue'}
                        value={revenue}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        type={'number'}
                        label={'Uitkering %'}
                        name={'payPercentage'}
                        value={payPercentage}
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

                {this.state.showModal && (
                    <Modal
                        buttonConfirmText="Bevestigen"
                        closeModal={this.cancelSetDate}
                        confirmAction={this.toggleShowModal}
                        title="Bevestigen"
                    >
                        <p>
                            Als je deze datum invult, zal de opbrengst definitief worden gemaakt. Je kunt deze hierna
                            niet meer aanpassen.
                        </p>
                    </Modal>
                )}
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchRevenue: id => {
        dispatch(fetchRevenue(id));
    },
    getParticipants: (id, page) => {
        dispatch(getParticipants({ id, page }));
    },
    getDistribution: (id, page) => {
        dispatch(getDistribution({ id, page }));
    },
});

const mapStateToProps = state => {
    return {
        revenue: state.productionProjectRevenue,
        productionProjectRevenueTypes: state.systemData.productionProjectRevenueTypes,
        productionProjectRevenueCategories: state.systemData.productionProjectRevenueCategories,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RevenueFormEdit);
