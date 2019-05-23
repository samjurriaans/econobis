import React from 'react';
import * as PropTypes from 'prop-types';
import ViewText from '../../../../../components/form/ViewText';
import moneyPresenter from '../../../../../helpers/MoneyPresenter';

function ParticipantFormViewObligation({
    participationWorth,
    participationsDefinitive,
    participationsDefinitiveWorth,
    valueCourses,
    onClick,
}) {
    const activeValueCourse = valueCourses ? valueCourses.find(valueCourse => valueCourse.active) : [];

    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Obligaties</h4>
            <div className="row" onClick={onClick}>
                <ViewText label={'Huidige aantal obligaties'} value={participationsDefinitive} />
            </div>
            <div className="row" onClick={onClick}>
                <ViewText label={'Nominale waarde per obligatie'} value={moneyPresenter(participationWorth)} />
            </div>
            <div className="row" onClick={onClick}>
                <ViewText
                    label={'Huidige boekwaarde per obligatie'}
                    value={activeValueCourse && moneyPresenter(activeValueCourse.bookWorth)}
                />
            </div>
            <div className="row" onClick={onClick}>
                <ViewText label={'Huidige totale waarde'} value={moneyPresenter(participationsDefinitiveWorth)} />
            </div>
        </React.Fragment>
    );
}

ParticipantFormViewObligation.propTypes = {
    onClick: PropTypes.func.isRequired,
    participationWorth: PropTypes.number.isRequired,
    participationsDefinitive: PropTypes.number.isRequired,
    participationsDefinitiveWorth: PropTypes.number.isRequired,
};

export default ParticipantFormViewObligation;