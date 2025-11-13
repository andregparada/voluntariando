import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Job, JobProps } from '@/domain/enterprise/entities/job'

export function makeJob(override: Partial<JobProps> = {}, id?: UniqueEntityId) {
  const job = Job.create(
    {
      ongId: new UniqueEntityId(),
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      ...override,
    },
    id,
  )

  return job
}
