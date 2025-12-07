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
import { Slug } from '@/domain/enterprise/entities/value-objects/slug.js'
import { SkillsRepository } from '../repositories/skills-repository.js'

interface CreateVolunteerJobUseCaseRequest {
  ongId: string
  title: string
  description: string
  causeTitles: string[] // ??? receb ids? recebe Causes? causeTitles?
  skillTitles: string[] // ??? idem
  jobtype: JobType
  commitmentFrequenct: CommitmentFrequency
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
    jobtype,
    commitmentFrequenct,
    startDate,
    endDate,
  }: CreateVolunteerJobUseCaseRequest): Promise<CreateVolunteerJobUseCaseResponse> {
    const causeIds = await Promise.all(
      causeTitles.map(async (title) => {
        const slug = Slug.createFromText(title).value

        const existingCause = await this.causesRepository.findBySlug(slug)

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
        const slug = Slug.createFromText(title).value

        const existingSkill = await this.skillsRepository.findBySlug(slug)

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
      jobType: jobtype,
      commitmentFrequency: commitmentFrequenct,
      startDate,
      endDate,
    })

    await this.jobsRepository.create(job)

    return right({ job })
  }
}
