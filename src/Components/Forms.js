import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Forms = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneNo: "",
    countryCode: "",
    country: "",
    city: "",
    panNo: "",
    aadharNo: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const citiesByCountry = {
    India: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"],
    USA: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
    UK: ["London", "Birmingham", "Manchester", "Liverpool", "Edinburgh"],
    China: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu"],
    Japan: ["Tokyo", "Osaka", "Nagoya", "Yokohama", "Kyoto"],
    UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah"],
    France: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"],
    Russia: [
      "Moscow",
      "Saint Petersburg",
      "Novosibirsk",
      "Yekaterinburg",
      "Kazan",
    ],
    Canada: ["Toronto", "Montreal", "Vancouver", "Calgary", "Ottawa"],
  };

  const validate = useCallback(() => {
    let tempErrors = {};
    if (!formData.firstName || !/^[A-Za-z]+$/.test(formData.firstName)) {
      tempErrors.firstName =
        "First Name is required and should only contain letters.";
    }
    if (!formData.lastName || !/^[A-Za-z]+$/.test(formData.lastName)) {
      tempErrors.lastName =
        "Last Name is required and should only contain letters.";
    }
    if (!formData.username) {
      tempErrors.username = "Username is required.";
    }
    if (!formData.email) {
      tempErrors.email = "Email is required.";
    }
    if (
      !formData.password ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      tempErrors.password =
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character.";
    }
    if (!formData.phoneNo) {
      tempErrors.phoneNo = "Phone Number is required.";
    }
    if (!formData.country) {
      tempErrors.country = "Country is required.";
    }
    if (!formData.city) {
      tempErrors.city = "City is required.";
    }
    if (
      !formData.panNo ||
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(formData.panNo)
    ) {
      tempErrors.panNo =
        "PAN Number is required and should contain both letters and numbers.";
    }
    if (!formData.aadharNo || !/^\d{16}$/.test(formData.aadharNo)) {
      tempErrors.aadharNo =
        "Aadhar Number is required and should be 16 digits.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }, [formData]);

  useEffect(() => {
    if (submitted) {
      validate();
    }
  }, [formData, submitted, validate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      navigate("/success", { state: { formData } });
    }
  };

  const isFormIncomplete = () => {
    for (const key in formData) {
      if (!formData[key]) {
        return true;
      }
    }
    return false;
  };


  return (
    <div className="container-form border rounded-lg p-4">
      <div className="flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-4 overflow-y-auto"
        >
          <div>
            <h1>Forms and Form Validation</h1>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span>{errors.firstName}</span>}
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <span>{errors.lastName}</span>}
          </div>
          {(errors.firstName || errors.lastName) && (
            <div className="section-error">
              Please fix the errors in the Name section.
            </div>
          )}
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <span>{errors.username}</span>}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <label>Password:</label>
            <input
              type={passwordShown ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setPasswordShown(!passwordShown)}
            >
              {passwordShown ? "Hide" : "Show"}
            </button>
            {errors.password && <span>{errors.password}</span>}
          </div>
          {(errors.username || errors.email || errors.password) && (
            <div className="section-error">
              Please fix the errors in the Account section.
            </div>
          )}

          <div>
            <label>Phone No.:</label>
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
            >
              <option value="">Select Country Code</option>
              <option value="+91">+91 (India)</option>
              <option value="+86">+86 (China)</option>
              <option value="+33">+33 (France)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+81">+81 (Japan)</option>
              <option value="+971">+971 (UAE)</option>
              <option value="+7">+7 (Russia)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+1">+1 (Canada)</option>
            </select>
            <input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
            />
            {errors.phoneNo && <span>{errors.phoneNo}</span>}
          </div>

          <div>
            <label>Country:</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select Country</option>
              {Object.keys(citiesByCountry).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && <span>{errors.country}</span>}
          </div>
          <div>
            <label>City:</label>
            <select name="city" value={formData.city} onChange={handleChange}>
              <option value="">Select City</option>
              {formData.country &&
                citiesByCountry[formData.country].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
            {errors.city && <span>{errors.city}</span>}
          </div>
          <div>
            <label>PAN No.:</label>
            <input
              type="text"
              name="panNo"
              value={formData.panNo}
              onChange={handleChange}
            />
            {errors.panNo && <span>{errors.panNo}</span>}
          </div>
          <div>
            <label>Aadhar No.:</label>
            <input
              type="text"
              name="aadharNo"
              value={formData.aadharNo}
              onChange={handleChange}
            />
            {errors.aadharNo && <span>{errors.aadharNo}</span>}
          </div>

          <button
            type="submit"
            disabled={Object.keys(errors).length > 0 || isFormIncomplete()}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forms;
