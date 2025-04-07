import React ,{createContext,useState,useEffect} from "react";

export const UserContext=createContext()
export const UserProvider =({children})=>{
    const [userInfo,setUserInfo] =useState(null)
    useEffect(()=>{
            const fetchUserInfo= async() =>{
                try {
                    const res=await fetch('/api/users/get-info',{method:'GET',credentials:"include"});
                    if(res.ok){
                        const data = await res.json();
                        setUserInfo(data)
                    }
                    else{
                        setUserInfo(null);

                    }
                } catch (error) {
                    console.log(error)
                    setUserInfo(null)
                }
            }
            fetchUserInfo();
    },[])

    return (
        <UserContext.Provider value={userInfo}>
            {children}
        </UserContext.Provider>
    );
}