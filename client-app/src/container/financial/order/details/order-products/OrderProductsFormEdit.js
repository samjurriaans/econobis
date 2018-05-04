import React from 'react';
import { connect } from 'react-redux';

import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import InputSelect from "../../../../../components/form/InputSelect";
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import InputDate from "../../../../../components/form/InputDate";
import moment from "moment/moment";
import InputToggle from "../../../../../components/form/InputToggle";
moment.locale('nl');

const OrderProductsFormEdit = props => {
    const {orderProductId, contactEnergySupplyTypeId, memberSince, eanElectricity, eanGas, contactEnergySupplyStatusId, switchDate, esNumber, isCurrentSupplier, createdAt, createdBy } = props.orderProduct;

    return (
        <div>
            <form className="form-horizontal" onSubmit={props.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputSelect
                                label={"Energieleverancier"}
                                id="orderProductId"
                                name={"orderProductId"}
                                options={props.orderProducts}
                                value={orderProductId}
                                readOnly={true}
                            />
                            <InputSelect
                                label={"Type"}
                                id="contactEnergySupplyTypeId"
                                name={"contactEnergySupplyTypeId"}
                                options={props.orderProductTypes}
                                value={contactEnergySupplyTypeId}
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Klant sinds"
                                name="memberSince"
                                value={memberSince ? memberSince : ''}
                                onChangeAction={props.handleInputChangeDate}
                            />
                            <InputText
                                label={"EAN electriciteit"}
                                id={"eanElectricity"}
                                name={"eanElectricity"}
                                value={eanElectricity}
                                onChangeAction={props.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={"EAN gas"}
                                id={"eanGas"}
                                name={"eanGas"}
                                value={eanGas}
                                onChangeAction={props.handleInputChange}
                            />
                            <InputSelect
                                label={"Overstap status"}
                                id="contactEnergySupplyStatusId"
                                name={"contactEnergySupplyStatusId"}
                                options={props.orderProductStatus}
                                value={contactEnergySupplyStatusId}
                                onChangeAction={props.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Mogelijke overstap datum"
                                name="switchDate"
                                value={switchDate ? switchDate : ''}
                                onChangeAction={props.handleInputChangeDate}
                            />
                            <InputText
                                label={"Klantnummer"}
                                name={"esNumber"}
                                value={esNumber ? esNumber : ''}
                                onChangeAction={props.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={"Gemaakt op"}
                                name={"createdAt"}
                                value={createdAt ? moment(createdAt.date).format('L') : ''}
                                readOnly={true}
                            />
                            <InputText
                                label={"Gemaakt door"}
                                name={"createdBy"}
                                value={createdBy ? createdBy.fullName : ''}
                                readOnly={true}
                            />
                        </div>
                        <div className="row">
                            <InputToggle
                                label={"Is huidige leverancier"}
                                name={"isCurrentSupplier"}
                                value={isCurrentSupplier}
                                onChangeAction={props.handleInputChange}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={props.cancelEdit}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={props.handleSubmit} type={"submit"} value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        orderProducts: state.systemData.orderProducts,
        orderProductTypes: state.systemData.orderProductTypes,
        orderProductStatus: state.systemData.orderProductStatus,
    };
};

export default connect(mapStateToProps, null)(OrderProductsFormEdit);
