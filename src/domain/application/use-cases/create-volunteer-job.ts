import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import type { JobsRepository } from '../repositories/jobs-repository.js'
import { Job } from '@/domain/enterprise/entities/job.js'

interface CreateVolunteerJobUseCaseRequest {
  ongId: string
  title: string
  description: string
}

interface CreateVolunteerJobUseCaseResponse {
  job: Job
}

export class CreateVolunteerJobUseCase {
  constructor(private jobsRepository: JobsRepository) {}

  async execute({
    ongId,
    title,
    description,
  }: CreateVolunteerJobUseCaseRequest): Promise<CreateVolunteerJobUseCaseResponse> {
    const job = Job.create({
      ongId: new UniqueEntityId(ongId),
      title,
      description,
    })

    await this.jobsRepository.create(job)

    return { job }
  }
}
