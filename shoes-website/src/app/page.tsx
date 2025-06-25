
export default function Home() {
  return (
    <main className="w-full flex flex-col flex-1">
        <div id="hero" className="w-full flex flex-col-reverse md:flex-row justify-between items-center">
            <div id="main-left" className="w-full md:w-1/2 text-center">
                <h1 className="mt-8 font-firlest text-5xl md:text-7xl font-bold">Footware & <br/> Sneakers</h1>
                <button className="text-xl rounded-lg px-6 py-3 font-bold bg-primary-orange hover:bg-[#1A1A1A] hover:text-white transition-all ease-in-out duration-500">Shop Now</button>
            </div>
            <div id="main-right" className="w-full md:w-[45%]">
                <div id="box" className="w-[40%] mt-[12%] ml-[10%] lg:ml-[20%] rounded-md p-36 bg-primary-orange"></div>
                <div id="box2" className="w-3/4 lg:w-1/2 mt-[-65%] lg:mt-[-35%] ml-[20%] lg:ml-[30%] rounded-md p-0 bg-primary-dark flex justify-center items-center overflow-hidden">
                    <img src="Images/hero.png" className="w-full h-full object-contain" alt="hero" />
                </div>
            </div>
        </div>
        <div id="explore" className="m-[5%]">
            <h2 className="mt-5 font-kugile text-2xl md:text-4xl font-bold text-center">Explore Sneakers & Footware</h2>
            <p id="tag" className="text-center mt-2 text-xl mb-[5%]">Designed for Movement. Made for You.</p>
            <div id="products" className="flex justify-center items-center flex-wrap gap-2.5 p-2.5 bg-primary-light">
                <div className="card w-64 bg-transparent border-2 border-primary-dark rounded-xl shadow-xl/20 shadow-black transition-shadow overflow-hidden text-start ">
                    <img id="sneaker" src="Images/hero.png" className="w-full h-60 object-cover" alt="sneaker" />
                    <h3 className="text-lg font-bold m-1">Nike Sneakers</h3>
                    <p className="text-lg font-bold m-1">$120</p>
                    <button className="text-lg font-bold capitalize px-3 py-2 m-1 bg-primary-orange text-primary-dark border border-primary-light rounded-lg cursor-pointer transition-colors hover:bg-priamry-dark hover:text-white">Add to cart</button>                
               </div>
            </div>
        </div>
      </main>    
  );
}
