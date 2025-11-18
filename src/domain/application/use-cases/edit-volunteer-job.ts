import { Either, left, right } from '@/core/either.js'
import type { JobsRepository } from '../repositories/jobs-repository.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import { NotAllowedError } from './errors/not-allowed-error.js'
import { Job } from '@/domain/enterprise/entities/job.js'

interface EditVolunteerJobUseCaseRequest {
  ongId: string
  jobId: string
  title: string
  description: string
}

type EditVolunteerJobUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    job: Job
  }
>

export class EditVolunteerJobUseCase {
  constructor(private jobsRepository: JobsRepository) {}

  async execute({
    ongId,
    jobId,
    title,
    description,
  }: EditVolunteerJobUseCaseRequest): Promise<EditVolunteerJobUseCaseResponse> {
    const job = await this.jobsRepository.findById(jobId)

    if (!job) {
      return left(new ResourceNotFoundError())
    }

    if (job.ongId.toString() !== ongId) {
      return left(new NotAllowedError())
    }

    job.title = title
    job.description = description

    await this.jobsRepository.save(job)

    return right({
      job,
    })
  }
}
