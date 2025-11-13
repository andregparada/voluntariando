import type { JobsRepository } from '../repositories/jobs-repository.js'

interface DeleteVolunteerJobUseCaseRequest {
  ongId: string
  jobId: string
}

interface DeleteVolunteerJobUseCaseResponse {}

export class DeleteVolunteerJobUseCase {
  constructor(private jobsRepository: JobsRepository) {}

  async execute({
    ongId,
    jobId,
  }: DeleteVolunteerJobUseCaseRequest): Promise<DeleteVolunteerJobUseCaseResponse> {
    const job = await this.jobsRepository.findById(jobId)

    if (!job) {
      throw new Error('Job not found.')
    }

    if (job.ongId.toString() !== ongId) {
      throw new Error('You are not allowed to delete this job.')
    }

    await this.jobsRepository.delete(job)

    return {}
  }
}
