/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  CreateUsuarioDTO,
  filterDTO,
  ListUsuariosDTO,
  ShowUsuarioDTO,
  UpdateUsuarioDTO,
} from './usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async index() {
    const model = await this.prisma.usuario.findMany({});

    const result = model.map((usuario) => {
      return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        funcao: usuario.funcao,
      } as ListUsuariosDTO;
    });

    return { result };
  }

  async show(id: number) {
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!usuario) {
      throw new HttpException('Usuario não Encontrado', HttpStatus.NOT_FOUND);
    }

    const usuarioDTO = new ShowUsuarioDTO(
      usuario.id,
      usuario.nome,
      usuario.email,
      usuario.funcao,
    );

    return usuarioDTO;
  }

  async search(data?) {
    const search = data.search;
    const usuario = await this.prisma.usuario.findMany({
      where: {
        nome: {
          contains: search,
        },
      },
    });

    if (!usuario) {
      throw new HttpException('Dados não Encontrado', HttpStatus.NOT_FOUND);
    }

    return usuario;
  }

  async filter(filter: filterDTO) {
    const usuario = await this.prisma.usuario.findMany({
      where: {
        AND: [
          {
            ...(filter.nome && {
              nome: filter.nome,
            }),
          },
          {
            ...(filter.email && {
              email: filter.email,
            }),
          },
        ],
      },
    });

    if (!usuario) {
      throw new HttpException('Dados não Encontrado', HttpStatus.NOT_FOUND);
    }

    return usuario;
  }

  async create(usuario: CreateUsuarioDTO) {
    usuario.senha = await bcrypt.hash(usuario.senha, 10);
    const data = { ...usuario };

    const result = await this.prisma.usuario.create({ data });

    return this.show(result.id);
  }

  async update(id: number, data: UpdateUsuarioDTO) {
    const usuarioExists = await this.prisma.usuario.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!usuarioExists) {
      throw new HttpException('Usuário não Encontrado', HttpStatus.NOT_FOUND);
    }

    const user = { ...data };

    return await this.prisma.usuario.update({
      data: user,
      where: {
        id: Number(id),
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.usuario.delete({
      where: {
        id: Number(id),
      },
    });
  }

  async emailValidate(email: string) {
    const user = await this.prisma.usuario.findMany({
      where: {
        email: {
          equals: email,
        },
      },
    });

    return user.length > 0;
  }
}
