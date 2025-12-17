import { Either, left, right } from '@/core/either.js'
import type { JobsRepository } from '../repositories/jobs-repository.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import { NotAllowedError } from './errors/not-allowed-error.js'
import {
  CommitmentFrequency,
  Job,
  JobType,
} from '@/domain/enterprise/entities/job.js'
import { CausesRepository } from '../repositories/causes-repository.js'
import { Cause } from '@/domain/enterprise/entities/cause.js'
import { SkillsRepository } from '../repositories/skills-repository.js'
import { Skill } from '@/domain/enterprise/entities/skill.js'

interface EditVolunteerJobUseCaseRequest {
  ongId: string
  jobId: string
  title?: string
  description?: string
  causeTitles: string[]
  skillTitles: string[]
  jobType?: JobType
  commitmentFrequency?: CommitmentFrequency
  startDate?: Date
  endDate?: Date
}

type EditVolunteerJobUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    job: Job
  }
>

export class EditVolunteerJobUseCase {
  constructor(
    private jobsRepository: JobsRepository,
    private causesRepository: CausesRepository,
    private skillsRepository: SkillsRepository,
  ) {}

  async execute({
    ongId,
    jobId,
    title,
    description,
    causeTitles,
    skillTitles,
    jobType,
    commitmentFrequency,
    startDate,
    endDate,
  }: EditVolunteerJobUseCaseRequest): Promise<EditVolunteerJobUseCaseResponse> {
    const job = await this.jobsRepository.findById(jobId)

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

        return newCause.id // ??? retorn
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

    if (!job) {
      return left(new ResourceNotFoundError())
    }

    if (job.ongId.toString() !== ongId) {
      return left(new NotAllowedError())
    }

    if (title !== undefined) {
      job.title = title
    }

    if (description !== undefined) {
      job.description = description
    }

    if (jobType !== undefined) {
      job.jobType = jobType
    }

    if (commitmentFrequency !== undefined) {
      job.commitmentFrequency = commitmentFrequency
    }

    if (startDate !== undefined) {
      job.startDate = startDate
    }

    if (endDate !== undefined) {
      job.endDate = endDate
    }

    job.updateCauses(causeIds)

    job.updateSkills(skillIds)

    await this.jobsRepository.save(job)

    return right({
      job,
    })
  }
}
