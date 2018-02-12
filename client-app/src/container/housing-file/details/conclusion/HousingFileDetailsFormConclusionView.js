import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import moment from "moment/moment";
moment.locale('nl');

const HousingFileDetailsFormConclusionView = props => {
    const { createdAt, updatedAt, updateBy, createdBy } = props.housingFileDetails;

    return (
        <div>
            <div className="row">
                <ViewText
                    label={"Laatste gewijzigd op"}
                    value={updatedAt ? moment(updatedAt.date).format('L') : 'Onbekend'}
                />
                <ViewText
                    label={"Laatste gewijzigd door"}
                    value={updateBy ? updateBy.fullName : 'Onbekend'}
                />
            </div>
            <div className="row">
                <ViewText
                    label={"Gemaakt op"}
                    value={createdAt ? moment(createdAt.date).format('L') : 'Onbekend'}
                />
                <ViewText
                    label={"Gemaakt door"}
                    value={createdBy ? createdBy.fullName : 'Onbekend'}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        housingFileDetails: state.housingFileDetails,
    };
};

export default connect(mapStateToProps)(HousingFileDetailsFormConclusionView);