import { useState } from "react";

import Games from "../assets/icons/games.png"
import Loupe from "../assets/icons/Loupe.png"
const SyAndAnoPage =({})=>{
    return(
        <>
               <div className="content">
                
                <div className=" w-full py-10 inline-flex justify-center">
                        <img src={Games} alt="book-stack" className="size-19 mr-5" />
                        <div>
                            <p className="text-3xl font-ubuntu font-semibold">Synonym and anonym</p>
                            <p className="text-stone-600">Get the similar and opposited words</p>

                        </div>
                </div>
                <div className="flex flex-col place-items-center">
                    <div className="w-1/2">

                        <div className="relative h-65 w-full mb-10 bg-[rgb(164,223,221)] rounded-2xl inline-flex justify-center place-items-center">
                            <img src={Loupe} alt="" className="absolute top-1/4 left-3 h-1/3" />
                            <div className="w-1/2">
                                <h2 className="mb-2 ml-2 font-poppins text-slate-50 font-semibold text-lg">Enter your words</h2>
                                <div className="inline-flex w-full">

                                    <input type="text" className="w-3/5 mr-4 py-2 px-3 border-2 border-slate-50 rounded-full text-slate-50 outline-none focus:border-green-700" maxLength={20} placeholder="Enter here"/>
                                    <button className="w-2/5 bg-teal-800 px-3 py-2 text-slate-200 rounded-full cursor-pointer hover:bg-teal-600">
                                        Look Up
                                    </button>
                                </div>
                            </div>
                        </div> 
                        <div className="flex flex-row gap-10">

                            <div className="synonyms-sections h-100 w-1/2 bg-slate-50 border-1 border-stone-200 rounded-md shadow-2xl py-6 px-9">
                                <h1 className="tittle text-3xl text-center text-teal-800 mb-3 font-dancing font-bold">Synonyms</h1>
                                <div className="text-teal-800 h-4/5 overflow-y-scroll">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In soluta voluptatem numquam saepe officia atque magni dolore voluptatum, iste recusandae repellat sequi nobis doloribus, voluptas repellendus aperiam non corporis. Quod. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem nihil odio qui reprehenderit magnam debitis placeat delectus aliquam temporibus porro error aspernatur magni minima, dignissimos dolores omnis ipsa quo nulla?</p>

                                </div>

                            </div>
                            <div className="anonyms-sections h-100 w-1/2 bg-slate-50 border-1 border-stone-200 rounded-md shadow-2xl py-6 px-9">
                                <h1 className="tittle text-3xl text-center text-teal-800 mb-3 font-dancing font-bold">Anonyms</h1>
                                <div className="text-teal-800 h-4/5 overflow-y-scroll ">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In soluta voluptatem numquam saepe officia atque magni dolore voluptatum, iste recusandae repellat sequi nobis doloribus, voluptas repellendus aperiam non corporis. Quod.</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SyAndAnoPage