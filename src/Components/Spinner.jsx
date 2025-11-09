import React from 'react';
import { FadeLoader } from 'react-spinners';

const Spinner = () => {
    return (
        <div >
            <FadeLoader height={20} color='green'   margin={22}/>
        </div>
    );
};

export default Spinner;