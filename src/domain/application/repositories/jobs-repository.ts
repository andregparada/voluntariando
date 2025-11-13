import { Job } from '@/domain/enterprise/entities/job'

export interface JobsRepository {
  findById(id: string): Promise<Job | null>
  findBySlug(slug: string): Promise<Job | null>
  create(job: Job): Promise<void>
  delete(job: Job): Promise<void>
}
