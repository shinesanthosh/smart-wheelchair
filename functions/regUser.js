const regUser = ({ username, name, email }) =>
  new Promise(async (resolve, reject) => {
    let ret

    await fetch('/api/db/regUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, name, email }),
    })
      .then(async (res) => (ret = await res.json()))
      .catch((e) => reject(e))

    resolve(ret)
  })

export default regUser
