import { useState } from "react";

import MagicWand from "../assets/icons/magic-wand.png"
import BulbPen from "../assets/icons/bulb-pen.png"
import BulbLightning from "../assets/icons/bulb-lightning.png"

const TopicsPage =({})=>{
     return(
        <>
            <div className="content">
                
                <div className=" w-full py-10 inline-flex justify-center">
                        <img src={MagicWand} alt="book-stack" className="size-15 mr-5" />
                        <div>
                            <p className="text-3xl font-ubuntu font-semibold">Topics Generating Tool</p>
                             <p className="text-stone-600">Creates new awesome topics</p>
                        </div>
                </div>
               
                <div className="flex flex-col w-full place-items-center my-10">
                    <div className=" lg:w-4/6 md:w-4/5 sm:w-full h-3/5 ">
                        <div className="border-dashed border-2 w-full h-30 ">
                            <textarea name="" id="" className="w-full h-full px-5 py-2 placeholder:text-center placeholder:text-xl  resize-none outline-none" placeholder="Enter your topics here"></textarea>

                        </div>
                        <div className="flex flex-row">
                            <div className="TopicSections relative w-3/6 h-140 bg-red-300 mt-20 mr-5  rounded-2xl shadow-xl pt-20 pb-5 ">
                                <img src={BulbPen} alt="bulb-pencil" className="absolute -top-15 left-4/12 w-4/12"/>
                                <div className="flex flex-col h-full justify-between px-10 ">
                                    <div className="place-items-center">
                                        <p className="font-poppins text-xl font-semibold">Topics</p>
                                        <div className="font-roboto text-slate-600 mt-4 text-center">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos eligendi quidem, amet facilis maiores voluptatem adipisci pariatur necessitatibus nemo ducimus a, sequi ad neque quod itaque corrupti saepe nam eaque.
                                        </div>

                                    </div>
                                    <button className="bg-sky-600 py-4 border-1 border-sky-700 rounded-lg text-slate-50 font-ubuntu text-lg shadow-md cursor-pointer hover:bg-sky-800  ">
                                            Genertate a topic
                                    </button>
                                </div>
                                
                            </div>
                            <div className="BrainStormSections relative w-3/6 h-140 bg-emerald-300 mt-20 ml-5 rounded-2xl shadow-xl pt-20 pb-5">
                                <img src={BulbLightning} alt="bulb-lightning" className="absolute -top-15 left-4/12 w-4/12 "/>
                                <div className="flex flex-col h-full justify-between px-10">
                                    <div className="place-items-center">
                                        <p className="font-poppins text-xl font-semibold mb-2">BrainStorm Ideas</p>
                                       
                                        <div className="h-85 font-roboto text-slate-600  rounded-l-xl border-2 border-green-600 overflow-y-scroll px-2 py-2">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos eligendi quidem, amet facilis maiores voluptatem adipisci pariatur necessitatibus nemo ducimus a, sequi ad neque quod itaque corrupti saepe nam eaque.
                                        </div>

                                    </div>
                                    <button className="bg-red-400 py-4 border-1 border-red-500 rounded-lg text-slate-50 font-ubuntu text-lg shadow-md cursor-pointer hover:bg-red-600  ">
                                            Brainstorm
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default TopicsPage