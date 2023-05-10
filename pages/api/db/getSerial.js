// import clientPromise
import clientPromise from '../../../lib/mongo'

// handler for the api
const handler = async (request, response) => {
  // create client promise
  const client = await clientPromise
  const db = client.db('device-details')

  // if method is post get the body
  if (request.method == 'POST') {
    // get body
    const body = request.body

    // if body is not valid send error. Check if it contains the user id, nickname and the serial number
    if (!body.serialNumber || !body.userId || !body.nickname) {
      response
        .status(400)
        .send({ title: 'error', type: 'reqna', body: 'Invalid body' })
      return
    }

    // get the device with the given serial number
    const device = await db
      .collection('wheelchair-details')
      .findOne({ chassis: body.serialNumber })

    // if device is not found send error
    if (!device) {
      response
        .status(400)
        .send({ title: 'error', type: 'reqna', body: 'Device not found' })
      return
    }

    // else if the device is already registered send error
    else if (device.registered) {
      response.status(400).send({
        title: 'error',
        type: 'reqna',
        body: 'Device already registered',
      })
      return
    } else {
      // if device is found, update the document registered field to true
      await db
        .collection('wheelchair-details')
        .updateOne(
          { chassis: body.serialNumber },
          { $set: { registered: true } }
        )

      // get user-details collection from user-data db
      const userDb = client.db('user-data').collection('user-details')

      // update a document in the collection with email field equal userid and add an object with nickname and device_id as serial number to the devices array in the document
      await userDb
        .updateOne(
          { email: body.userId },
          {
            $push: {
              devices: {
                nickname: body.nickname,
                device_id: body.serialNumber,
              },
            },
          }
        )
        .then(result => {
          // if the result is modified count is 0, send error
          if (result.modifiedCount == 0) {
            response
              .status(400)
              .send({ title: 'error', type: 'reqna', body: 'Device not found' })
            return
          }

          // else send success object
          response.send({
            title: 'success',
            type: 'reqs',
            body: 'Device registered successfully',
          })
        })
        // catch error and send internal server error
        .catch(error => {
          console.log(error)
          response.status(500).send({
            title: 'error',
            type: 'isna',
            body: 'Internal server error',
          })
          return
        })
    }

    // send the device
    response.send(device)
  }
}

export default handler
