import React from 'react'
import Product from '../components/Product'

export default function page() {
  return (
    <div id="explore" className="m-[5%]">
        <h2 className="mt-5 font-kugile text-2xl md:text-4xl font-bold text-center">Explore Women Sneakers & Footware</h2>
        <p id="tag" className="text-center mt-2 text-xl mb-[5%]">Designed for Movement | Made for You.</p>
        <Product />
    </div>
  )
}
