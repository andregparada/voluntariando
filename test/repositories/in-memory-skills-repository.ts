import { normalizeText } from '@/core/utils/normalizeText'
import { SkillsRepository } from '@/domain/application/repositories/skills-repository'
import { Skill } from '@/domain/enterprise/entities/skill'

export class InMemorySkillsRepository implements SkillsRepository {
  public items: Skill[] = []

  async create(skill: Skill) {
    this.items.push(skill)
  }

  async findById(id: string) {
    const skill = this.items.find((item) => item.id.toString() === id)

    if (!skill) {
      return null
    }

    return skill
  }

  async findByTitle(title: string) {
    const normalizedTitle = normalizeText(title)

    const skill = this.items.find(
      (item) => item.normalizedTitle === normalizedTitle,
    )

    if (!skill) {
      return null
    }

    return skill
  }
}
