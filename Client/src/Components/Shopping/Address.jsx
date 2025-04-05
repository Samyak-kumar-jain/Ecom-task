import { addNewAddress, fetchAllAddresses,deleteAddress, editaAddress } from "../../features/Shopslice/Addressslice.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "./AddressCard.jsx";

export const AddressForm = () => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    pincode: "",
    phone: "",
    notes: "",
  });
  const [currEditedId,serCurrEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authen)
  const { addressList } = useSelector((state) => state.address)

  // Function to check if all fields are filled
  const isFormValid = () => {
    return (
      formData.address.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.pincode.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.notes.trim() !== ""
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      currEditedId!==null?dispatch(editaAddress({
        userId:user?.id,addressId:currEditedId,formData
      })).then((data)=>{
        if(data?.payload?.success){
          dispatch(fetchAllAddresses(user?.id))
          serCurrEditedId(null);
          setFormData({
            address: "",
            city: "",
            pincode: "",
            phone: "",
            notes: "",
          })

        }
       

      }):
      dispatch(addNewAddress({
        ...formData,
        userId: user?.id,
      })).then((data) => {
        console.log(data)
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id))
          setFormData({
            address: "",
            city: "",
            pincode: "",
            phone: "",
            notes: "",
          })
        }
      })


    }
  };
  useEffect(()=>{
      dispatch(fetchAllAddresses(user?.id))
  },[dispatch])
  
  const handleDeleteAddress = (getCurrentAddress) => {
    dispatch(deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllAddresses(user?.id));
      }

    })
  }
  const handleEditAddress = (getCurrentAddress)=>{
      serCurrEditedId(getCurrentAddress?._id);
      setFormData({...formData,
        address: getCurrentAddress?.address,
        city: getCurrentAddress?.city,
        pincode: getCurrentAddress?.pincode,
        phone: getCurrentAddress?.phone,
        notes: getCurrentAddress?.notes,

      })
  }
  
  


  return (

    <>
    <div>
      <div className="mb-5 p-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
        {

          addressList && addressList.length
            > 0 ? addressList.map((adressItem) => {
            return( <AddressCard handleDeleteAddress={handleDeleteAddress}
             handleEditAddress={handleEditAddress}  addressinfo={adressItem}>
                
              </AddressCard>) 


            }) : <div className="text-3xl flex justify-center items-center mt-3 font-bold text-gray-500">Add Address</div>}

      </div>
      <form
        className="w-full mt-5 mx-auto bg-white text-gray-800 p-6 rounded-md shadow-sm space-y-4 border"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col space-y-1">
          <label htmlFor="address" className="font-semibold text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-200 text-gray-800 p-2 rounded-md focus:outline-none"
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="city" className="font-semibold text-gray-700">City</label>
          <input
            type="text"
            name="city"
            placeholder="Enter your city"
            value={formData.city}
            onChange={handleChange}
            className="border border-gray-200 text-gray-800 p-2 rounded-md focus:outline-none "
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="pincode" className="font-semibold text-gray-700">Pincode</label>
          <input
            type="text"
            name="pincode"
            placeholder="Enter your pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="border border-gray-200 text-gray-800 p-2 rounded-md focus:outline-none "
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="phone" className="font-semibold text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-200 text-gray-800 p-2 rounded-md focus:outline-none "
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="notes" className="font-semibold text-gray-700">Notes</label>
          <textarea
            name="notes"
            placeholder="Enter any additional notes"
            value={formData.notes}
            onChange={handleChange}
            className="border border-gray-200 text-gray-800 p-2 rounded-md focus:outline-none "
          />
        </div>

        <button
          type="submit"
          className={`w-full text-white p-2 rounded-md transition duration-200 ${isFormValid() ? "bg-gray-800 hover:bg-black" : "bg-gray-400 cursor-not-allowed"
            }`}
          disabled={!isFormValid()}  // Disable if form is invalid
        >
          {currEditedId!==null?"Edit Address":"Add Address"}
        </button>
      </form>
      </div>
    </>
  );
};
