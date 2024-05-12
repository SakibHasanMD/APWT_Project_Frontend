'use client'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Session from '../components/session';
import { useRouter } from 'next/router';

interface User {
    sellerId: number;
    name: string;
    email: string;
    number: string;
    position: string;
    username: string;
    filename: string
  }


export default function ShowProfile() {

    //const [profilePic, setPic] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [address, setAddressInput] = useState('');
    // const [sellerId, setId] = useState(user?.sellerId);
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [number, setNumber] = useState('');
    // const [position, setPosition] = useState('');
    // const [username, setUsername] = useState('');


    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            if (token) {
              const response = await axios.get('http://localhost:3001/seller/show_profile/' + username, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
    
              setUser(response.data);
              console.log(response.data);
            } else {
                
            }
        } 
        catch (error) {
            console.error('Error fetching user data:', error);
        } 
    };
    
        fetchUserData();
      });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
        //   const productData = new FormData();
        //   productData.append('productName', productName);
        //   productData.append('productCode', productCode);
        //   productData.append('productQuantity', productQuantity);
        //   productData.append('productCategory', productCategory);
        //   productData.append('productPrice', productPrice);
        //   productData.append('productPic', productPic);
        //   //const response = await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT + '/seller/addproduct', productData);
        //   console.log(response);
          } catch (error) {
          console.error(error);
          }
        //console.log({ productName, productCode, productQuantity, productCategory, productPrice, productPic });
    };
 
    return (<>
        <Session />
            {/* <label htmlFor="sellerId">Seller Id:</label>
            <input
                type="text"
                id="sellerId"
                value={user?.sellerId}
                //onChange={(e) => setId(e.value)}
            /> <br/>
            <label htmlFor="name">Name:</label>
            <input
                type="name"
                id="name"
                value={user?.name}
                //onChange={(e) => setName(e.target.value)}
            /> <br/>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={user?.email}
                //onChange={(e) => setEmail(e.target.value)}
            /> <br/>
            <label htmlFor="number">Number:</label>
            <input
                type="number"
                id="number"
                value={user?.number}
                //onChange={(e) => setNumber(e.target.value)}
            /> <br/>
            <label htmlFor="position">Position:</label>
            <input
                type="position"
                id="position"
                value={user?.position}
                //onChange={(e) => setPosition(e.target.value)}
            /> <br/>
            <label htmlFor="username">Username:</label>
            <input
                type="username"
                id="username"
                value={user?.username}
                //onChange={(e) => setUsername(e.target.value)}
            /> <br/>
             <img alt="Tailwind CSS Navbar component" src={'http://localhost:3001/seller/getimage/'+user?.filename} />
            {/* <input
                type="file"
                id="productPic"
                value={user?.filename}
                //onChange={(e) => setPic(e.target.value)}
                //onChange={handleChange}
            /> <br/>
            <button type="submit">Submit</button> */}

           <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={'http://localhost:3001/seller/getimage/' + user?.filename} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">ID: {user?.sellerId}</h2>
                    Name: {user?.name} <br />
                    email: {user?.email} <br />
                    UserName: {user?.number} <br />
                    UserName: {user?.position} <br />
                    UserName: {user?.username} <br />
                    {/* <input type="text" value={emailInput} onChange={handleEmailChange} /> */}
                    <div className="card-actions">
                        <button className="btn btn-primary">Update</button>
                    </div>
                </div>
            </div>
        </>
    );
}