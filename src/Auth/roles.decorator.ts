// src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Roles = (...funcao: string[]) => SetMetadata('funcao', funcao);
