import React from "react";
import { useLocation } from "react-router-dom";

const SuccessComponent = () => {
  const { state } = useLocation();
  const { formData } = state || {};

  return (
    <div className="container-form flex justify-center items-center h-screen">
      <div className="bg-white bg-pink-300 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
        <h2 className="text-center mb-4">Form Submitted Successfully!</h2>
        {formData ? (
          <div>
            <p>First Name: {formData.firstName}</p>
            <p>Last Name: {formData.lastName}</p>
            <p>Username: {formData.username}</p>
            <p>Email: {formData.email}</p>
            <p>Phone No.: {formData.countryCode} {formData.phoneNo}</p> 
            <p>Country: {formData.country}</p>
            <p>City: {formData.city}</p>
            <p>PAN No.: {formData.panNo}</p>
            <p>Aadhar No.: {formData.aadharNo}</p>
          </div>
        ) : (
          <p>No form data available</p>
        )}
      </div>
    </div>
  );
};

export default SuccessComponent;
