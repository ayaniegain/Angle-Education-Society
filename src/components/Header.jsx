import React, { useState } from "react";
import user from "../assets/User.png";
import payment from "../assets/Payment.png";
import adddetails from "../assets/Additional Details.png";
import greenpayment from "../assets/greenpayment.png";
import greenadddetails from "../assets/green-add.png";
import { Link } from "react-router";

function Header() {
  const [percentage, setPercentage] = useState(30);

  function handlePercentage(per) {
    setPercentage(per);
  }

  return (
    <div className="w-full bg-white shadow-md p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Kalyani Public School, Barasat Registration Form
      </h2>

      <div className="flex justify-around items-center mb-2">
        <div className="flex flex-col items-center">
          <Link to={"/"} onClick={() => handlePercentage(30)}>
            <img src={user} alt="Basic Details" className="w-12 h-12 mb-1" />
          </Link>
          <span
            className={`text-sm ${
              percentage === 30 ? "text-[#789336]" : "text-[#789336]"
            }`}
          >
            Basic Details
          </span>
        </div>

        <div className="flex flex-col items-center">
          <Link to={"/payment"} onClick={() => handlePercentage(60)}>
            <img
              src={
                percentage === 60 || percentage === 100 ? greenpayment : payment
              }
              alt="Payment"
              className="w-12 h-12 mb-1"
            />
          </Link>
          <span
            className={`text-sm ${
              percentage === 60 || percentage === 100
                ? "text-[#789336]"
                : "text-gray-600"
            }`}
          >
            Payment
          </span>
        </div>

        <div className="flex flex-col items-center">
          <Link to={"/additional"} onClick={() => handlePercentage(100)}>
            <img
              src={percentage === 100 ? greenadddetails : adddetails}
              alt="Additional Details"
              className="w-12 h-12 mb-1"
            />
          </Link>
          <span
            className={`text-sm ${
              percentage === 100 ? "text-[#789336]" : "text-gray-600"
            }`}
          >
            Additional Details
          </span>
        </div>
      </div>

      <div className="w-full h-1 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#789336]"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Header;
