import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { Slug } from './value-objects/slug.js'
import { Entity } from '@/core/entities/entity.js'
import { Optional } from '@/core/types/optional.js'
import dayjs from 'dayjs'

enum JobType {
  FIXED = 'fixed',
  TEMPORARY = 'temporary',
  ONE_TIME = 'one-time',
}

enum CommitmentFrequency {
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
  causes: UniqueEntityID[]
  skillsNeeded: UniqueEntityID[]
  jobType: JobType
  commitmentFrequency: CommitmentFrequency
  startDate?: Date
  endDate?: Date
  createdAt: Date
  updatedAt?: Date
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

  get causes() {
    return this.props.causes
  }

  get skillsNeeded() {
    return this.props.skillsNeeded
  }

  set description(description: string) {
    this.props.description = description

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
