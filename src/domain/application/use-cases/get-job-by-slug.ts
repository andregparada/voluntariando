import { Either, left, right } from '@/core/either.js'
import type { JobsRepository } from '../repositories/jobs-repository.js'
import { Job } from '@/domain/enterprise/entities/job.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

interface GetJobBySlugUseCaseRequest {
  slug: string
}

type GetJobBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    job: Job
  }
>

export class GetJobBySlugUseCase {
  constructor(private jobsRepository: JobsRepository) {}

  async execute({
    slug,
  }: GetJobBySlugUseCaseRequest): Promise<GetJobBySlugUseCaseResponse> {
    const job = await this.jobsRepository.findBySlug(slug)

    if (!job) {
      return left(new ResourceNotFoundError())
    }

    return right({ job })
  }
}
