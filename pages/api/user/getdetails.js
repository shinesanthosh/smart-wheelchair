import getUser from '../../../functions/getUser'

const fetchDB = async (email) => {
  let res
  await fetch('/api/db/getdata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: email }),
  })
    .then(async (response) => {
      res = await response.json()
    })
    .catch((e) => {
      res = {
        title: 'error',
        type: 'db_error',
      }
    })
  return res
}

const userDetails = new Promise(async (resolve, reject) => {
  let userData = {}

  await getUser
    .then(async (res) => {
      userData = await fetchDB(res.email)
      if (userData.title == 'error') reject(userData)
      else {
        userData = { ...res, ...userData }
        resolve(userData)
      }
    })
    .catch((e) => reject({ title: 'error', type: 'auth_error' }))
})

export default userDetails
