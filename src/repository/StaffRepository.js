import Repository from './repository'
const sendEmailInvitation = '/send-email-invitation'

export default {
  sendEmailInvitation (payload) {
    return Repository.post(`${sendEmailInvitation}`, payload)
  }
}
