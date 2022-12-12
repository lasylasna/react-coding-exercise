import React, { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState';
import { Link } from "react-router-dom";
import { Button } from "reactstrap";


const Car = ({ car, key }) => {
    const { deleteCar } = useContext(GlobalContext);
    return (
        <tr key={car.id} >
            <td>
                {car.make}
            </td>

            <td>
                {car.model}
            </td>
            <td>
                {car.transmission}
            </td>
            <td>
                {car.year}
            </td>
            <td>


                <Link to={`/edit/${car.id}`}>
                    <Button type="button" className='action-btn'>
                        Edit
                    </Button>
                </Link>
                <Button className='action-btn' style={{ color: "rgb(231, 31, 31)" }} onClick={() => { deleteCar(car.id) }}>Delete</Button>
            </td>
        </tr>
    )
}

export default Car
