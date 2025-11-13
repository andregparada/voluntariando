import type { JobsRepository } from '../repositories/jobs-repository.js'
import { Job } from '@/domain/enterprise/entities/job.js'

interface GetJobBySlugUseCaseRequest {
  slug: string
}

interface GetJobBySlugUseCaseResponse {
  job: Job
}

export class GetJobBySlugUseCase {
  constructor(private jobsRepository: JobsRepository) {}

  async execute({
    slug,
  }: GetJobBySlugUseCaseRequest): Promise<GetJobBySlugUseCaseResponse> {
    const job = await this.jobsRepository.findBySlug(slug)

    if (!job) {
      throw new Error('Job not found')
    }

    return { job }
  }
}
