import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { Slug } from './value-objects/slug.js'
import { Enitity } from '@/core/entities/entity.js'
import { Optional } from '@/core/types/optional.js'
import dayjs from 'dayjs'

export interface JobProps {
  ongId: UniqueEntityId
  title: string
  slug: Slug
  description: string
  createdAt: Date
  updatedAt?: Date
}

export class Job extends Enitity<JobProps> {
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
    return this.description.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<JobProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const job = new Job(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id,
    )

    return job
  }
}
