import { useEffect } from "react";
import Cookies from "js-cookie";

export default function ProfilePage(){
    useEffect(()=>{
        async function authenticateUser(){
            const accessToken=Cookies.get('accessToken');
            console.log(accessToken);
        }

        authenticateUser();
    },[]);
    
    return(
        <>
            Your Profile Page
        </>
    )
}