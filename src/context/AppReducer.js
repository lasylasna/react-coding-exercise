export default (state, action) => {
  switch (action.type) {
    case "GET":
      return {
        ...state, // passing all the existing data 
        cars: action.payload,
        loading: true,
      };

    case "ADD":
      return {
        cars: [action.payload, ...state.cars],  // concate  new and old cars
      };
    case "EDIT": {
      const updatedCar = action.payload;

      const updatedCars = state.cars.map((car) => {
        if (car.id === updatedCar.id) {
          return updatedCar;
        }

        return car;
      });

      return {
        cars: updatedCars,
      };
    }


    case "LIST_CARS":
      return {
        cars: action.payload,
        loading: true,
      };

    case "DELETE":
      return {
        ...state, // passing all the existing data

        // create output result(transaction) to delete
        cars: state.cars.filter(
          (car) => car.id !== action.payload
        ),
      };


    default:
      return state;
  }
};
