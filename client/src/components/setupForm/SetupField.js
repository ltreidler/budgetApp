// SetupField contains logic to render single label and text input

import React from 'react';

//looks at props and takes input functions
export default ({ input, label, meta: {error, touched} }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input}/>
            {touched && error}
        </div>
    );
}