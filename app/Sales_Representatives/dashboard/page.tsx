"use client"
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
//import Session from '../components/session';
import ProductCard from '../components/product_card';
//import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import UpdateProduct from '../update_product/page';
import Session from '../components/session';
import Link from 'next/link';


export default function Dashboard() {
  
   const router = useRouter();
   const [jsonData, setJsonData] = useState([]);
   const [productName, setSearch] = useState('');
   const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleUpdate(items: any){

        UpdateProduct(items);
        router.push('/Sales_Representatives/update_product');

  }

  // const handleCart = async (items: any) => {}

  async function handleCart(items: any){
    try {

      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      if (token) {
        // var count = 0;
        // count = count + 1;
        // if(count == 1){
          const response = await axios.post('http://localhost:3001/seller/order/' + username, {
            productId: items.productId,
            productName: items.productName,
            productQuantity: 1,
            productPrice: items.productPrice
          });
        // }else if(count>1){
        //   const response = await axios.put('http://localhost:3001/seller/update_order', {
        //     productId: items.productId,
        //     productName: items.productName,
        //     productQuantity: count,
        //     productPrice: items.productPrice
        //   });
        // }
        

        toast.success('Add to Cart');

      } else {
          
      }
    } catch(error){
      console.error('Error Add Cart:', error);
    }
  }

  async function handleDelete(items: any){
    try{
      const response = await axios.delete('http://localhost:3001/seller/delete_product/' + items.productName);

      toast.success('Remove Product');
    }catch(error){
      console.error('Error Remove:', error);
    }
  }


  const fetchProducts = async () => {
    try {
    const response: any = await axios.get('http://localhost:3001/seller/show_all_product', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true });
    const jsonData = response.data
      setJsonData(jsonData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  var flag = 0;
  //var searchData: any;
 

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const search: any = await axios.get('http://localhost:3001/seller/search_product_name/' + productName);
      const searchData = search.data;
      //const jsonData = response.data
      //setJsonData(jsonData);
      flag = 1;
      setSearchData(searchData);
      //fetchProducts();
      } catch (error) {
      console.error(error);
      }
      console.log(productName);
      console.log(searchData);
      console.log(flag);
  };
  // const fetchProducts = async () => {
  //   if(flag == 1){
  //     const response: any = await axios.get('http://localhost:3001/seller/search_product_name/' + productName);
  //     jsonData = response.data;
  //     return jsonData;
  //   }
  //   else{
  //     const response: any = await axios.get('http://localhost:3001/seller/show_all_product');
  //     jsonData = response.data
  //     return jsonData;
  //   }

  // }

  // function setSearchData(searchdata: any){

  //   return(
  //     <>
  //       {searchdata.map((items: any) => {
  //           return (
  //             <>
  //               <ProductCard data={items} />
  //             </>

  //           );
  //         }

  //       )}
  //     </>
  //   );

  // }
  // if(flag === 1){
  //   return(
  //     <>
  //         {/* {searchData.map((items: any) => {
  //           return (
  //             <ProductCard data={items} />

  //           );
  //         }

  //         )} */}
          
  //         <h1>{setSearchData(searchData)}</h1>

  //     </>
  //   );
  // }
  
  // else{
  return (<>
    <Session />
     <div className=" justify-center bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
      <Toaster />
      {/* <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label htmlFor="search" className="block text-gray-700 font-bold mb-2">
            Search
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productName}
            onChange={(e) => setSearch(e.target.value)}
            //className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button type="submit">Submit</button>
      </form> */}

      <form onSubmit={handleSubmit} >
        <div className="form-control">
          <label htmlFor="search" className="block text-gray-700 font-bold mb-2">
            Search
          </label>
          <input type="text" id="name" name="name" value={productName} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="input input-bordered w-24 md:w-auto"/>
          <button type="submit">Submit</button>
        </div>
      </form>

      {/* {flag === 1 ? (<div className="grid grid-cols-6 gap-2">
        {searchData.map((items: any, index: any) => {
           return (<div key={index}>
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img className="p-8 rounded-t-lg" src={'http://localhost:3001/seller/getimage/' + items.filename} alt="product image" />
              </a>
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {items.productName}
                </h5>
              Id:  {items.productId}<br />
              Code:  {items.productCode}<br />
              Quantity:  {items.productQuantity}<br />
              Category:  {items.productCategory}<br />
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">৳{items.productPrice}</span>
                <button className="text-white bg-neutral hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleCart(items)}>Add to cart</button>
              </div> <br />
              <div className="flex items-center justify-between">
                <button className="text-white bg-neutral hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleUpdate(items)}>Update</button>
                <button className="text-white bg-neutral hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleDelete(items)}>Delete</button>
              </div>
              </div>
            </div>
          </div>

          );
        }


        )}
      </div>) : ( */}
      <div className="grid grid-cols-6 gap-2">
        {jsonData.map((items: any, index: any) => {
           return (<div key={index}>
            {/* <ProductCard data={items} /> */}
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img className="p-8 rounded-t-lg" src={'http://localhost:3001/seller/getimage/' + items.filename} alt="product image" />
              </a>
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {items.productName}
                </h5>
              Id:  {items.productId}<br />
              Code:  {items.productCode}<br />
              Quantity:  {items.productQuantity}<br />
              Category:  {items.productCategory}<br />
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">৳{items.productPrice}</span>
                <button className="text-white bg-neutral hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleCart(items)}>Add to cart</button>
              </div> <br />
              <div className="flex items-center justify-between">
            {/* <Link href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</Link>
            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</a> */}
                <button className="text-white bg-neutral hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleUpdate(items)}>Update</button>
                <button className="text-white bg-neutral hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleDelete(items)}>Delete</button>
              </div>
              </div>
            </div>
          </div>

          );
        }


        )}
      </div> {/* )} */}
    </div>
  </>);
  //}
}

// export default function Dashboard() {
//   const [productName, setSearch] = useState('');
//   var jsondata: any;
//   var flag = 0;

//   useEffect(() => {
//      fetchProducts();
//   }, []);

//   const handleSubmit = async (e: any) => {
//         e.preventDefault();
//         try {
//           //const search: any = await axios.get('http://localhost:3001/seller/search_product_name/' + productName);
//           //searchdata = search.data;
//           //setSearchData(searchdata);
//           flag = 1;
//           fetchProducts();
//         } catch (error) {
//           console.error(error);
//         }
//         console.log(productName);
//         //console.log(searchdata);
//   };

//   const fetchProducts = async () => {
//     if(flag == 1){
//       var response: any = await axios.get('http://localhost:3001/seller/search_product_name/' + productName);
//       jsondata = response.data;
//     }
//     else{
//       var response: any = await axios.get('http://localhost:3001/seller/show_all_product');
//       jsondata = response.data;
//     }
//     return jsondata;
//   }
 
 
//   return (<>
//     {/* <Session /> */}
//     <div className=" justify-center bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
//       <Toaster />
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//           <label htmlFor="search" className="block text-gray-700 font-bold mb-2">
//             Search
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={productName}
//             onChange={(e) => setSearch(e.target.value)}
//             //className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           <button type="submit">Submit</button>
//       </form>
 
//       <div className="grid grid-cols-6 gap-2">
//         {jsondata && jsondata.map((items: any, index: any) => {
//           return (<div key={index}>
 
//             <ProductCard data={items} />
//           </div>
 
//           );
//         }
 
 
//         )}
//       </div>
//     </div>
//   </>);
// }