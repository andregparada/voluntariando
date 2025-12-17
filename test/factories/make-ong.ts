import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Ong, OngProps } from '@/domain/enterprise/entities/ong'
import { Address } from '@/domain/enterprise/entities/value-objects/address'

export function makeOng(
  override: Partial<OngProps> = {},
  id?: UniqueEntityID,
): Ong {
  const ong = Ong.create(
    {
      name: faker.company.name(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      address: Address.create({
        neighborhood: faker.location.city(),
        street: faker.location.street(),
        number: faker.location.buildingNumber(),
        cep: faker.location.zipCode('########'),
        complement: faker.location.secondaryAddress(),
        additionalInfo: faker.lorem.sentence(),
      }),
      about: faker.lorem.paragraph(),
      createdAt: new Date(),
      ...override,
    },
    id,
  )

  return ong
}
