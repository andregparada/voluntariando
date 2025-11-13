export class Address {
  public neighborhood: string
  public street: string
  public number: string
  public cep: string
  public complement?: string
  public additionalInfo?: string

  constructor(
    neighborhood: string,
    street: string,
    number: string,
    cep: string,
    complement?: string,
    additionalInfo?: string,
  ) {
    this.neighborhood = neighborhood
    this.street = street
    this.number = number
    this.cep = cep
    this.complement = complement
    this.additionalInfo = additionalInfo
  }
}
