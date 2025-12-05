import { ValueObject } from '@/core/entities/value-objects'

interface AddressProps {
  neighborhood: string
  street: string
  number: string
  cep: string
  complement?: string
  additionalInfo?: string
}

export class Address extends ValueObject<AddressProps> {
  get neighborhood() {
    return this.props.neighborhood
  }

  get street() {
    return this.props.street
  }

  get number() {
    return this.props.number
  }

  get cep() {
    return this.props.cep
  }

  get complement() {
    return this.props.complement
  }

  get additionalInfo() {
    return this.props.additionalInfo
  }

  static create(props: AddressProps) {
    return new Address(props)
  }
}
