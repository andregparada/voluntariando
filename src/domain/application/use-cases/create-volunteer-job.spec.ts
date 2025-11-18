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
    const result = await sut.execute({
      ongId: '1',
      title: 'Título da vaga',
      description: 'Descrição',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryJobsRepository.items[0]).toEqual(result.value?.job)
  })
})
