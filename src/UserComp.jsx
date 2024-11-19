import { useState, useEffect } from 'react';

import OtherDataComp from './UserOtherDataComp';


const UserComp = ({ user, callbackDeleteUser, callbackUpdateUser , callbackSelectingUser }) => {

    const [name, SetName] = useState(user.name);
    const [email, SetEmail] = useState(user.email);
    const [street, SetStreet] = useState(user.street);
    const [city, SetCity] = useState(user.city);
    const [zipcode, SetZipCode] = useState(user.zip_code);

    const [OtherDataShow, SetOtherData] = useState(false);
    const [UserRegionOrange, SetUserRegionOrange] = useState(false);
        


    useEffect(() => {
        user.tasks_completed
    }, []);

    const UpdateUser = () => {
        callbackUpdateUser(
            user.id,
            {
                name, email, address : {street, city, zipcode}
            }
        )
    }

    const SelectingUser = () =>{
        if ( callbackSelectingUser(user.id) )
            SetUserRegionOrange(!UserRegionOrange);
    }

    return (
        <>

            <div style={{
                border: user.tasks_completed ? "2px solid green" : "2px solid red",  // Change 'blue' to any color you prefer
                background : UserRegionOrange ? '#FFEBCC' : "white",
                padding: '10px', // Space between the content and the border
                margin: '5px', // Space outside the border
                borderRadius: '5px' // Optional: rounds the corners of the frame
            }}>

                <h5 onClick={SelectingUser}>ID : {user.id}</h5>
                <h5>Name : <input value={name} onChange={(e) => SetName(e.target.value)} /> </h5>
                <h5>Email : <input value={email} onChange={(e) => SetEmail(e.target.value)} /> </h5>

                <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', width: '100%' }}>
                    {/* Left side for "Other Data" button */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <button
                            style={{ backgroundColor: 'lightgray' }}
                            disabled={true}
                            onMouseOver={() => SetOtherData(!OtherDataShow)}
                        >
                            Other Data
                        </button>

                        {/* Right side for "Update" and "Delete" buttons */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button style={{ backgroundColor: 'yellowgreen' }} onClick={UpdateUser}>
                                Update
                            </button>
                            <button style={{ backgroundColor: 'yellow' }} onClick={() => callbackDeleteUser(user.id)}>
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Conditionally render the OtherDataComp */}
                    {OtherDataShow && (
                        <div style={{ width: '100%', marginTop: '10px' }}>
                            <OtherDataComp
                                user={user}
                                callbackstreet={SetStreet}
                                callbackcity={SetCity}
                                callbackzip={SetZipCode}
                                key={user.id}
                            />
                        </div>
                    )}
                </div>










            </div>
        </>
    );
};

export default UserComp;
