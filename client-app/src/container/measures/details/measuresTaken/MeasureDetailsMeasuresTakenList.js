import React from 'react';
import {connect} from 'react-redux';

import MeasureDetailsMeasureTakenItem from "./MeasureDetailsMeasureTakenItem";

const MeasureDetailsOpportunityList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-3">Intake</div>
                <div className="col-sm-3">Gerealiseerd datum</div>
                <div className="col-sm-5">Contact</div>
                <div className="col-sm-1"></div>
            </div>
            {
                props.measuresTaken.length > 0 ?
                    props.measuresTaken.map(measureTaken => {
                        return <MeasureDetailsMeasureTakenItem
                            key={measureTaken.id}
                            measureTaken={measureTaken}
                        />;
                    })
                    :
                    <div>Geen intakes bekend die deze maatregel hebben genomen</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        measuresTaken: state.measure.measuresTaken,
    };
};
export default connect(mapStateToProps)(MeasureDetailsOpportunityList);

