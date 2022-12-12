import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalState';
import Car from './Car';
import CarHeader from './CarHeader';

const CarList = () => {
    const { cars, loading, getCar } = useContext(GlobalContext)

    useEffect(() => {
        if (!loading) {
            getCar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="car-list-outer-container">
            <div className='car-list-inner-container'>
                <h2>CAR LIST</h2>
                <div className="car-list-table">
                    <table>
                        <thead>
                            <CarHeader />
                        </thead>
                        {cars.map((car, i) => (
                            <tbody key={car.id} >
                                <Car car={car} />
                            </tbody>
                        ))}

                    </table>
                </div>
            </div>
        </div>

    )

}

export default CarList
