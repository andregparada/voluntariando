import { normalizeText } from '@/core/utils/normalizeText'
import { CausesRepository } from '@/domain/application/repositories/causes-repository'
import { Cause } from '@/domain/enterprise/entities/cause'

export class InMemoryCausesRepository implements CausesRepository {
  public items: Cause[] = []

  async create(cause: Cause) {
    this.items.push(cause)
  }

  async findById(id: string) {
    const cause = this.items.find((item) => item.id.toString() === id)

    if (!cause) {
      return null
    }

    return cause
  }

  async findByTitle(title: string) {
    const normalizedTitle = normalizeText(title)

    const cause = this.items.find(
      (item) => item.normalizedTitle === normalizedTitle,
    )

    if (!cause) {
      return null
    }

    return cause
  }
}
