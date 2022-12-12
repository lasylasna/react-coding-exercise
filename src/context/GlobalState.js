import React, { createContext, useReducer, useState } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

//Initial state

const initialState = {
    // cars: [JSON.parse(localStorage.getItem('cars')) ? JSON.parse(localStorage.getItem('cars')) : []],
    cars: JSON.parse(localStorage.getItem('cars')) ?
        JSON.parse(localStorage.getItem('cars')) :
        [{ "id": "2", "make": "Nissan", "model": "Pulsar", "year": 2009, "transmission": "manual" }, { "id": "3", "make": "Ford", "model": "Falcon", "year": 2011, "transmission": "manual" }, { "id": "4", "make": "Honda", "model": "Civic", "year": 2012, "transmission": "automatic" }, { "id": "5", "make": "Holden", "model": "Commadore", "year": 2018, "transmission": "tiptronic" }, { "id": "6", "make": "Toyota", "model": "Corolla", "year": 2000, "transmission": "manual" }, { "id": "7", "make": "Mazda", "model": "CX5", "year": 2015, "transmission": "automatic" }, { "id": "8", "make": "Holden", "model": "Captiva", "year": 2015, "transmission": "manual" }, { "id": "9", "make": "Ford", "model": "Focus", "year": 2010, "transmission": "manual" }, { "id": "10", "make": "Honda", "model": "Accord", "year": 2005, "transmission": "manual" }],
    oldCarsList: [],
    newCarsList: [],
    loading: false,

};

//Create context

export const GlobalContext = createContext(initialState);

//Provider component

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const [id, setId] = useState('')

    //Actions

    //get all cars from localstorage
    const getElementsfromLocalStorage = () => {
        let cars = [];
        if (localStorage.getItem('cars')) {
            cars = JSON.parse(localStorage.getItem('cars'));
        }
        return cars;
    };

    const oldOrNewCars = (cars) => {
        localStorage.clear();
        localStorage.setItem('cars', JSON.stringify(cars));
        cars = JSON.parse(localStorage.getItem('cars'));
        const oldCars = [], newCars = [];
        cars.filter(car => {
            Number(car.year) > 2010 ? newCars.push(car) : oldCars.push(car);

            return oldCars, newCars;
        });
        localStorage.setItem('oldCars', JSON.stringify(oldCars));
        localStorage.setItem('newCars', JSON.stringify(newCars));
    }

    //get call if no cars in local storage
    const getCar = async () => {

        if (localStorage.getItem('cars')) {
            setId(lastId(getElementsfromLocalStorage()));
            dispatch({
                type: "GET",
                payload: getElementsfromLocalStorage(),
            });
        } else {
            try {
                const res = await axios.get("https://testapi.io/api/jeanpralo/cars");
                setId(lastId(res.data));
                oldOrNewCars(localStorage.getItem('cars'));
                dispatch({
                    type: "GET",
                    payload: res.data,
                });
            } catch (error) {
                // If error return initialValue 
                oldOrNewCars(initialState.cars);
                return initialState.cars;
            }

        }
    }

    //get last Id 
    const lastId = (array) => {
        let id = array[array.length - 1].id;
        return id
    }

    //add a new car
    const addNewCar = (car) => {
        try {
            dispatch({
                type: "ADD",
                payload: car,
            });
            //update the local with added car
            const oldInfo = JSON.parse(localStorage.getItem('cars'));
            let tempArray = [...oldInfo, car];
            oldOrNewCars(tempArray);
        } catch (error) {
            console.log(error);
        }
    }

    //update a car 
    const updateCar = (id) => {

        try {
            dispatch({
                type: "EDIT",
                payload: id,
            });


            //Update selected car from localstorage
            let storedCars = getElementsfromLocalStorage();

            const updatedCars = storedCars.map((car) => {
                if (car.id === id.id) {
                    return id;
                }

                return car;
            });
            oldOrNewCars(updatedCars);

        } catch (error) {
            return initialState.cars;
        }
    }

    //Filtered cars
    const carListByPayload = (car) => {
        dispatch({
            type: "LIST_CARS",
            payload: car,
        });
    }





    const deleteCar = async (id) => {
        try {
            dispatch({
                type: "DELETE",
                payload: id,
            });

            //Delete selected car from localstorage
            let cars = getElementsfromLocalStorage();
            cars = cars.filter(car => car.id !== id);

            //clear localstorage if there is no car
            cars.length > 0 ? oldOrNewCars(cars) : localStorage.clear();

        } catch (error) {
            return initialState.cars;
        }

    }
    return (
        <GlobalContext.Provider
            value={{
                getCar,// calling get method from reducer
                deleteCar,
                addNewCar,
                updateCar,
                carListByPayload,
                cars: state.cars,
                oldCarsList: state.oldCarsList,
                newCarsList: state.newCarsList,
                id,
                loading: state.loading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
