import { Cause } from '@/domain/enterprise/entities/cause'

export interface CausesRepository {
  create(cause: Cause): Promise<void>
  findById(id: string): Promise<Cause | null>
  findByTitle(title: string): Promise<Cause | null>
}
