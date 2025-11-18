import { InMemoryJobsRepository } from 'test/repositories/in-memory-jobs-repository.js'
import { makeJob } from 'test/factories/make-job.js'
import { FetchRecentJobsUseCase } from './fetch-recent-jobs'

let inMemoryJobsRepository: InMemoryJobsRepository
let sut: FetchRecentJobsUseCase

describe('Fetch recent jobs', () => {
  beforeEach(() => {
    inMemoryJobsRepository = new InMemoryJobsRepository()
    sut = new FetchRecentJobsUseCase(inMemoryJobsRepository)
  })

  it('should be able to fetch recent jobs', async () => {
    await inMemoryJobsRepository.create(
      makeJob({ createdAt: new Date(2022, 0, 20) }),
    )
    await inMemoryJobsRepository.create(
      makeJob({ createdAt: new Date(2022, 0, 18) }),
    )
    await inMemoryJobsRepository.create(
      makeJob({ createdAt: new Date(2022, 0, 23) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.jobs).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('should be able to fetch paginated recent jobs', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryJobsRepository.create(makeJob())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.jobs).toHaveLength(2)
  })
})
