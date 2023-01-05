import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useUser } from '@auth0/nextjs-auth0/client'

import Login from '../components/login'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  if (!user) return <Login />

  return (
    <>
      <h1>Heyyy</h1>

      {user && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
      <br />
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>
    </>
  )
}

