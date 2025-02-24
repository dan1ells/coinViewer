import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDTO {
  @IsNotEmpty({ message: 'Você deve informar seu nome.' })
  @MaxLength(191, { message: 'O campo Nome atingiu o limite de caracteres.' })
  nome: string;

  @IsEmail(undefined, { message: 'Digite um Email válido.' })
  @MaxLength(191, { message: 'O campo Email atingiu o limite de caracteres.' })
  email: string;

  @Exclude({
    toPlainOnly: true,
  })
  @MinLength(8, { message: 'Digite uma senha forte.' })
  senha: string;

  @IsOptional()
  @MaxLength(191, { message: 'O campo função atingiu o limite de caracteres.' })
  funcao: string;
}

export class UpdateUsuarioDTO {
  @IsNotEmpty({ message: 'Você deve informar seu nome.' })
  @MaxLength(191, { message: 'O campo Nome atingiu o limite de caracteres.' })
  nome: string;

  @IsEmail(undefined, { message: 'Digite um Email válido.' })
  @MaxLength(191, { message: 'O campo Email atingiu o limite de caracteres.' })
  email: string;

  @Exclude({
    toPlainOnly: true,
  })
  @MinLength(8, { message: 'Digite uma senha forte.' })
  senha: string;

  @IsOptional()
  @MaxLength(191, { message: 'O campo função atingiu o limite de caracteres.' })
  funcao: string;
}

export class loginDTO {
  @IsEmail(undefined, { message: 'Digite um Email.' })
  email: string;

  @Exclude({
    toPlainOnly: true,
  })
  @MinLength(8, { message: 'Digite uma senha.' })
  senha: string;
}

export class filterDTO {
  @IsEmail(undefined, { message: 'Digite um Email.' })
  email: string;

  @IsNotEmpty({ message: 'Digite um Nome' })
  nome: string;
}

export class ListUsuariosDTO {
  constructor(
    readonly id: number,
    readonly nome: string,
    readonly email: string,
    readonly funcao: string,
  ) {}
}

export class ShowUsuarioDTO {
  constructor(
    readonly id: number,
    readonly nome: string,
    readonly email: string,
    readonly funcao: string,
  ) {}
}
