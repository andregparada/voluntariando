import type { JobsRepository } from '../repositories/jobs-repository.js'

interface EditVolunteerJobUseCaseRequest {
  ongId: string
  jobId: string
  title: string
  description: string
}

interface EditVolunteerJobUseCaseResponse {}

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
      throw new Error('Job not found.')
    }

    if (job.ongId.toString() !== ongId) {
      throw new Error('You are not allowed to edit this job.')
    }

    job.title = title
    job.description = description

    await this.jobsRepository.save(job)

    return {}
  }
}
