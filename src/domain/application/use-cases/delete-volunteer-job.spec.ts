import { InMemoryJobsRepository } from 'test/repositories/in-memory-jobs-repository.js'
import { makeJob } from 'test/factories/make-job.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { DeleteVolunteerJobUseCase } from './delete-volunteer-job.js'

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
        ongId: new UniqueEntityId('ong-1'),
      },
      new UniqueEntityId('job-1'),
    )

    await inMemoryJobsRepository.create(job)

    await sut.execute({ ongId: 'ong-1', jobId: 'job-1' })

    expect(inMemoryJobsRepository.items).toHaveLength(0)
  })

  it('should be not able to delete a job from another ong', async () => {
    const job = makeJob(
      {
        ongId: new UniqueEntityId('ong-1'),
      },
      new UniqueEntityId('job-1'),
    )

    await inMemoryJobsRepository.create(job)

    expect(() => {
      return sut.execute({ ongId: 'ong-2', jobId: 'job-1' })
    }).rejects.toBeInstanceOf(Error)
  })
})
