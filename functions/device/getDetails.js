const getDevice = async (device) =>
  new Promise((resolve, reject) => {
    fetch('/api/db/getdevice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        device,
      }),
    })
      .then(async (res) => {
        let data = await res.json()
        if (data.last_update) {
          const diff = Math.floor(
            (new Date() - new Date(data.last_update)) / 1000
          )

          let difftr = ''
          if (diff < 60) difftr = diff + ' seconds '
          else if (diff < 3600)
            difftr =
              Math.floor(diff / 60) == 1
                ? Math.floor(diff / 60) + ' minute '
                : Math.floor(diff / 60) + ' minutes '
          else if (diff < 86400)
            difftr =
              Math.floor(diff / 3600) == 1
                ? Math.floor(diff / 3600) + ' hour '
                : Math.floor(diff / 3600) + ' hours '
          else difftr = 'more than 24 hours'
          // console.log(difftr)
          data.last_update = difftr
        }

        resolve(data)
      })
      .catch((e) => reject(e))
  })

export default getDevice
