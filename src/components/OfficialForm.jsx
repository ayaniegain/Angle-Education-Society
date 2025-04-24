import { useState, useEffect } from "react";

import "./OfficialForm.css"

const OfficialForm = () => {
  const [formData, setFormData] = useState({
    class: "",
    schooling: "",
    session: "",
    name: "",
    gender: "male", 
    dob: "",
    age: "",
    board: "cbse", 
    lastClass: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      gender: "male",
      board: "cbse",
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "dob") {
      const dob = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      setFormData((prev) => ({ ...prev, age: age >= 0 ? `${age} years` : "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.class) newErrors.class = "This field is required.";
    if (!formData.session) newErrors.session = "This field is required.";
    if (!formData.name) newErrors.name = "This field is required.";
    if (!formData.dob) newErrors.dob = "This field is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      console.log(formData);
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <style>
        {`
          .official-form-container {
            font-family: 'Roboto', sans-serif;
          }
          .official-form-container label {
            font-weight: 500;
          }
          .official-form-container input,
          .official-form-container select {
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
          }
          .official-form-container h2 {
            font-weight: 700;
          }
          .official-form-container button {
            font-weight: 500;
          }
        `}
      </style>
      <div className=" flex items-center justify-center p-4 official-form-container">
        <div className="w-full bg-white">
          {/* Form */}
          <div className="p-6">
            {/* Basic Details */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1 capitalize text-gray-600">
                    Admission for Class :
                  </label>
                  <select
                    id="class"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789336]"
                  >
                    <option value="">Select Class</option>
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                    <option value="3">Class 3</option>
                  </select>
                  {errors.class && <p className="text-red-500 text-sm mt-1">{errors.class}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 capitalize text-gray-600">
                    Mode of Schooling:
                  </label>
                  <select
                    id="schooling"
                    name="schooling"
                    value={formData.schooling}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789336]"
                  >
                    <option value="">Select Schooling</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
              <div className="mb-4 w-1/2">
                <label className="block text-sm font-medium mb-1 capitalize text-gray-600">
                  Select The Admission Session You Would Like To Apply For:
                </label>
                <select
                  id="session"
                  name="session"
                  value={formData.session}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789336]"
                >
                  <option value="">Select Session</option>
                  <option value="2025-2026">2025-2026</option>
                  <option value="2026-2027">2026-2027</option>
                </select>
                {errors.session && <p className="text-red-500 text-sm mt-1">{errors.session}</p>}
              </div>
            </div>
            <hr className="my-4 border-gray-300" />

            {/* Student's Details */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 capitalize text-gray-800">Student's Details</h2>
              <div className="grid grid-cols-2 gap-4 mb-4 w-3/3">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Full Name"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789336]"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div className="px-6 border-l border-black">
                  <label className="block text-sm font-medium mb-1 text-gray-600">Gender:</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleChange}
                        className="mr-2 accent-[#789336]"
                      />
                      Male
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleChange}
                        className="mr-2 accent-[#789336]"
                      />
                      Female
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="transgender"
                        checked={formData.gender === "transgender"}
                        onChange={handleChange}
                        className="mr-2 accent-[#789336]"
                      />
                      Transgender
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Date of Birth *:</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789336]"
                  />
                  {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                </div>
                <div className="px-6 border-l border-black">
                  <label className="block text-sm font-medium mb-1 text-gray-600">Age:</label>
                  <input
                    type="text"
                    id="age"
                    name="age"
                    value={formData.age}
                    readOnly
                    className="w-full p-2 border rounded-md "
                    placeholder="Enter age"
                  />
                </div>
              </div>
              <hr className="my-4 border-gray-300" />
            </div>

            {/* Previous Academic Information */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 capitalize text-gray-800">Previous Academic Information</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Last School affiliated is:</label>
                  <div className="flex gap-4 flex-wrap">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="board"
                        value="cbse"
                        checked={formData.board === "cbse"}
                        onChange={handleChange}
                        className="mr-2 accent-[#789336]"
                      />
                      CBSE
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="board"
                        value="icse"
                        checked={formData.board === "icse"}
                        onChange={handleChange}
                        className="mr-2 accent-[#789336]"
                      />
                      ICSE
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="board"
                        value="ib"
                        checked={formData.board === "ib"}
                        onChange={handleChange}
                        className="mr-2 accent-[#789336]"
                      />
                      IB
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="board"
                        value="state"
                        checked={formData.board === "state"}
                        onChange={handleChange}
                        className="mr-2 accent-[#789336]"
                      />
                      State Board
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="board"
                        value="other"
                        checked={formData.board === "other"}
                        onChange={handleChange}
                        className="mr-2 accent-[#789336]"
                      />
                      Other (please specify)
                    </label>
                  </div>
                </div>
                <div>
  <label className="block text-sm font-medium mb-1 text-gray-600">Last Class Attended:</label>
  <select
    id="lastClass"
    name="lastClass"
    value={formData.lastClass}
    onChange={handleChange}
    className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789336]"
  >
    <option className="text-xs text-gray-400" value="">Select Last Class Attended</option>
    <option value="kindergarten">Kindergarten</option>
    <option value="1">Class 1</option>
    <option value="2">Class 2</option>
  </select>
</div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="w-1/2 bg-[#789336] text-white py-3 rounded-md hover:bg-green-700 transition capitalize font-semibold"
              >
                Make Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfficialForm;