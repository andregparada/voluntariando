import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { normalizeText } from '@/core/utils/normalizeText'

interface CauseProps {
  title: string
  normalizedTitle: string // ??? devo excluir esse prop e deixar só um ger normaliazedTitle que retorna o titulo normalizado?
}

export class Cause extends Entity<CauseProps> {
  get title() {
    return this.props.title
  }

  get normalizedTitle() {
    return this.props.normalizedTitle
  }

  static create(
    props: Optional<CauseProps, 'normalizedTitle'>,
    id?: UniqueEntityID,
  ) {
    const cause = new Cause(
      {
        ...props,
        normalizedTitle: props.normalizedTitle ?? normalizeText(props.title),
      },
      id,
    )

    return cause
  }
}
