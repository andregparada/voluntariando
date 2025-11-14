import type { JobsRepository } from '../repositories/jobs-repository.js'
import { Job } from '@/domain/enterprise/entities/job.js'

interface FetchRecentJobsUseCaseRequest {
  page: number
}

interface FetchRecentJobsUseCaseResponse {
  jobs: Job[]
}

export class FetchRecentJobsUseCase {
  constructor(private jobsRepository: JobsRepository) {}

  async execute({
    page,
  }: FetchRecentJobsUseCaseRequest): Promise<FetchRecentJobsUseCaseResponse> {
    const jobs = await this.jobsRepository.findManyRecent({ page })

    return { jobs }
  }
}
