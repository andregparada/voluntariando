import { JobsRepository } from '@/domain/application/repositories/jobs-repository'
import { Job } from '@/domain/enterprise/entities/job'

export class InMemoryJobsRepository implements JobsRepository {
  public items: Job[] = []

  async findById(id: string) {
    const job = this.items.find((item) => item.id.toString() === id)

    if (!job) {
      return null
    }

    return job
  }

  async findBySlug(slug: string) {
    const job = this.items.find((item) => item.slug.value === slug)

    if (!job) {
      return null
    }

    return job
  }

  async create(job: Job) {
    this.items.push(job)
  }

  async delete(job: Job) {
    const itemIndex = this.items.findIndex((item) => item.id === job.id)

    this.items.splice(itemIndex, 1)
  }
}
