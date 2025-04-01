import React from "react";

import { FaBookBookmark } from "react-icons/fa6";
import { RiAiGenerate,RiLoginBoxFill } from "react-icons/ri";
import { TbVocabulary } from "react-icons/tb";
import { TiSpiral } from "react-icons/ti";
const Header=({})=>{
    return(
        <>
        <div className="outside rounded-full h-15 w-full box-sizing flex justify-between content-center place-items-center ">
            <div className="avatar rounded-full bg-orange-400 w-16 h-15 mr-5 my-auto border-box box-sizing">
                <img className="rounded-full p-1 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBgCPQmyPHrOWxnUvbmQIRwOipjW8woZUreA&s" alt="" />
            </div>
             <div className=" bg-[rgba(249,161,98)] rounded-full flex w-full h-13">
                <div className="bg-linear-to-r from-yellow-300 to-orange-300  h-full rounded-full column-3 flex justify-center  px-20 md:px-3 w-full">
                    <a href="/" className=" header-bar-button">
                        <FaBookBookmark className="mr-1 w-4 h-4"/>
                        Evaluate
                    </a>
                    <a className=" header-bar-button " href="topics">
                        <RiAiGenerate className="mr-1 w-5 h-5"/>
                        Topics
                    </a>
                    <a className=" header-bar-button" href="words">
                        <TbVocabulary className="mr-1 w-5 h-5"/>
                        Words
                    </a>
                    <a className=" header-bar-button whitespace-nowrap" href="syno-and-ano">
                        <TiSpiral className="mr-1 h-6 w-6"/>
                        Synonyms and anonyms
                    </a>
                </div>
                <div className="h-full w-20  content-center place-items-center ">
                    <p className="cursor-pointer text-[rgba(26,32,2,1)] font-poppins font-medium rounded-full text-center content-center  border-slate-50 hover:border-2 hover:text-slate-50 p-1">
                        <RiLoginBoxFill className="w-6 h-6"/>
                    </p>
                </div>
                
            </div>
        </div>
        </>
    )
}
export default Header