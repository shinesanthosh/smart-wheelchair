import axios from "axios"
import useStorage from "../hooks/useStorage"
const { getItem } = useStorage()

const getUser = new Promise((resolve, reject) => {
  const token = getItem("access", "session")
  if (token == undefined) return { type: "error", msg: "token_nil" }
  let result = {}
  var options = {
    method: "GET",
    url: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL + "/userinfo",
    headers: { Authorization: `Bearer ${token}` },
  }

  axios
    .request(options)
    .then((response) => {
      resolve(response.data)
    })
    .catch((e) => {
      result = { type: "error", msg: "ukerr", detof: e }
      reject(result)
    })
})

export default getUser
