import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CauseProps {
  title: string
}

export class Cause extends Entity<CauseProps> {
  get title() {
    return this.props.title
  }

  static create(props: CauseProps, id?: UniqueEntityID) {
    const cause = new Cause(props, id)

    return cause
  }
}
