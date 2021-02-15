import React from 'react';
import { Accordion, AccordionItem } from 'react-sanfona';

export const createLanguagesList = (languages) => {
    return (
        <Accordion>
            {<AccordionItem className="accordion" title={"Languages ↓"} expanded="true">
                <div>

                    {languages.map((item, i) => {
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
