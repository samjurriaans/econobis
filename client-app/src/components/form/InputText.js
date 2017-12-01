import React from 'react';
import PropTypes from 'prop-types';

const InputText = props => {
    const { label, type, className, size, id, placeholder, name, value, onChangeAction, required, readOnly, maxLength, error, min, max } = props;

    return (
        <div className="form-group col-sm-6">
            <label htmlFor={ id } className={`col-sm-6 ${required}`}>{ label }</label>
            <div className={`${size}`}>
                <input
                    type={ type }
                    className={`form-control input-sm ${className}` + (error && 'has-error')}
                    id={ id }
                    placeholder={ placeholder }
                    name= { name }
                    value={ value }
                    onChange={ onChangeAction }
                    readOnly={ readOnly }
                    maxLength={ maxLength }
                    min={ min }
                    max={ max }
                />
            </div>
        </div>
    );
};

InputText.defaultProps = {
    className: '',
    size: 'col-sm-6',
    type: 'text',
    value: '',
    required: '',
    readOnly: false,
    maxLength: null,
    error: false,
    min: '',
    max: '',
};

InputText.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onChangeAction: PropTypes.func,
    required: PropTypes.string,
    readOnly: PropTypes.bool,
    maxLength: PropTypes.string,
    error: PropTypes.bool,
    min: PropTypes.string,
    max: PropTypes.string,
};

export default InputText;