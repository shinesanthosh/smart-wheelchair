import { Inter } from "@next/font/google"
import styles from "../styles/Home.module.css"
import { useUser } from "@auth0/nextjs-auth0/client"
import Router from "next/router"
import useStorage from "../hooks/useStorage"

import Login from "../components/login_prompt"
import { useEffect, useState } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const { user, error, isLoading } = useUser()
  const { getItem } = useStorage()

  const [displayState, setDisplayState] = useState(0)

  useEffect(() => {
    // console.log(getItem("access", "session"))
    // console.log("---")
    // console.log(typeof getItem("access", "session"))

    if (getItem("access", "session") == undefined) setDisplayState(1)
    else if (getItem("access", "session").length > 9) setDisplayState(2)
    else setDisplayState(100)
  }, [])

  if (displayState == 0) return <div>Loading...</div>
  else if (displayState == 1) return <Login />
  else if (displayState == 2) Router.push("/dashboard")
  else return <h1>Some error occured ☹️</h1>
}
