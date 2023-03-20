import clientPromise from '../../../lib/mongo'

const handler = async (req, res) => {
  const client = await clientPromise
  const db = client.db('user-data')
  let body
  switch (req.method) {
    case 'POST':
      body = req.body

      if (!body.device) {
        res
          .status(400)
          .send({ title: 'error', type: 'reqna', body: 'No device given' })
        return
      }

      let userData = []
      await db
        .collection('health-log')
        .find({ metadata: { device: body.device } })
        .forEach((doc) => userData.push(doc))
      if (userData.length < 1) {
        res.send({ title: 'error', type: 'userna', body: 'No user found' })
      } else {
        res.json(userData)
      }
      break

    case 'GET':
      res.status(400).send('Invalid request')
  }
}

export default handler
