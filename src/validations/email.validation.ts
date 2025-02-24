import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailValidator implements ValidatorConstraintInterface {
  constructor(private usuarioService: UsuarioService) {}

  async validate(value: any): Promise<boolean> {
    const email = await this.usuarioService.emailValidate(value);

    return !email;
  }
}

export const IsUniqueEmail = (optionsValidators: ValidationOptions) => {
  return (objeto: object, props: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: props,
      options: optionsValidators,
      constraints: [],
      validator: EmailValidator,
    });
  };
};
