import clientPromise from '../../../lib/mongo'

const handler = async (request, response) => {
  const client = await clientPromise
  const db = client.db('device-details')

  let body
  if (request.method == 'POST') {
    body = request.body
    if (!body.device) {
      response
        .status(400)
        .send({ title: 'error', type: 'reqna', body: 'No device given' })
      return
    }

    let deviceData = await db
      .collection('wheelchair-details')
          .findOne({ chassis: body.device })
      
      
      if (deviceData == null) {
        response.send({ title: 'error', type: 'devicena', body: 'No device found' })
      } else {
          response.json(deviceData)
      }
      
  } else response.status(400).send('Invalid request')
}

export default handler
