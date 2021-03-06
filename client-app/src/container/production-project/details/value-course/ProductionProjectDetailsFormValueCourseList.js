import React from 'react';
import { connect } from 'react-redux';

import ProductionProjectDetailsFormValueCourseItem from './ProductionProjectDetailsFormValueCourseItem';

const ProductionProjectDetailsFormValueCourseList = props => {
    return (
        <div>
            <div className="row header">
                <div className="col-sm-3">Project</div>
                <div className="col-sm-2">Datum</div>
                <div className="col-sm-3">Boekwaarde</div>
                <div className="col-sm-3">Overdrachtswaarde</div>
                <div className="col-sm-1" />
            </div>
            {props.valueCourses.length > 0 ? (
                props.valueCourses.map(valueCourse => {
                    return (
                        <ProductionProjectDetailsFormValueCourseItem key={valueCourse.id} valueCourse={valueCourse} />
                    );
                })
            ) : (
                <div>Geen waardeverloop bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        valueCourses: state.productionProjectDetails.valueCourses,
    };
};

export default connect(mapStateToProps)(ProductionProjectDetailsFormValueCourseList);
