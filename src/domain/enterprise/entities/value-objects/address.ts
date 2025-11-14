export class Address {
  constructor(
    public readonly neighborhood: string,
    public readonly street: string,
    public readonly number: string,
    public readonly cep: string,
    public readonly complement?: string,
    public readonly additionalInfo?: string,
  ) {}
}
