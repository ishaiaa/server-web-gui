import React from 'react';
import * as WindowBehaviour from '../../modules/WindowBehaviour'

function Debug(props) {
    return (
        <div>
            {JSON.stringify(WindowBehaviour.getInitialArray())}
        </div>
    );
}

export default Debug;