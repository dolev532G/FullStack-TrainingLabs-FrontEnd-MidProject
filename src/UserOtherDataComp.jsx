import { useState, useEffect } from 'react';

const OtherDataComp = ({ user, callbackstreet , callbackcity , callbackzip }) => {
    const [street, setStreet] = useState(user.street); 
    const [city, setCity] = useState(user.city); 
    const [zipcode, setZipCode] = useState(user.zip_code); 
    


    useEffect(() => {
    }, [user]);

    const handleStreetChange = (e) => {
        setStreet(e.target.value);  // Update local state for street
        callbackstreet(e.target.value); // Notify parent about the change
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);  // Update local state for street
        callbackcity(e.target.value); // Notify parent about the change
    };

    const handleZipcodeChange = (e) => {
        setZipCode(e.target.value);  // Update local state for street
        callbackzip(e.target.value); // Notify parent about the change
    };

    return (
        <div style={{
            border: "2px solid black",
            padding: '10px',
            margin: '5px',
            borderRadius: '5px'
        }}>
            <h5>Street :  <input value={street} onChange={handleStreetChange} /> </h5>
            <h5>City :  <input value={city} onChange={handleCityChange} /> </h5>
            <h5>Zip Code :  <input value={zipcode} onChange={handleZipcodeChange} /> </h5>
        </div>
    );
};

export default OtherDataComp;