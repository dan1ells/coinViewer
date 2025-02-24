// src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Roles = (...funcoes: string[]) => SetMetadata('funcao', funcoes);
