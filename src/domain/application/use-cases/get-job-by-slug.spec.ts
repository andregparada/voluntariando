import { InMemoryJobsRepository } from 'test/repositories/in-memory-jobs-repository.js'
import { GetJobBySlugUseCase } from './get-job-by-slug.js'
import { makeJob } from 'test/factories/make-job.js'
import { Slug } from '@/domain/enterprise/entities/value-objects/slug.js'

let inMemoryJobsRepository: InMemoryJobsRepository
let sut: GetJobBySlugUseCase

describe('Get job by slug', () => {
  beforeEach(() => {
    inMemoryJobsRepository = new InMemoryJobsRepository()
    sut = new GetJobBySlugUseCase(inMemoryJobsRepository)
  })

  it('should be able to get a volunteer job by slug', async () => {
    const newJob = makeJob({
      slug: Slug.create('example-job'),
    })

    inMemoryJobsRepository.create(newJob)

    const result = await sut.execute({
      slug: 'example-job',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      job: newJob,
    })
  })
})
