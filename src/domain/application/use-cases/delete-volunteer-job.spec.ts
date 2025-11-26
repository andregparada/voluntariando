import { InMemoryJobsRepository } from 'test/repositories/in-memory-jobs-repository.js'
import { makeJob } from 'test/factories/make-job.js'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { DeleteVolunteerJobUseCase } from './delete-volunteer-job.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

let inMemoryJobsRepository: InMemoryJobsRepository
let sut: DeleteVolunteerJobUseCase

describe('Delete job', () => {
  beforeEach(() => {
    inMemoryJobsRepository = new InMemoryJobsRepository()
    sut = new DeleteVolunteerJobUseCase(inMemoryJobsRepository)
  })

  it('should be able to delete a volunteer job', async () => {
    const job = makeJob(
      {
        ongId: new UniqueEntityID('ong-1'),
      },
      new UniqueEntityID('job-1'),
    )

    inMemoryJobsRepository.create(job)

    const result = await sut.execute({ ongId: 'ong-1', jobId: 'job-1' })

    expect(result.isRight()).toBe(true)
    expect(inMemoryJobsRepository.items).toHaveLength(0)
  })

  it('should be not able to delete a job from another ong', async () => {
    const job = makeJob(
      {
        ongId: new UniqueEntityID('ong-1'),
      },
      new UniqueEntityID('job-1'),
    )

    inMemoryJobsRepository.create(job)

    const result = await sut.execute({ ongId: 'ong-2', jobId: 'job-1' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
