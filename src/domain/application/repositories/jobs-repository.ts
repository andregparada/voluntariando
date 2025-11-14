import { Job } from '@/domain/enterprise/entities/job'

export interface JobsRepository {
  create(job: Job): Promise<void>
  findById(id: string): Promise<Job | null>
  findBySlug(slug: string): Promise<Job | null>
  save(job: Job): Promise<void>
  delete(job: Job): Promise<void>
}
