// import StatsRepository from './StatsRepository'
// import UserRepository from './UserRepository'
import PaymentRepository from './PaymentRepository'
import StaffRepository from './StaffRepository'

const repositories = {
  payment: PaymentRepository,
  staff: StaffRepository
  // user: UserRepository
  // stats: StatsRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
