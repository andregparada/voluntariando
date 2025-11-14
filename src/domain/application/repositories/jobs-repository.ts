import { PaginationParams } from '@/core/repositories/pagination-params'
import { Job } from '@/domain/enterprise/entities/job'

export interface JobsRepository {
  create(job: Job): Promise<void>
  findById(id: string): Promise<Job | null>
  findBySlug(slug: string): Promise<Job | null>
  findManyRecent(params: PaginationParams): Promise<Job[]>
  save(job: Job): Promise<void>
  delete(job: Job): Promise<void>
}
