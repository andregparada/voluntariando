import { InMemoryJobsRepository } from 'test/repositories/in-memory-jobs-repository.js'
import { makeJob } from 'test/factories/make-job.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { EditVolunteerJobUseCase } from './edit-volunteer-job'

let inMemoryJobsRepository: InMemoryJobsRepository
let sut: EditVolunteerJobUseCase

describe('Edit job', () => {
  beforeEach(() => {
    inMemoryJobsRepository = new InMemoryJobsRepository()
    sut = new EditVolunteerJobUseCase(inMemoryJobsRepository)
  })

  it('should be able to edit a volunteer job', async () => {
    const job = makeJob({
      ongId: new UniqueEntityId('ong-1'),
    })

    await inMemoryJobsRepository.create(job)

    await sut.execute({
      jobId: job.id.toValue(),
      ongId: 'ong-1',
      title: 'New title',
      description: 'New description',
    })

    expect(inMemoryJobsRepository.items[0]).toMatchObject({
      title: 'New title',
      description: 'New description',
    })
  })

  it('should be not able to edit a job from another ong', async () => {
    const job = makeJob(
      {
        ongId: new UniqueEntityId('ong-1'),
      },
      new UniqueEntityId('job-1'),
    )

    await inMemoryJobsRepository.create(job)

    expect(() => {
      return sut.execute({
        ongId: 'ong-2',
        jobId: 'job-1',
        title: 'New title',
        description: 'New description',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
