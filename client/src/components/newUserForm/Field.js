import React from 'react';

export default ({id, type, className}) => {
    console.log({id, type, className});
    return (
        <div className={className}>
            <input id={id} type={type} className="validate" />
        </div>
    );
}