import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { normalizeText } from '@/core/utils/normalizeText'

export interface SkillProps {
  title: string
  normalizedTitle: string
}

export class Skill extends Entity<SkillProps> {
  get title() {
    return this.props.title
  }

  get normalizedTitle() {
    return this.props.normalizedTitle
  }

  static create(
    props: Optional<SkillProps, 'normalizedTitle'>,
    id?: UniqueEntityID,
  ) {
    const skill = new Skill(
      {
        ...props,
        normalizedTitle: props.normalizedTitle ?? normalizeText(props.title),
      },
      id,
    )

    return skill
  }
}
