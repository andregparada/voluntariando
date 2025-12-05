import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface SkillProps {
  title: string
}

export class Skill extends Entity<SkillProps> {
  get title() {
    return this.props.title
  }

  static create(props: SkillProps, id?: UniqueEntityID) {
    const skill = new Skill(props, id)

    return skill
  }
}
