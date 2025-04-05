import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '../ui/card.jsx';
import { Label } from '../ui/label.jsx';
import { Edit2Icon, Trash2 } from 'lucide-react';

const AddressCard = ({ addressinfo,handleDeleteAddress,handleEditAddress }) => {
  const [borderColor, setBorderColor] = useState('border-gray-200');

  return (
    <Card className={`border-2 ${borderColor} transition-colors duration-200`}>
      <CardContent className="grid gap-3 mt-8">
        <Label className="bg-gray-50 rounded-lg p-2 leading-6 text-sm font-semibold border border-gray-200 text-gray-700">
          Address: {addressinfo?.address}
        </Label>
        <Label>City: {addressinfo?.city}</Label>
        <Label>Pincode: {addressinfo?.pincode}</Label>
        <Label>Phone: {addressinfo?.phone}</Label>
        <Label>Notes: {addressinfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between items-center gap-5">
        <button
        onClick={()=>handleEditAddress(addressinfo)}
          className=' flex justify-center items-center w-full bg-slate-800 rounded-lg p-2 hover:bg-green-500'
          onMouseEnter={() => setBorderColor('border-green-500')}
          onMouseLeave={() => setBorderColor('border-gray-300')}
        >
          <Edit2Icon className='text-white text-sm w-5 h-5' />
        </button>
        <button
        onClick={()=>handleDeleteAddress(addressinfo)}
          className='flex justify-center items-center w-full bg-slate-800 rounded-lg p-2 hover:bg-red-500'
          onMouseEnter={() => setBorderColor('border-red-500')}
          onMouseLeave={() => setBorderColor('border-gray-300')}
        >
          <Trash2 className='text-white text-sm w-5 h-5' />
        </button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
