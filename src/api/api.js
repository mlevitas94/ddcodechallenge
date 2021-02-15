export const getRequestInfo = async (setCharOptions) => {
    
    // object with data from API organized
    let allData = {}


    //urls for API information. set as object for dynamic organization for allData object
    const urls = [
        { classes: 'http://www.dnd5eapi.co/api/classes/' },
        { races: 'http://www.dnd5eapi.co/api/races/' }
    ]

    //url fetch itiration inside promise all. In allData object, sets key as pre defined url key and data correlating to key
   await Promise.all(urls.map(async url => {
        const key = Object.keys(url)[0]
        await fetch(url[key]).then(async results => {
            await results.json().then(results => {
                allData[key] = results.results
            })
        })
    }))

    //set state as filled allData object
    setCharOptions(allData)
}

