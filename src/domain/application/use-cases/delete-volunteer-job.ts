import { Either, left, right } from '@/core/either.js'
import type { JobsRepository } from '../repositories/jobs-repository.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

interface DeleteVolunteerJobUseCaseRequest {
  ongId: string
  jobId: string
}

type DeleteVolunteerJobUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteVolunteerJobUseCase {
  constructor(private jobsRepository: JobsRepository) {}

  async execute({
    ongId,
    jobId,
  }: DeleteVolunteerJobUseCaseRequest): Promise<DeleteVolunteerJobUseCaseResponse> {
    const job = await this.jobsRepository.findById(jobId)

    if (!job) {
      return left(new ResourceNotFoundError())
    }

    if (job.ongId.toString() !== ongId) {
      return left(new NotAllowedError())
    }

    await this.jobsRepository.delete(job)

    return right(null)
  }
}
