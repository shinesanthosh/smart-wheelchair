import axios from "axios"

const signin = async (username, password) => {
  var axios = require("axios").default
  let result = {}
  var options = {
    method: "POST",
    url: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL + "/oauth/token",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      grant_type: "password",
      username: username,
      password: password,
      audience: process.env.NEXT_PUBLIC_AUTHO_AUDIENCE,
      scope:
        "openid read:current_user update:current_user_metadata delete:current_user_metadata create:current_user_metadata create:current_user_device_credentials delete:current_user_device_credentials update:current_user_identities",
      client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
    }),
  }

  await axios
    .request(options)
    .then(function (response) {
      console.log("Auth response")
      console.log(response.data)
      result = { type: "Succ", token: response.data }
    })
    .catch(function (error) {
      console.error("Auth Error")
      console.error(error)
      if (error.response.data.error == "invalid_grant") {
        result = { type: "Err", msg: "Invalid email or Password" }
      }
    })

  return result
}

export default signin
