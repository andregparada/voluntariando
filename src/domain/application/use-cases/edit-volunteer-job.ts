import { Either, left, right } from '@/core/either.js'
import type { JobsRepository } from '../repositories/jobs-repository.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import { NotAllowedError } from './errors/not-allowed-error.js'
import {
  CommitmentFrequency,
  Job,
  JobType,
} from '@/domain/enterprise/entities/job.js'

interface EditVolunteerJobUseCaseRequest {
  ongId: string
  jobId: string
  title?: string
  description?: string
  causeTitles: string[]
  skillTitles: string[]
  jobType?: JobType
  commitmentFrequency?: CommitmentFrequency
  startDate?: Date
  endDate?: Date
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
    causeTitles,
    skillTitles,
    jobType,
    commitmentFrequency,
    startDate,
    endDate,
  }: EditVolunteerJobUseCaseRequest): Promise<EditVolunteerJobUseCaseResponse> {
    const job = await this.jobsRepository.findById(jobId)

    if (!job) {
      return left(new ResourceNotFoundError())
    }

    if (job.ongId.toString() !== ongId) {
      return left(new NotAllowedError())
    }

    if (title !== undefined) {
      job.title = title
    }

    if (description !== undefined) {
      job.description = description
    }

    if (jobType !== undefined) {
      job.jobType = jobType
    }

    if (commitmentFrequency !== undefined) {
      job.commitmentFrequency = commitmentFrequency
    }

    if (startDate !== undefined) {
      job.startDate = startDate
    }

    if (endDate !== undefined) {
      job.endDate = endDate
    }
    await this.jobsRepository.save(job)

    return right({
      job,
    })
  }
}
