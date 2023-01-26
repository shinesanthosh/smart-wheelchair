import { Inter } from "@next/font/google"
import styles from "../styles/Home.module.css"
import { useUser } from "@auth0/nextjs-auth0/client"
import Router from "next/router"

import Login from "../components/login"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const { user, error, isLoading } = useUser()
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  if (!user) return <Login />

  Router.push('/dashboard')
}
