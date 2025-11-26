import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Job, JobProps } from '@/domain/enterprise/entities/job'

export function makeJob(override: Partial<JobProps> = {}, id?: UniqueEntityID) {
  const job = Job.create(
    {
      ongId: new UniqueEntityID(),
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      ...override,
    },
    id,
  )

  return job
}
