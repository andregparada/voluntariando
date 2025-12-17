import { InMemoryJobsRepository } from 'test/repositories/in-memory-jobs-repository.js'
import { makeJob } from 'test/factories/make-job.js'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { EditVolunteerJobUseCase } from './edit-volunteer-job'
import { NotAllowedError } from './errors/not-allowed-error'
import { InMemoryCausesRepository } from 'test/repositories/in-memory-causes-repository'
import { InMemorySkillsRepository } from 'test/repositories/in-memory-skills-repository'

let inMemoryJobsRepository: InMemoryJobsRepository
let inMemoryCausesRepository: InMemoryCausesRepository
let inMemorySkillsRepository: InMemorySkillsRepository
let sut: EditVolunteerJobUseCase

describe('Edit job', () => {
  beforeEach(() => {
    inMemoryJobsRepository = new InMemoryJobsRepository()
    inMemoryCausesRepository = new InMemoryCausesRepository()
    inMemorySkillsRepository = new InMemorySkillsRepository()
    sut = new EditVolunteerJobUseCase(
      inMemoryJobsRepository,
      inMemoryCausesRepository,
      inMemorySkillsRepository,
    )
  })

  it('should be able to edit a volunteer job', async () => {
    const job = makeJob({
      ongId: new UniqueEntityID('ong-1'),
    })

    await inMemoryJobsRepository.create(job)

    const result = await sut.execute({
      jobId: job.id.toValue(),
      ongId: 'ong-1',
      title: 'New title',
      description: 'New description',
      causeTitles: ['New cause'],
      skillTitles: ['New skill'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryJobsRepository.items[0]).toMatchObject({
      title: 'New title',
      description: 'New description',
    })
  })

  it('should be not able to edit a job from another ong', async () => {
    const job = makeJob(
      {
        ongId: new UniqueEntityID('ong-1'),
      },
      new UniqueEntityID('job-1'),
    )

    await inMemoryJobsRepository.create(job)

    const result = await sut.execute({
      ongId: 'ong-2',
      jobId: 'job-1',
      title: 'New title',
      description: 'New description',
      causeTitles: ['New cause'],
      skillTitles: ['New skill'],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
