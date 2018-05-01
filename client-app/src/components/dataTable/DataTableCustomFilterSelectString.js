import React from 'react';

const DataTableBody = props => {
    return (
        <select className="form-control input-sm" name={'type'} onChange={props.handleInputChange}>
            <option value='eq'>gelijk aan</option>
            <option value='neq'>niet gelijk aan</option>
            <option value='ct'>bevat</option>
            <option value='bw'>begint met</option>
            <option value='nbw'>begint niet met</option>
            <option value='ew'>eindigd met</option>
            <option value='new'>eindigd niet met</option>
            <option value='nl'>is leeg</option>
            <option value='nnl'>is niet leeg</option>
        </select>
    )
};

export default DataTableBody;