import Repository from './repository'
const sendEmailInvitation = '/email/send-email'

export default {
  sendEmailInvitation (payload) {
    return Repository.post(`${sendEmailInvitation}`, payload)
  }
}
