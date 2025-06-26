import Image from 'next/image';
import React from 'react'

export default function Product() {
// Array of product data
const products = [
    { name: "Nike Sneakers", price: "$120", image: "/Images/prod1.png" },
    { name: "Adidas Sneakers", price: "$140", image: "/Images/prod2.png" },
    { name: "Puma Sneakers", price: "$100", image: "/Images/prod3.png" },
    { name: "Reebok Sneakers", price: "$110", image: "/Images/prod3.png" },
    { name: "Nike Sneakers", price: "$120", image: "/Images/prod1.png" },
    { name: "Adidas Sneakers", price: "$140", image: "/Images/prod2.png" },
    { name: "Puma Sneakers", price: "$100", image: "/Images/hero.png" },
];


    return (
    <div id="products" className="flex justify-center items-center flex-wrap gap-2.5 p-2.5 bg-primary-light">
        {
            products.map((product, idx) => (
                <div key={idx} className="card w-64 bg-transparent border-2 border-primary-dark rounded-xl shadow-xl/20 shadow-black transition-shadow overflow-hidden text-start ">
                    <Image id="sneaker" src={product.image} className="w-full h-60 object-cover" width={240} height={240} alt={product.name} />
                    <h3 className="text-lg font-bold m-1">{product.name}</h3>
                    <p className="text-lg font-bold m-1">{product.price}</p>
                    <button className="text-lg font-bold capitalize px-3 py-2 m-1 bg-primary-orange text-primary-dark border border-primary-light rounded-lg cursor-pointer transition-colors hover:bg-primary-dark hover:text-white">Add to cart</button>                
                </div>
            ))
        }
    </div>
  )
}
