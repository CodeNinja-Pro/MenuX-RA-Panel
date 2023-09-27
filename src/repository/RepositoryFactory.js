// import StatsRepository from './StatsRepository'
// import UserRepository from './UserRepository'
import PaymentRepository from './PaymentRepository'

const repositories = {
  payment: PaymentRepository
  // user: UserRepository
  // stats: StatsRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
