import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Address } from './value-objects/address'

export enum Availability {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  OCCASIONAL = 'occasional',
  WEEKENDS_ONLY = 'weekends-only',
  EVENINGS = 'evenings',
  FLEXIBLE = 'flexible',
}

interface ApplicantProps {
  name: string
  email: string
  phoneNumber?: string
  address: Address
  bio: string
  skills: UniqueEntityID[] // ??? Id ou Skill?
  availability: Availability
  createdAt: Date
  updatedAt?: Date
}

export class Applicant extends Entity<ApplicantProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get phoneNumber() {
    return this.props.phoneNumber
  }

  get address() {
    return this.props.address
  }

  get bio() {
    return this.props.bio
  }

  get skills() {
    return this.props.skills
  }

  get availability() {
    return this.props.availability
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<ApplicantProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const applicant = new Applicant(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        skills: props.skills ?? [],
      },
      id,
    )

    return applicant
  }
}
