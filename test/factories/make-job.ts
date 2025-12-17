import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  CommitmentFrequency,
  Job,
  JobProps,
  JobType,
} from '@/domain/enterprise/entities/job'

export function makeJob(override: Partial<JobProps> = {}, id?: UniqueEntityID) {
  const job = Job.create(
    {
      ongId: new UniqueEntityID(),
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      causes: override.causes ?? [],
      skillsNeeded: override.skillsNeeded ?? [],
      jobType: JobType.FIXED,
      commitmentFrequency: CommitmentFrequency.DAILY,
      startDate: override.startDate ?? null,
      endDate: override.endDate ?? null,
      ...override,
    },
    id,
  )

  return job
}
