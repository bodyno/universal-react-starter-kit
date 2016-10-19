import axios from 'axios'

export default async function (ctx) {
  return new Promise((resolve, reject) => {
    if (ctx.req.url == '/zen') {
      axios.get('https://api.github.com/zen').then(({data}) => {
        resolve({zen: { text: [{text: data}]} })
      })
    } else {
      resolve({})
    }
  })
}
