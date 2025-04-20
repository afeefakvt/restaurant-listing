export interface RestaurantData{
    name:string;
    address:string;
    contact:string
}

export interface RestaurantValidationErrors {
    name:string;
    address:string;
    contact:string
}

export const validateRestaurantForm = (restaurant:RestaurantData)=>{
    const errors:RestaurantValidationErrors = {name:"",address:"",contact:""};
    let isValid=true;

    if(!restaurant.name.trim()){
        errors.name = "Name is required"
        isValid = false
    }else if(restaurant.name.length<3){
        errors.name ="Name should be atleast 3 characters";
        isValid = false;
    }

    if (!restaurant.address.trim()) {
        errors.address = 'Address is required';
        isValid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!restaurant.contact.trim()) {
        errors.contact = 'Contact number is required';
        isValid = false;
      } else if (!phoneRegex.test(restaurant.contact)) {
        errors.contact = 'Enter a valid 10-digit number';
        isValid = false;
      }

     return {isValid,errors} 
}