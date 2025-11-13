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

    await inMemoryJobsRepository.create(newJob)

    const { job } = await sut.execute({
      slug: 'example-job',
    })

    expect(job.id).toBeTruthy()
    expect(job.title).toEqual(newJob.title)
  })
})
