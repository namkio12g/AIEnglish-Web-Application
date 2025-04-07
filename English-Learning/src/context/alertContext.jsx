import React ,{createContext,useState,useEffect} from "react";
import './alert.scss'

import { MdSmsFailed, MdLibraryAddCheck, MdPunchClock } from 'react-icons/md';
export const AlertContext=createContext()
export const AlertProvider =({children})=>{
    const [alertData, setAlertData] = useState({active:false,status:'failed',message:""});
    const getStatus=(status)=>{
      switch(status){
        case 'success':
          return 'bg-green-500'
        case 'failed':
          return 'bg-red-500'
        case 'waiting':
          return 'bg-yellow-500'
        default:
          return 'bg-gray-500'
      }
    }
     const getIcon = (status) => {
       switch (status) {
         case 'success':
           return <MdLibraryAddCheck className='w-7 h-7' />;
         case 'failed':
           return <MdSmsFailed className="w-7 h-7"/>
         case 'waiting':
           return <MdPunchClock className='w-7 h-7' />;
         default:
           return <MdPunchClock className='w-7 h-7' />;
       }
     };
     const getHover= (status) => {
       switch (status) {
         case 'success':
           return 'bg-green-400';
         case 'failed':
           return 'bg-red-400';
         case 'waiting':
           return 'bg-yellow-400';
         default:
           return 'bg-gray-400';
       }
     };

       useEffect(() => {
          if(alertData.active){
            const timer = setTimeout(() => {
              setAlertData((prevData)=>({
                ...prevData,active:false
              }));
            }, 3000);

            return () => clearTimeout(timer);
            }
       }, [alertData.active]);

    return (
      <AlertContext.Provider value={setAlertData}>
        <>
          <div className={`alert-box fixed w-70  h-30 ${getStatus(alertData.status)} z-5 rounded-lg p-2  text-slate-50 text-lg ${alertData.active?"active":""} hover:${getHover(alertData.status)} cursor-pointer`} onClick={()=>setAlertData({...alertData,active:false})}>
            <div className={`relative flex flex-row place-items-center w-full h-full   px-4`} >
              <div className={`w-10 h-10 p-3 flex justify-center place-items-center rounded-full ${getHover(alertData.status)}`}>
                {getIcon(alertData.status)}
              </div>
              <div className="ml-5">
                <p className="title text-lg font-ubuntu font-bold">{alertData.status}</p>
                <p className="text-xs font-roboto">{alertData.message}</p>
              </div>
            </div>
          </div>
        </>

        {children}
      </AlertContext.Provider>
    );
}