import React, { useState } from "react";
import './App.css';

function FormList() {
  const [name, setName] = useState ("");
  const [mobile, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [formDataList, setFormDataList] = useState([]);



  const handle = () => {
    const newData = { name, mobile, email };
    const updatedList = [...formDataList, newData];
    setFormDataList(updatedList);
    localStorage.setItem("formDataList", JSON.stringify(updatedList));
    console.log(JSON.parse(localStorage.getItem("formDataList")));
    setName("");
    setMobileNumber("");
    setEmail("");
  };

  return (
    <div className="mx-4 p-5 border shadow">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="shadow  border rounded w-[50%] py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
          mobileNumber
        </label>
        <input
          className="shadow  border rounded w-[50%] py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline"
          id="mobileNumber"
         
          placeholder="Enter your mobile Number"
          value={mobile}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow  border rounded w-[50%] py-2 px-3 text-gray-700   focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        onClick={handle}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Submit
      </button>
      <div className="mt-4  border-blue-950 shadow-lg border-4 ">
        {formDataList.map(
          (data, index) => (
          <div key={index}>
            <div>{data.name}</div>
            <div>{data.mobile}</div>
            <div>{data.email}</div>
          </div>
        ))}
      </div>
    </div>

  );
}

export default FormList;
