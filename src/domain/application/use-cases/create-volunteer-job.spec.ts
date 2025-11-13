import { CreateVolunteerJobUseCase } from './create-volunteer-job.js'
import { InMemoryJobsRepository } from 'test/repositories/in-memory-jobs-repository.js'

let inMemoryJobsRepository: InMemoryJobsRepository
let sut: CreateVolunteerJobUseCase

describe('Create job', () => {
  beforeEach(() => {
    inMemoryJobsRepository = new InMemoryJobsRepository()
    sut = new CreateVolunteerJobUseCase(inMemoryJobsRepository)
  })

  it('should be able to create a volunteer job', async () => {
    const { job } = await sut.execute({
      ongId: '1',
      title: 'Título da vaga',
      description: 'Descrição',
    })

    expect(job.id).toBeTruthy()
    expect(inMemoryJobsRepository.items[0].id).toEqual(job.id)
  })
})
