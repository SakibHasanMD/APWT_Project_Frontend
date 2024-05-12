"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import UpdateProduct from '../update_product/page';
import NavBar from '../components/navbar';



interface FormData {
  name: string;
  email: string;
  number: string;
  position: string;
  username: string;
  password: string;
  myfile: File | null;
}

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    number: '',
    position: 'seller',
    username: '',
    password: '',
    myfile: null,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formDataObject = new FormData();
        formDataObject.append('name', formData.name);
        formDataObject.append('email', formData.email);
        formDataObject.append('number', formData.number);
        formDataObject.append('position', formData.position);
        formDataObject.append('username', formData.username);
        formDataObject.append('password', formData.password);
        if (formData.myfile) {
          formDataObject.append('profilePic', formData.myfile);
        }
        console.log(formDataObject);
        console.log(formData);
        const response = await axios.post('http://localhost:3001/auth/register', formDataObject);
        
        toast.success('Signup successful!');
        router.push('/Sales_Representatives/sign_in');
     
      } catch (error) {
        console.error('Error during signup:', error);
        toast.error('Signup failed. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'myfile') {
      setFormData({ ...formData, [name]: files ? files[0] : null });
      setErrors({ ...errors, [name]: null });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (formData: FormData): Partial<FormData> => {
    const errors: Partial<FormData> = {};

    if (!formData.name) {
      errors.name = 'Name is required';
    } else if (!/^[A-Za-z]+$/.test(formData.name)) {
      errors.name = 'Name field should contain only alphabetic character';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.number) {
        errors.number = 'Number is required';
    } else if (!/^[0-9]+$/.test(formData.number)) {
      errors.number = 'Phone number field must contain only digits';
    }

    if (!formData.position) {
        errors.position = 'Position is required';
    }

    if (!formData.username) {
        errors.username = 'Username is required';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!/.*[0-9].*/.test(formData.password)) {
      errors.password = 'Password field must contain one of the numeric character';
    } else if (!/[#@\$&]/.test(formData.password)) {
      errors.password = 'Password field must contain one of the special characters (@ or # or $ or &)';
    }


    return errors;
  };

  return (
    // <div className="max-w-md mx-auto mt-8">
    //   <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
    //   <Toaster />
    //   <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    //     <div className="mb-4">
    //       <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
    //         Name
    //       </label>
    //       <input
    //         type="text"
    //         id="name"
    //         name="name"
    //         value={formData.name}
    //         onChange={handleInputChange}
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //       />
    //       {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
    //     </div>
    //     <div className="mb-4">
    //       <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
    //         Email
    //       </label>
    //       <input
    //         type="email"
    //         id="email"
    //         name="email"
    //         value={formData.email}
    //         onChange={handleInputChange}
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //       />
    //       {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
    //     </div>
    //     <div className="mb-4">
    //       <label htmlFor="number" className="block text-gray-700 font-bold mb-2">
    //         Number
    //       </label>
    //       <input
    //         type="number"
    //         id="number"
    //         name="number"
    //         value={formData.number}
    //         onChange={handleInputChange}
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //       />
    //       {errors.number && <p className="text-red-500 text-xs italic">{errors.number}</p>}
    //     </div>
    //     <div className="mb-4">
    //       <label htmlFor="position" className="block text-gray-700 font-bold mb-2">
    //         Position
    //       </label>
    //       <input
    //         type="position"
    //         id="position"
    //         name="position"
    //         value={formData.position}
    //         onChange={handleInputChange}
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //       />
    //       {errors.position && <p className="text-red-500 text-xs italic">{errors.position}</p>}
    //     </div>
    //     <div className="mb-4">
    //       <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
    //         Username
    //       </label>
    //       <input
    //         type="username"
    //         id="username"
    //         name="username"
    //         value={formData.username}
    //         onChange={handleInputChange}
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //       />
    //       {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
    //     </div>
    //     <div className="mb-4">
    //       <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         id="password"
    //         name="password"
    //         value={formData.password}
    //         onChange={handleInputChange}
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //       />
    //       {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
    //     </div>
    //     <div className="mb-6">
    //       <label htmlFor="myfile" className="block text-gray-700 font-bold mb-2">
    //         File Upload
    //       </label>
    //       <input
    //         type="file"
    //         id="myfile"
    //         name="myfile"
    //         onChange={handleInputChange}
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //       />
    //     </div>
    //     <div className="flex items-center justify-between">
    //       <button
    //         type="submit"
    //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
    //         Sign Up
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <>
    <NavBar />
    <div className="max-w-md mx-auto mt-8">
        <div className="flex items-center justify-center gap-2 mt-3 mb-3">
            <h1 className="">Sign up</h1>
        </div>
        <Toaster />
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="input input-bordered" placeholder="name" />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
                <input type="text" id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange} className="input input-bordered" placeholder="Email" />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="number" id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange} className="input input-bordered" placeholder="Phone Number" />
                {errors.number && <p className="text-red-500 text-xs italic">{errors.number}</p>}
            </div>
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="text" id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange} className="input input-bordered" placeholder="Position" />
                {errors.position && <p className="text-red-500 text-xs italic">{errors.position}</p>}
            </div>
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="text" id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange} className="input input-bordered" placeholder="Username" />
                {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
            </div>
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="password" id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange} className="input input-bordered" placeholder="password" />
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
            </div>
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="file" id="myfile"
                    name="myfile"
                    onChange={handleInputChange} className="file-input file-input-bordered file-input-sm w-full max-w-xs" />
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="btn btn-active"
                >
                    Sign Up
                </button>
            </div>
        </form>
    </div>
</>
  );
};
