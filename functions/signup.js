import axios from 'axios'

const signup = ({ name, nickname, username, email, password }) => {
  return axios.post(
    process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL + '/dbconnections/signup',
    //   '/api/tserver',
    JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
      email: email,
      password: password,
      connection: process.env.NEXT_PUBLIC_AUTH0_DB_CONNECTION,
      username: username,
      name: name,
      nickname: nickname,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

export default signup
