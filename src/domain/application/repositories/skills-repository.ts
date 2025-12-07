import { Skill } from '@/domain/enterprise/entities/skill'

export interface SkillsRepository {
  create(skill: Skill): Promise<void>
  findById(id: string): Promise<Skill | null>
  findBySlug(slug: string): Promise<Skill | null>
}
