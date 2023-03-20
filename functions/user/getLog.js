const getLog = async (device) => {
  let ret

  await fetch('/api/db/getlog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ device: device }),
  })
    .then(async (res) => (ret = await res.json()))
    .catch((e) => console.info(e))

  return ret
}

export default getLog
