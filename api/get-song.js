/*
  Hay que aprovechar que el sitio está hosteado en vercel y usar serverless
  https://vercel.com/docs/v2/serverless-functions/introduction
  para traer la data de manera asincronica en el mismo deploy
*/

const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "5nffa2mu",
  dataset: "production",
  token: "", // or leave blank to be anonymous user
  useCdn: true, // `false` if you want to ensure fresh data
})

module.exports = (req, res) => {
  const { order } = req.query
  const query = `*[_type == "tema" && orden == $orden][0] { titulo, archivo { asset-> { url, originalFilename } } }`
  const params = { orden: Number(order) }
  client
    .fetch(query, params)
    .then(body =>
      res.json({
        body,
        query: req.query,
      })
    )
    .catch(error => res.json({ body: { error } }))
}
