import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { loginDTO } from 'src/usuario/usuario.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(body: loginDTO) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        email: body.email,
      },
    });

    if (usuario) {
      if (!(await bcrypt.compare(body.senha, usuario.senha))) {
        throw new HttpException(
          'Login ou Senha Incorreto',
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      throw new HttpException('Login ou Senha Incorreto', HttpStatus.FORBIDDEN);
    }

    const payload = {
      id: usuario.id,
      nome: usuario.nome,
      access_level: usuario.funcao,
    };

    return {
      token: this.jwtService.sign(payload),
      id: usuario.id,
      nome: usuario.nome,
    };
  }
}
