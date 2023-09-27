import axios from 'axios'
const baseDomain = 'https://us-central1-menu-x-353fd.cloudfunctions.net/app'

const baseURL = `${baseDomain}`

export default axios.create({
  baseURL,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json'
  }
})
