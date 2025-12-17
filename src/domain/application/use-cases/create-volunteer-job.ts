import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { JobsRepository } from '../repositories/jobs-repository.js'
import {
  CommitmentFrequency,
  Job,
  JobType,
} from '@/domain/enterprise/entities/job.js'
import { Either, right } from '@/core/either.js'
import { CausesRepository } from '../repositories/causes-repository.js'
import { Cause } from '@/domain/enterprise/entities/cause.js'
import { Skill } from '@/domain/enterprise/entities/skill.js'
import { SkillsRepository } from '../repositories/skills-repository.js'

interface CreateVolunteerJobUseCaseRequest {
  ongId: string
  title: string
  description: string
  causeTitles: string[] // ??? receb ids? recebe Causes? causeTitles?
  skillTitles: string[] // ??? idem
  jobType: JobType
  commitmentFrequency: CommitmentFrequency
  startDate?: Date
  endDate?: Date
}

type CreateVolunteerJobUseCaseResponse = Either<
  null,
  {
    job: Job
  }
>

export class CreateVolunteerJobUseCase {
  constructor(
    private jobsRepository: JobsRepository,
    private causesRepository: CausesRepository,
    private skillsRepository: SkillsRepository,
  ) {}

  async execute({
    ongId,
    title,
    description,
    causeTitles,
    skillTitles,
    jobType,
    commitmentFrequency,
    startDate,
    endDate,
  }: CreateVolunteerJobUseCaseRequest): Promise<CreateVolunteerJobUseCaseResponse> {
    const causeIds = await Promise.all(
      causeTitles.map(async (title) => {
        const existingCause = await this.causesRepository.findByTitle(title)

        if (existingCause) {
          return existingCause.id // ??? retornar id
        }

        const newCause = Cause.create({
          title,
        })

        await this.causesRepository.create(newCause)

        return newCause.id // ??? retornar id
      }),
    )

    const skillIds = await Promise.all(
      skillTitles.map(async (title) => {
        const existingSkill = await this.skillsRepository.findByTitle(title)

        if (existingSkill) {
          return existingSkill.id
        }

        const newSkill = Skill.create({
          title,
        })

        await this.skillsRepository.create(newSkill)

        return newSkill.id // ??? retornar id
      }),
    )

    const job = Job.create({
      ongId: new UniqueEntityID(ongId),
      title,
      description,
      causes: causeIds,
      skillsNeeded: skillIds,
      jobType,
      commitmentFrequency,
      startDate: startDate ?? null,
      endDate: endDate ?? null,
    })

    await this.jobsRepository.create(job)

    return right({ job })
  }
}
