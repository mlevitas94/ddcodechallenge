import React, { useState, useEffect } from 'react';
import BasicInfo from './BasicInfo';
import ScoreCalculator from './ScoreCalculator';
import { getRequestInfo } from '../api/api'

const Wizard = () => {
    //high level state that will store character options upon API retrieval 
    const [charOptions, setCharOptions] = useState(null)

    //upon mounting, retrieve API data for select boxes
    useEffect(() => {
        //passing setState function of charOptions to API retrieve function
       getRequestInfo(setCharOptions)
    }, [])
    return (
        <>
            {
                //will render loading text inside main box while fetching from API. Renders all form elements when data is retrieved and set
                charOptions === null ?
                    'Loading'
                    :
                    <>
                        <BasicInfo charOptions={charOptions} />
                        <ScoreCalculator />
                    </>
            }
        </>
    );
};

export default Wizard;
