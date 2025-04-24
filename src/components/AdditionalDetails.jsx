import React from 'react';
import img from "../assets/Pic Icon.png";
import tick from "../assets/Core.png";

const AdditionalDetails = () => {
  const [formData, setFormData] = React.useState({
    class: "",
    schooling: "",
    session: "",
    name: "",
    profilePicture: null,
    gender: "male",
    dob: "",
    age: "",
    onlyChild: "yes",
    category: "general",
    speciallyAbled: "yes",
    height: "",
    weight: "",
    bloodGroup: "",
    motherTongue: "",
    religion: "",
    fatherName: "",
    fatherAddress: "",
    fatherOccupation: "",
    motherName: "",
    motherAddress: "",
    motherOccupation: "",
    sameAsFatherAddress: false,
  });

  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      gender: "male",
      onlyChild: "yes",
      category: "general",
      speciallyAbled: "yes",
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, profilePicture: "File size exceeds 2MB." }));
        return;
      }
      setFormData({ ...prev, profilePicture: file });
      setErrors((prev) => ({ ...prev, profilePicture: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.class) newErrors.class = "This field is required.";
    if (!formData.session) newErrors.session = "This field is required.";
    if (!formData.name) newErrors.name = "This field is required.";
    if (!formData.dob) newErrors.dob = "This field is required.";
    if (!formData.profilePicture) newErrors.profilePicture = "Profile picture is required.";
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
    <div className="min-h-screen flex items-center justify-center p-4 official-form-container">
      <div className="w-full bg-white">
        {/* Admission Details */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600 uppercase">
                Admission for Class :
              </label>
              <select
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
              <label className="block text-sm font-medium mb-1 text-gray-600 uppercase">
                Mode of Schooling:
              </label>
              <select
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
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1 text-gray-600 uppercase">
                Select The Admission Session You Would Like To Apply For:
              </label>
              <select
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
            <div className="w-full"></div>
          </div>
        </div>
        <hr className="my-4 border-gray-600" />

        {/* Student's Details */}
        <div className="p-6 grid grid-cols-2/4 gap-4">
          <div className="w-full">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 uppercase">Student's Details</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-600">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Full Name"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789336]"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-600">Profile Picture</label>
              <div className="flex justify-between items-center border-dashed border-2 border-gray-600 p-4 rounded-md">
                <div className="w-16 h-16 bg-gray-200 mr-4">
                  <img src={img} alt="img" />
                </div>
                <p className="text-gray-600">Upload a profile picture maximum 2MB</p>
                <div className="flex justify-center items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="profilePicture"
                  />
                  <label
                    htmlFor="profilePicture"
                    className="mt-2 inline-block px-4 py-2 bg-[#789336] text-white rounded-md cursor-pointer hover:bg-[#687c2f]"
                  >
                    Browse
                  </label>
                </div>
              </div>
              {errors.profilePicture && <p className="text-red-500 text-sm mt-1">{errors.profilePicture}</p>}
            </div>
            <div className="mb-4">
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
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">Date of Birth *:</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789336]"
                />
                {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">Age:</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-100"
                  placeholder="Age will be calculated"
                />
              </div>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex-1 border-r-2 border-gray-600 pl-2">
                <label className="block text-sm font-medium mb-1 text-gray-600">Only Child:</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="onlyChild"
                      value="yes"
                      checked={formData.onlyChild === "yes"}
                      onChange={handleChange}
                      className="mr-2 accent-[#789336]"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="onlyChild"
                      value="no"
                      checked={formData.onlyChild === "no"}
                      onChange={handleChange}
                      className="mr-2 accent-[#789336]"
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="flex-2 border-r-2 border-gray-600 pl-2">
                <label className="block text-sm font-medium mb-1 text-gray-600">Category:</label>
                <div className="flex gap-2 flex-wrap">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="general"
                      checked={formData.category === "general"}
                      onChange={handleChange}
                      className="mr-1 accent-[#789336]"
                    />
                    General
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="sc"
                      checked={formData.category === "sc"}
                      onChange={handleChange}
                      className="mr-1 accent-[#789336]"
                    />
                    SC
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="st"
                      checked={formData.category === "st"}
                      onChange={handleChange}
                      className="mr-1 accent-[#789336]"
                    />
                    ST
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="obc"
                      checked={formData.category === "obc"}
                      onChange={handleChange}
                      className="mr-1 accent-[#789336]"
                    />
                    OBC
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="ews"
                      checked={formData.category === "ews"}
                      onChange={handleChange}
                      className="mr-1 accent-[#789336]"
                    />
                    EWS
                  </label>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-gray-600">Specially Abled:</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="speciallyAbled"
                      value="yes"
                      checked={formData.speciallyAbled === "yes"}
                      onChange={handleChange}
                      className="mr-2 accent-[#789336]"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="speciallyAbled"
                      value="no"
                      checked={formData.speciallyAbled === "no"}
                      onChange={handleChange}
                      className="mr-2 accent-[#789336]"
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full col-span-2">
            <hr className="my-4 border-gray-600" />

            {/* Previous Academic Information */}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 uppercase">Previous Academic Information</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Last School affiliated to:</label>
                  <div className="flex gap-4 flex-wrap">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="lastSchoolAffiliated"
                        value="cbse"
                        checked={formData.lastSchoolAffiliated === "cbse"}
                        onChange={handleChange}
                        className="mr-2 accent-[#789336]"
                      />
                      CBSE
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="lastSchoolAffiliated"
                        value="icse"
                        checked={formData.lastSchoolAffiliated === "icse"}
                        onChange={handleChange}
                        className="mr-2 accent-[#789336]"
                      />
                      ICSE
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="lastSchoolAffiliated"
                        value="ib"
                        checked={formData.lastSchoolAffiliated === "ib"}
                        onChange={handleChange}
                        className="mr-2 accent-[#789336]"
                      />
                      IB
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="lastSchoolAffiliated"
                        value="stateBoard"
                        checked={formData.lastSchoolAffiliated === "stateBoard"}
                        onChange={handleChange}
                        className="mr-2 accent-[#789336]"
                      />
                      State Board
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="lastSchoolAffiliated"
                        value="other"
                        checked={formData.lastSchoolAffiliated === "other"}
                        onChange={handleChange}
                        className="mr-2 accent-[#789336]"
                      />
                      Other (please specify)
                    </label>
                  </div>
                </div>
                <div className="flex items-end">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1 text-gray-600">Second Language Preference:</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="secondLanguage"
                          value="hindi"
                          checked={formData.secondLanguage === "hindi"}
                          onChange={handleChange}
                          className="mr-2 accent-[#789336]"
                        />
                        Hindi
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="secondLanguage"
                          value="bengali"
                          checked={formData.secondLanguage === "bengali"}
                          onChange={handleChange}
                          className="mr-2 accent-[#789336]"
                        />
                        Bengali
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Last Class Attended:</label>
                  <select
                    name="lastClassAttended"
                    value={formData.lastClassAttended}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789336]"
                  >
                    <option value="">Select Last Class Attended</option>
                    <option value="kindergarten">Kindergarten</option>
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                  </select>
                  {errors.lastClassAttended && <p className="text-red-500 text-sm mt-1">{errors.lastClassAttended}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Last School Attended:</label>
                  <input
                    type="text"
                    name="lastSchoolName"
                    value={formData.lastSchoolName}
                    onChange={handleChange}
                    placeholder="Enter School's Name"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#789336]"
                  />
                  {errors.lastSchoolName && <p className="text-red-500 text-sm mt-1">{errors.lastSchoolName}</p>}
                </div>
              </div>
            </div>
            <hr className="my-4 border-gray-600" />

            {/* Student's Additional Information */}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 uppercase">Student's Additional Information</h2>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Height:</label>
                  <select
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <option value="">Select Height</option>
                    <option value="4ft">4ft</option>
                    <option value="5ft">5ft</option>
                    <option value="6ft">6ft</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Weight:</label>
                  <select
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <option value="">Select Weight</option>
                    <option value="30kg">30kg</option>
                    <option value="40kg">40kg</option>
                    <option value="50kg">50kg</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Blood Group:</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-800 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                    <option value="AB+">AB+</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Mother Tongue:</label>
                  <input
                    type="text"
                    name="motherTongue"
                    value={formData.motherTongue}
                    onChange={handleChange}
                    placeholder="Enter Mother Tongue"
                    className="w-full p-3 border border-gray-600 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Religion:</label>
                  <select
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <option value="">Select Religion</option>
                    <option value="Hinduism">Hinduism</option>
                    <option value="Islam">Islam</option>
                    <option value="Christianity">Christianity</option>
                    <option value="Sikhism">Sikhism</option>
                  </select>
                </div>
              </div>
            </div>
            <hr className="my-4 border-gray-600" />

            {/* Parents/Guardian Information */}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 uppercase">Parents/Guardian Information</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-600">Father/Guardian's Name:</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="Father/Guardian's Name"
                  className="w-1/2 p-3 border border-gray-600 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-600">Father/Guardian's Residential Address:</label>
                <input
                  name="fatherAddress"
                  value={formData.fatherAddress}
                  onChange={handleChange}
                  placeholder="Father/Guardian's Residential Address"
                  className="w-1/2 p-3 border border-gray-600 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  rows="3"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-600">Father/Guardian's Occupation:</label>
                <input
                  type="text"
                  name="fatherOccupation"
                  value={formData.fatherOccupation}
                  onChange={handleChange}
                  placeholder="Father/Guardian's Occupation"
                  className="w-1/2 p-3 border border-gray-600 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-600">Mother's Name:</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  placeholder="Mother's Name"
                  className="w-1/2 p-3 border border-gray-600 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-600">Mother's Residential Address:</label>
                <div className="flex items-center gap-2">
                  <input
                    name="motherAddress"
                    value={formData.motherAddress}
                    onChange={handleChange}
                    placeholder="Enter Mother's Residential Address"
                    className="w-1/2 p-3 border border-gray-600 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    rows="3"
                    disabled={formData.sameAsFatherAddress}
                  />
                  <label className="flex items-center">
                    {/* <input
                      type="checkbox"
                      name="sameAsFatherAddress"
                      checked={formData.sameAsFatherAddress}
                      onChange={handleChange}
                      className="mr-2"
                    /> */}
                    <img src={tick} alt="tick" className="w-4 h-4 " />
                    <p className='px-2'>

                    Same as Father's Residential Address
                    </p>

                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-600">Mother's Occupation:</label>
                <input
                  type="text"
                  name="motherOccupation"
                  value={formData.motherOccupation}
                  onChange={handleChange}
                  placeholder="Mother's Occupation"
                  className="w-1/2 p-3 border border-gray-600 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center p-6">
          <button
            onClick={handleSubmit}
            className="w-1/2 bg-[#789336] text-white py-3 rounded-md hover:bg-[#687c2f] transition font-semibold uppercase"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDetails;