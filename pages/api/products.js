export default function handler(req = {}, res = {}) {
  const { method = '' } = req

  if (method === 'POST') {

    console.info({ req, res });

  }

  // return res.status(200).json('req.method')
}