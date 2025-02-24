import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { PrismaService } from 'src/Prisma/prisma.service';
import { EmailValidator } from 'src/validations/email.validation';
import { UsuarioService } from './usuario.service';

@Module({
  providers: [UsuarioService, EmailValidator, PrismaService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {}
