import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'
import { Address } from './value-objects/address'

interface OngProps {
  name: string
  email: string
  phoneNumber: string
  address: Address
  pitch: string
  description: string
  createdAt: Date
  updatedAt?: Date
}

export class Ong extends Entity<OngProps> {
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

  get pitch() {
    return this.props.pitch
  }

  get description() {
    return this.props.description
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

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<OngProps, 'createdAt'>, id?: UniqueEntityID) {
    const ong = new Ong(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return ong
  }
}
