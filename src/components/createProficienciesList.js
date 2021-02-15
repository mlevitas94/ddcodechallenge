import React from 'react';
import { Accordion, AccordionItem } from 'react-sanfona';


export const createProficienciesList = (proficiencies) => {
    return (
        <Accordion>
            {<AccordionItem className="accordion" title={"Proficiencies ↓"} expanded="true">
                <div>
                    {proficiencies.map((item, i) => {
                        //adjusted JSX to access item name
                        return (
                            <li key={i} className="LanguageProficienciesList">
                                {item.name}
                            </li>
                        )
                    })}
                </div>
            </AccordionItem>}
        </Accordion>);
};
