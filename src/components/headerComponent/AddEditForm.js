import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Form, FormGroup, Label, Button } from "reactstrap";
import { GlobalContext } from '../../context/GlobalState';

const AddEditForm = ({ action }) => {
    const { cars, addNewCar, updateCar, id } = useContext(GlobalContext);
    const [header, setHeader] = useState("");
    const [btnText, setBtnText] = useState("");

    //Form values
    const [values, setValues] = useState('');
    //Errors
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const params = useParams();



    useEffect(() => {
        if (params && params.id) {
            setHeader("Edit details")
            setBtnText("Update");
            const selectedCar = cars.find((car) => car.id === params.id);
            setValues(selectedCar);
        } else {
            setHeader("Add New Car");
            setBtnText("Submit");
            setValues({ id: Number(id) + 1 })
        }
        // eslint-disable-next-line                 
    }, []);


    //A method to handle form inputs
    const handleChange = (e) => {
        let value = values;
        if (e.target.name === "year") {
            value[e.target.name] = Number(e.target.value);
        } else {
            value[e.target.name] = e.target.value;
        }


        //Let's set these values in state
        setValues({
            ...values,   //spread operator to store old values

        })


    }

    //Submit the updated / new data
    const onSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            let fields = {};
            fields["make"] = "";

            fields["model"] = "";

            fields["year"] = "";

            fields["transmission"] = "";
            setValues({ ...fields });
            (params && params.id) ? updateCar(values) : addNewCar(values);

            navigate("/");
        }
    };

    //Form validation
    function validateForm() {
        let fields = values;
        let error = {};
        let formIsValid = true;

        if (!fields["make"]) {
            formIsValid = false;
            error["make"] = "*Please enter make.";
        }
        if (!fields["model"]) {
            formIsValid = false;
            error["model"] = "*Please enter your model.";
        }
        if (!fields["year"]) {
            formIsValid = false;
            error["year"] = "*Please enter year.";
        }
        if (!fields["transmission"]) {
            formIsValid = false;
            error["transmission"] = "*Please enter transmission.";
        }
        setErrors({ error })
        return formIsValid;


    }




    //Restrict only numbers in year 

    const exceptThisSymbols = ["e", "E", "+", "-", "."];

    const onKeyPress = (e) => {
        const re = /[0-9A-F]+/g;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    }

    return (
        <div className="add-edit-form-outer-container">
            <div className="add-edit-form-inner-container">
                <Link to="/" className="">
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                    ></button>
                </Link>
                <Form onSubmit={onSubmit} className="add-edit-form">
                    <h4 className='header-text'>{header}</h4>
                    <FormGroup className="form-container">
                        <Label for="status" className="form-label">
                            Make
                            <span class="red-star"> *</span>
                        </Label>
                        <input className="form-field" type="text" name="make" value={values.make || ''} placeholder="Please enter make"
                            onChange={handleChange} />
                        <div className='errorMsg'> {errors.error && errors.error.make}</div>
                    </FormGroup>
                    <FormGroup className="form-container">
                        <Label for="model" className="form-label">
                            Model <span class="red-star"> *</span>
                        </Label>
                        <input type="text" className="form-field" name="model" value={values.model || ''} placeholder="Please enter model" onChange={handleChange} />
                        <div className='errorMsg'> {errors.error && errors.error.model}</div>
                    </FormGroup>
                    <FormGroup className="form-container">
                        <Label for="year" className="form-label">
                            Year <span class="red-star"> *</span>
                        </Label>
                        <input className="form-field" type="text" id='year' value={values.year || ''} name="year" placeholder="Please enter year" onChange={handleChange}
                            onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()}
                            maxLength="4" onKeyPress={(e) => { onKeyPress(e) }} />
                        <div className='errorMsg'> {errors.error && errors.error.year}</div>
                    </FormGroup>
                    <FormGroup className="form-container">
                        <Label for="transmission" className="form-label">
                            Transmission <span class="red-star"> *</span>
                        </Label>
                        <input type="text" className="form-field" name="transmission" value={values.transmission || ''} placeholder="Please enter transmission" onChange={handleChange} />
                        <div className='errorMsg'> {errors.error && errors.error.transmission}</div>
                    </FormGroup>
                    <Button className="submit-btn" type="submit"   >{btnText}</Button>
                </Form>
            </div>

        </div>
    )
}

export default AddEditForm
