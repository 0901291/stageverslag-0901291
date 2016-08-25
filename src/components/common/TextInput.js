import React, {PropTypes} from 'react';

const TextInput = ({name, label, onChange, placeholder, value, error, type = "text", wrapperClass = [], checked}) => {
    wrapperClass.push('form-group');
    if (error && error.length > 0) {
        wrapperClass.push('has-error');
    }
    value = value || checked;
    return (
      <div className={wrapperClass.join(" ")}>
          <label htmlFor={name}>{label}</label>
          <div className="field">
              <input
                type={type}
                name={name}
                id={name}
                className={type !== 'checkbox' ? 'form-control' : ''}
                placeholder={placeholder}
                value={value}
                checked={value}
                onChange={onChange}/>
              {error && <div className="alert alert-danger">{error}</div>}
          </div>
      </div>
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string
};

export default TextInput;
