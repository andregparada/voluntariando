import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { Slug } from './value-objects/slug.js'
import { Entity } from '@/core/entities/entity.js'
import { Optional } from '@/core/types/optional.js'
import dayjs from 'dayjs'

export enum JobType {
  FIXED = 'fixed',
  TEMPORARY = 'temporary',
  ONE_TIME = 'one-time',
}

export enum CommitmentFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  OCCASIONALLY = 'occasionally',
  FLEXIBLE = 'flexible',
}

export interface JobProps {
  ongId: UniqueEntityID
  title: string
  slug: Slug
  description: string
  causes: UniqueEntityID[] /// ??? ids ou causes? devo chamar de causeIds?
  skillsNeeded: UniqueEntityID[]
  jobType: JobType
  commitmentFrequency: CommitmentFrequency
  startDate: Date | null
  endDate: Date | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Job extends Entity<JobProps> {
  get ongId() {
    return this.props.ongId
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)

    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description

    this.touch()
  }

  get jobType() {
    return this.props.jobType
  }

  set jobType(jobType: JobType) {
    this.props.jobType = jobType

    this.touch()
  }

  get commitmentFrequency() {
    return this.props.commitmentFrequency
  }

  set commitmentFrequency(commitmentFrequency: CommitmentFrequency) {
    this.props.commitmentFrequency = commitmentFrequency

    this.touch()
  }

  get startDate() {
    return this.props.startDate
  }

  set startDate(startDate: Date | null) {
    this.props.startDate = startDate

    this.touch()
  }

  get endDate() {
    return this.props.endDate
  }

  set endDate(endDate: Date | null) {
    this.props.endDate = endDate

    this.touch()
  }

  get causes() {
    return this.props.causes
  }

  updateCauses(causeIds: UniqueEntityID[]) {
    this.props.causes = causeIds
    this.touch()
  }

  get skillsNeeded() {
    return this.props.skillsNeeded
  }

  updateSkills(skillIds: UniqueEntityID[]) {
    this.props.skillsNeeded = skillIds
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get excerpt() {
    if (this.description.length <= 120) return this.description
    return this.description.substring(0, 120).trimEnd() + '...'
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<JobProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID,
  ) {
    const job = new Job(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        causes: props.causes ?? [],
        skillsNeeded: props.skillsNeeded ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return job
  }
}
