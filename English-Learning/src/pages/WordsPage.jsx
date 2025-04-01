import { useState } from "react";

import MemoLoss from "../assets/icons/memory-loss.png"
import { CgSearch } from "react-icons/cg";
const WordsPage =({})=>{

    const [word,setWord]=useState();
    const lookUpBtnEvent= ()=>{
        try {
          const response = axios.post('http://localhost:3000/essay/evaluate', {
            hello: 'word',
          });
          console.log(response);
        } catch {
          console.log('error');
        }
    }


    return(
        <>
                <div className="content">
                
                    <div className=" w-full py-10 inline-flex justify-center">
                            <img src={MemoLoss} alt="book-stack" className="size-17 mr-5" />
                            <div>
                                <p className="text-3xl font-ubuntu font-semibold">Word Searching</p>
                                <p className="text-stone-600">Create your words list</p>

                            </div>
                        
                    </div>
                    <div className="w-full flex justify-center    place-items-center">
                            <div className="relative p-3 lg:w-4/7 sm:w-9/10 xs:w-full lg:h-100 sm:h-90 mt-5 bg-slate-50 rounded-4xl shadow-xl  ring-1 ring-blue-100 flex justify-center place-items-center ">
                                <div className="absolute -top-9 left-0 h-14 w-25 bg-sky-600 rounded-lg -z-1 text-center text-slate-50 pt-2">
                                    Look up
                                </div>
                                <div className="absolute -top-9 left-30 h-14 w-25 bg-sky-300  rounded-lg -z-1 text-center text-sky-700 pt-2">
                                    words list
                                </div>
                                <div className=" w-9/10 h-9/10 flex flex-col justify-between">
                                    <div className="flex flex-row h-2/13  ">
                                        <input type="text" className="w-8/10 h-full  rounded-lg px-3 font-roboto border-2    border-stone-200 "/>
                                        <button className="w-2/10 ml-5 bg-cyan-500 rounded-md shadow-lg text-slate-50 cursor-pointer hover:bg-cyan-700 ">
                                            Look up
                                        </button>
                                    </div>
                                    <div className="h-8/13 w-full border-1 border-slate-200 rounded-xl pt-2 px-5 shadow-lg ">
                                        <div className="flex flex-row place-items-start  border-b-1 border-stone-400 pb-3">
                                            <h1 className="text-3xl text-slate-600 font-Ubuntu font-semibold mr-15">Word ssss</h1>
                                            <div className=" pt-2">
                                                <p className="text-sm font-semibold text-[rgb(65,77,113,0.8)]">(sadfasdfasdfas)</p>
                                                <p className="font-bold text-blue-950">Play audio</p>
                                            </div>
                                        </div>
                                        <div className=" font-semibold text-blue-950 py-4">
                                            <p className=" mb-4">Definition : Lorem ipsum dolor sit amet, consectetur adi</p>
                                            <div className="bg-amber-400 px-5 py-3 rounded-md text-slate-50">
                                                Example do you need me as a person
                                            </div>
                                        </div>


                                    </div>
                                    <div className="h-1/10 flex flex-row">
                                        <select name="" id="" className="w-2/7  mr-10 outline-none border-1 rounded-lg border-orange-300 px-2 text-orange-800">
                                            <option value="">11111</option>
                                            <option value="">1dadasda11</option>

                                            <option value="">122222</option>

                                        </select>
                                        <button className="bg-linear-to-r from-yellow-400 to-orange-500 px-15 h-full rounded-full text-slate-50">Save</button>
                                    </div>
                                </div>

                            </div>
                    </div>
            </div>
        </>
    )
}
export default WordsPage