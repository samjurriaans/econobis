import React from 'react';
import { connect } from 'react-redux';
import InputText from '../../../../../components/form/InputText';
import InputSelect from '../../../../../components/form/InputSelect';
import InputDate from '../../../../../components/form/InputDate';
import InputToggle from '../../../../../components/form/InputToggle';
import InputMultiSelect from '../../../../../components/form/InputMultiSelect';
import ViewText from '../../../../../components/form/ViewText';

const ProjectFormEditGeneral = ({
    name,
    code,
    description,
    projectStatusId,
    projectType,
    postalCode,
    address,
    city,
    dateStartRegistrations,
    dateEndRegistrations,
    ownedById,
    administrationId,
    administration,
    dateStart,
    dateEnd,
    contactGroupIds,
    dateProduction,
    isMembershipRequired,
    handleInputChange,
    handleInputChangeDate,
    handleContactGroupIds,
    projectStatus,
    administrations,
    hasPaymentInvoices,
    users,
    contactGroups,
    errors,
}) => (
    <React.Fragment>
        <h4>Algemeen</h4>
        <div className="row">
            <InputText
                label={'Project'}
                name={'name'}
                value={name}
                onChangeAction={handleInputChange}
                required={'required'}
                error={errors.name}
            />
            <InputText
                label={'Projectcode'}
                name={'code'}
                value={code}
                onChangeAction={handleInputChange}
                required={'required'}
                error={errors.code}
            />
        </div>

        <div className="row">
            <ViewText
                label={'Type project'}
                value={projectType && projectType.name}
                className={'form-group col-sm-6'}
            />
            <InputSelect
                label={'Status'}
                name={'projectStatusId'}
                options={projectStatus}
                value={projectStatusId}
                onChangeAction={handleInputChange}
                required={'required'}
                error={errors.projectStatusId}
            />
        </div>

        <div className="row">
            <div className="form-group col-sm-12">
                <div className="row">
                    <div className="col-sm-3">
                        <label htmlFor="description" className="col-sm-12">
                            Omschrijving
                        </label>
                    </div>
                    <div className="col-sm-8">
                        <textarea
                            name="description"
                            value={description}
                            onChange={handleInputChange}
                            className="form-control input-sm"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <InputText
                label={'Postcode'}
                name={'postalCode'}
                value={postalCode}
                onChangeAction={handleInputChange}
                error={errors.postalCode}
            />
            <InputText label={'Adres'} name={'address'} value={address} onChangeAction={handleInputChange} />
        </div>

        <div className="row">
            <InputText label={'Plaats'} name={'city'} value={city} onChangeAction={handleInputChange} />
        </div>

        <div className="row">
            <InputDate
                label={'Start inschrijving'}
                name={'dateStartRegistrations'}
                value={dateStartRegistrations}
                onChangeAction={handleInputChangeDate}
            />
            <InputSelect
                label={'Verantwoordelijke'}
                name={'ownedById'}
                options={users}
                optionName={'fullName'}
                value={ownedById}
                onChangeAction={handleInputChange}
                required={'required'}
                error={errors.ownedById}
            />
        </div>

        <div className="row">
            <InputDate
                label={'Eind inschrijving'}
                name={'dateEndRegistrations'}
                value={dateEndRegistrations}
                onChangeAction={handleInputChangeDate}
            />

            {/*Als er al facturen zijn gemaakt mag de administratie niet meer gewijzigd worden*/}
            {hasPaymentInvoices ? (
                <InputText
                    label={'Administratie'}
                    name={'administration'}
                    value={administration ? administration.name : ''}
                    readOnly={'true'}
                />
            ) : (
                <InputSelect
                    label={'Administratie'}
                    name={'administrationId'}
                    options={administrations}
                    value={administrationId}
                    onChangeAction={handleInputChange}
                />
            )}
        </div>

        <div className="row">
            <InputDate
                label={'Start project'}
                name={'dateStart'}
                value={dateStart}
                onChangeAction={handleInputChangeDate}
            />
            <InputToggle
                label={'Deelname aan groep verplicht'}
                name={'isMembershipRequired'}
                value={isMembershipRequired}
                onChangeAction={handleInputChange}
            />
        </div>

        <div className="row">
            <InputDate
                label={'Einde project'}
                name={'dateEnd'}
                value={dateEnd}
                onChangeAction={handleInputChangeDate}
            />
            {isMembershipRequired == true && (
                <div className={'row'}>
                    <InputMultiSelect
                        label={'Onderdeel van groep'}
                        name={'contactGroupsIds'}
                        options={contactGroups}
                        value={contactGroupIds}
                        onChangeAction={handleContactGroupIds}
                        error={errors.contactGroupIds}
                        required={'required'}
                    />
                </div>
            )}
        </div>

        <div className="row">
            <InputDate
                label={'Start productie'}
                name={'dateProduction'}
                value={dateProduction}
                onChangeAction={handleInputChangeDate}
            />
        </div>
    </React.Fragment>
);

const mapStateToProps = state => {
    return {
        projectStatus: state.systemData.projectStatus,
        administrations: state.meDetails.administrations,
        users: state.systemData.users,
    };
};

export default connect(mapStateToProps)(ProjectFormEditGeneral);
