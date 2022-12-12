import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/GlobalState'

const Search = () => {
    const { cars, carListByPayload, loading, getCar } = useContext(GlobalContext);
    //search key words
    const [searchByMake, setSearchByMake] = useState('');
    const [searchByTransmission, setSearchByTransmission] = useState('');
    const [searchBylatest, setSearchBylatest] = useState('');
    // eslint-disable-next-line 
    const [list, setList] = useState(cars);
    const [makeList, setMakeList] = useState([]);
    const [transmissionList, setTransmissionList] = useState([]);
    const [oldCarList, setOldCarList] = useState([]);
    const [newCarList, setNewCarList] = useState([]);

    useEffect(() => {

        setNewCarList(JSON.parse(localStorage.getItem('newCars')));
        setOldCarList(JSON.parse(localStorage.getItem('oldCars')));

        //If no filtering
        if (!searchByMake && !searchByTransmission && !searchBylatest) {
            setMakeList([cars]);
            getCar();
        } else {
            let tempMakeList = searchMakeFunction(searchByMake);
            setMakeList(tempMakeList);

            //If not selected the age
            if (!searchBylatest) {
                if (searchByMake && !searchByTransmission) {
                    console.log('searchmake');
                    makeListFunction(searchByMake);
                }
                if (!searchByMake && searchByTransmission) {
                    transmissionListFunction(searchByTransmission);
                    console.log('searchtra');
                }
                if (searchByMake && searchByTransmission) {
                    combinedListFunction(searchByMake, searchByTransmission);
                    console.log('com')
                }
            } else {
                //If nothing in make field
                if (!searchByMake) {
                    //If only transmission data 
                    if (searchByTransmission) {
                        let tempArray, searchArray = [];
                        if (searchBylatest == "old") {
                            tempArray = oldCarList;
                        } else if (searchBylatest == "new") {
                            tempArray = newCarList;
                        } else {
                            tempArray = cars;
                        }
                        tempArray.map((car) => {
                            if ((car.transmission.toLowerCase()).includes(searchByTransmission)) {
                                searchArray.push(car);
                            }
                            return searchArray;
                        })
                        carListByPayload(searchArray)
                        //for filtering if there is nothing inside make and transmission fields
                    } else {



                        let tempArray = [];
                        if (searchBylatest == "old") {
                            tempArray = oldCarList;
                        } else if (searchBylatest == "new") {
                            tempArray = newCarList;
                        } else {
                            tempArray = JSON.parse(localStorage.getItem('cars'));
                        }
                        carListByPayload(tempArray);
                    }
                    // if make field is not empty
                } else {
                    let tempArray, searchArray = [];
                    // to get latest or new cars depending upon the dropdown selection
                    if (searchBylatest == "old") {
                        tempArray = oldCarList;
                    } else if (searchBylatest == "new") {
                        tempArray = newCarList;
                    } else {
                        tempArray = JSON.parse(localStorage.getItem('cars'));
                    }
                    tempArray.map((car) => {
                        if ((car.make.toLowerCase()).includes(searchByMake)) {
                            searchArray.push(car);
                        }
                        return searchArray;
                    });
                    carListByPayload(searchArray);

                    if (searchByTransmission) {
                        const result = [];
                        searchArray.filter(car => {
                            if ((car.transmission.toLowerCase()).includes(searchByTransmission)) {
                                result.push(car);
                            }
                            return result;
                        });
                        carListByPayload(result)
                    }

                }
            }

        }
        // eslint-disable-next-line
    }, [searchByMake, searchByTransmission, searchBylatest, loading]);


    //functions to get filtered datas

    //To get the List of filterd make array
    const makeListFunction = (val) => {
        let tempArray = searchMakeFunction(val);
        setTransmissionList(tempArray);
        carListByPayload(searchMakeFunction(val));
    }
    //To get the List of filterd transmission  array
    const transmissionListFunction = (val) => {
        let tempArray = searchTransmissionFunction(val);
        setMakeList(tempArray);
        carListByPayload(searchTransmissionFunction(val));
    }

    //To filter if both make and transmission entered
    const combinedListFunction = (searchByMake, searchByTransmission) => {
        const concatArray = [makeList, transmissionList].sort((a, b) => a.length - b.length);
        let searchArray = [];
        concatArray[0].map((car) => {
            console.log(car)
            if ((car.transmission.toLowerCase()).includes(searchByTransmission) && (car.make.toLowerCase()).includes(searchByMake)) {
                searchArray.push(car);
            }
            return searchArray;
        })
        carListByPayload(searchArray)

    }

    //To filter selected make only
    const searchMakeFunction = (val) => {
        let searchArray = [];
        let tempCars = list;
        tempCars.map((car) => {
            if ((car.make.toLowerCase()).includes(val)) {
                searchArray.push(car);
            }
            return searchArray;
        })
        setMakeList(searchArray)
        return searchArray
    }

    //To filter selected transmission only
    const searchTransmissionFunction = (val) => {
        let searchArray = [];
        let tempCars = list;
        tempCars.map((car) => {
            if ((car.transmission.toLowerCase()).includes(val)) {
                searchArray.push(car);
            }
            return searchArray;
        })
        setMakeList(searchArray);
        return searchArray
    }


    //reset the filter
    const onClearAll = () => {
        setSearchByMake('');
        setSearchByTransmission('');
        setSearchBylatest('');
    }

    return (
        <div className="search-container">
            <>
                <select className="search-field"
                    name="year"
                    onChange={(e) => setSearchBylatest(e.target.value)}
                    value={searchBylatest}
                >
                    <option value="all" >Search by car age</option>
                    <option value="old">Old Cars(before 2010)</option>
                    <option value="new">New Cars(2010 or later)</option>
                </select>
                <br />
                <input className="search-field" placeholder='Search by car make' value={searchByMake}
                    onChange={(e) => setSearchByMake(e.target.value.toLowerCase())} />
                <br />
                <input className="search-field" placeholder='Search by transmission'
                    value={searchByTransmission} onChange={(e) => setSearchByTransmission(e.target.value.toLowerCase())} />
                <br />
                <button className='clear-btn' onClick={() => { onClearAll() }}>Clear</button>
            </>

        </div>
    )
}

export default Search
