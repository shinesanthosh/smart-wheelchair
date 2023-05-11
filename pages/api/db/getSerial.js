//
import clientPromise from '../../../lib/mongo'

const handler = async (request, response) => {
  const client = await clientPromise
  const db = client.db('device-details')

  if (request.method == 'POST') {
    const body = request.body

    if (!body.serialNumber || !body.userId || !body.nickname) {
      response
        .status(400)
        .send({ title: 'error', type: 'reqna', body: 'Invalid body' })
      return
    }

    const device = await db
      .collection('wheelchair-details')
      .findOne({ chassis: body.serialNumber })

    if (!device) {
      response
        .status(400)
        .send({ title: 'error', type: 'reqna', body: 'Device not found' })
      return
    } else if (device.registered) {
      response.status(400).send({
        title: 'error',
        type: 'reqna',
        body: 'Device already registered',
      })
      return
    } else {
      await db
        .collection('wheelchair-details')
        .updateOne(
          { chassis: body.serialNumber },
          { $set: { registered: true } }
        )

      const userDb = client.db('user-data').collection('user-details')

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
          if (result.modifiedCount == 0) {
            response
              .status(400)
              .send({ title: 'error', type: 'reqna', body: 'Device not found' })
            return
          }

          response.send({
            title: 'success',
            type: 'reqs',
            body: 'Device registered successfully',
          })
        })

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

    response.send(device)
  }
}

export default handler
