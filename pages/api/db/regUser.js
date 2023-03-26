import clientPromise from '../../../lib/mongo'

const handler = async (request, response) => {
  const client = await clientPromise
    const db = client.db('user-data')
    // console.log("Receiving requests")

  let body
    if (request.method == 'POST') {
    //   console.log("Post request")
        body = request.body
        
        // console.log("Body: ", body)
    if (!body.username || !body.name || !body.email) {
      response
        .status(400)
        .send({ title: 'error', type: 'reqna', body: 'Invalid body' })
      return
    }

    let ob = {
      _id: body.username,
      name: body.name,
      email: body.email,
      devices: [],
    }
    // console.log(JSON.stringify(ob))

    await db
      .collection('user-details')
      .insertOne(ob)
      .then((res) => {
        // console.warn('YOu got it: ', res)
        response.send(res)
      })
      .catch((er) => {
        // console.error('But whyyyy??:: ', e)
        response.status(500).send('Internal server error')
      })
  } else response.status(400).send('Invalid request')
}

export default handler
