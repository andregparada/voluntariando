import { CreateVolunteerJobUseCase } from './create-volunteer-job.js'
import { InMemoryJobsRepository } from 'test/repositories/in-memory-jobs-repository.js'
import {
  CommitmentFrequency,
  JobType,
} from '@/domain/enterprise/entities/job.js'
import { InMemoryCausesRepository } from 'test/repositories/in-memory-causes-repository.js'
import { InMemorySkillsRepository } from 'test/repositories/in-memory-skills-repository.js'

let inMemoryJobsRepository: InMemoryJobsRepository
let inMemoryCausesRepository: InMemoryCausesRepository
let inMemorySkillsRepository: InMemorySkillsRepository
let sut: CreateVolunteerJobUseCase

describe('Create volunteer job', () => {
  beforeEach(() => {
    inMemoryJobsRepository = new InMemoryJobsRepository()
    inMemoryCausesRepository = new InMemoryCausesRepository()
    inMemorySkillsRepository = new InMemorySkillsRepository()
    sut = new CreateVolunteerJobUseCase(
      inMemoryJobsRepository,
      inMemoryCausesRepository,
      inMemorySkillsRepository,
    )
  })

  it('should be able to create a volunteer job', async () => {
    const result = await sut.execute({
      ongId: '1',
      title: 'Ong title',
      description: 'Some description',
      causeTitles: [],
      skillTitles: [],
      jobType: JobType.FIXED,
      commitmentFrequency: CommitmentFrequency.WEEKLY,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryJobsRepository.items[0]).toEqual(result.value?.job)
  })
})
