import validator from 'validator';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { BadRequestException } from '@nestjs/common';

export class CommonValidation {
  public static validateWebURL(url: string): boolean {
    return validator.isURL(url);
  }
  public static validateEmailAddress(email: string) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  public static isValidCNPJ(number: string): boolean {
    return cnpj.isValid(number);
  }
  public static isValidCPF(number: string): boolean {
    return cpf.isValid(number);
  }
  public static getEnumValue<
    T extends { [key: string]: string | number | never },
  >(enumObj: T, enumName: string, value: string): T[keyof T] {
    const values = Object.values(enumObj) as Array<string | number>;
    if (values.includes(value)) {
      return value as T[keyof T];
    }
    throw new BadRequestException(
      `Value '${value}' is not a ${enumName} property. Try one of: ${Object.values(enumObj).join(', ')}`,
    );
  }
}
