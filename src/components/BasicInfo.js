import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { createProficienciesList } from './createProficienciesList';
import { createLanguagesList } from './createLanguagesList';

const basicInfoSchema = Yup.object().shape({
    chosenName: Yup.string().notRequired(),
    chosenClass: Yup.string().required('Class is required'),
    chosenRace: Yup.string().required('Race is required'),
  });

const BasicInfo = (props)  => {
    //removed state for races and classes array. Dropdowns are using state from Wizard.js
    const [getName, setName] = useState("");
    const [getClass, setClass] = useState("");
    const [getRace, setRace] = useState("");
    const [proficiencies, setProficiencies] = useState([]);
    const [languages, setLanguages] = useState([]);



    const handleSubmit = async (e) => {
        const chosenClass = e.chosenClass;
        const chosenRace = e.chosenRace;


        let allData = {}
        const urls = [
            { class: `http://www.dnd5eapi.co${chosenClass.url}` },
            { race: `http://www.dnd5eapi.co${chosenRace.url}` }
        ]
    
        await Promise.all(urls.map(async url => {
            const key = Object.keys(url)[0]
            await fetch(url[key]).then(async results => {
                await results.json().then(results => {
                    allData[key] = results
                })
            })
        }))
        setLanguages(allData.race.languages)
        setProficiencies(allData.class.proficiencies)
        setRace(chosenRace.name)
        setClass(chosenClass.name)
    }

    const setCharacterName = e => {
        setName(e);
    };
    return(
        <>
            <h2>Choose name, race & class</h2>
            <Formik>
                <Field name="chosenName" render={({field}) =>
                    <span className='p-float-label' style={{ marginTop: '1rem' }}>
                        <InputText id='chosenName' {...field}  value={getName} onChange={e => {
                            setCharacterName(e.target.value)}} style={{ width: '100%' }}/>
                        <label htmlFor='chosenName'>Enter Name</label>
                    </span>
                }/>
            </Formik>
            <Formik
                initialValues={{
                  chosenClass: '',
                  chosenRace: ''
                }}
                validationSchema={basicInfoSchema}
                onSubmit={e => handleSubmit(e)}
                render={() => (
                    <Form>
                        <div className="dropdownFormContainer">
                            <Field name="chosenRace" render={({field}) =>
                            <Dropdown
                                {...field}
                                className="dropdownFormElement"
                                style={{ marginTop: '1rem' }}
                                optionLabel="name"
                                //dropdown options using state from Wizard.js
                                options={props.charOptions.races}
                                placeholder="Select D&D Race"
                                />}/>
                                
                            <ErrorMessage name='chosenRace'/>

                            <Field name="chosenClass" render={({field}) =>
                            <Dropdown
                                {...field}
                                className="dropdownFormElement"
                                style={{ marginTop: '1rem' }}
                                optionLabel="name"
                                //dropdown options using state from Wizard.js
                                options={props.charOptions.classes}
                                placeholder="Select D&D Class"
                                
                                />}/>
                            <ErrorMessage name='chosenClass'/>
                            <Button label="Select" className="dropdownFormElement dropdownFormButton p-button-raised" style={{ marginTop: '1rem' }}/>
                        </div>
                    </Form>
                )}
            />
            <div>
                <h3 className="NameRaceClass">{getName} {(getName && getRace && getClass) ? "the" : null} {getRace} {getClass}</h3>
            </div>
            <div>
                {createProficienciesList(proficiencies)}
            </div>
            <div>
                {createLanguagesList(languages)}
            </div>
        </>
    );
};

export default BasicInfo;
