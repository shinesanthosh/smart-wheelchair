import clientPromise from '../../../lib/mongo'

const handler = async (req, res) => {
  const client = await clientPromise
  const db = client.db('user-data')
  let body
  switch (req.method) {
    case 'POST':
      body = req.body

      if (!body.user) {
        res.status(400).send('User not defined')
        return
      }

      let userData = await db
        .collection('user-details')
        .findOne({ email: body.user })
      if (userData == null) {
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
