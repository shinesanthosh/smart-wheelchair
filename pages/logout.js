import React, { useEffect } from "react"
import useStorage from "../hooks/useStorage"
import Router from "next/router"

const Logout = () => {
  const { setItem, removeItem } = useStorage()

  useEffect(() => {
    clearData()
  }, [])

  const clearData = async () => {
    await removeItem("access", "session")
    await removeItem("id_token", "session")
    await removeItem("refresh", "local")

    Router.push(
      process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL +
        `/v2/logout?client_id=${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}`
    )
  }

  return <div>Please Wait...</div>
}

export default Logout
