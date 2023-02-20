import React,{useEffect} from "react"
import useStorage from "../hooks/useStorage"
import Router from "next/router"

const Logout = () => {

  const { setItem } = useStorage()

    useEffect(()=>{clearData()},[])
    
    const clearData = async () => {
        await setItem("access", undefined, "session")
        await setItem("id_token", undefined, "session")
        await setItem("refresh", undefined, "local")

          Router.push(
            process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL +
              `/v2/logout?client_id=${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}`
          )
    }

  return <div>Please Wait...</div>
}

export default Logout
