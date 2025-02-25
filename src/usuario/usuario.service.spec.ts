// src/user/user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { PrismaService } from '../Prisma/prisma.service';
import { ListUsuariosDTO, ShowUsuarioDTO } from './usuario.dto';

const mockUser: ShowUsuarioDTO = {
  id: 1,
  nome: 'teste',
  email: 'teste@exemplo.com',
  funcao: 'cliente',
};

const mockUser2: ListUsuariosDTO = {
  id: 1,
  nome: 'teste',
  email: 'teste@exemplo.com',
  funcao: 'cliente',
};

const mockPrismaService = {
  usuario: {
    findFirst: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn().mockResolvedValue(mockUser),
    findMany: jest.fn().mockResolvedValue([mockUser]),
  },
};

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const result = await service.show(1);
      expect(result).toEqual(mockUser);
      expect(mockPrismaService.usuario.findFirst).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('create', () => {
    const CreateUsuarioDTO = {
      nome: 'teste',
      email: 'teste@exemplo.com',
      senha: 'senha',
      funcao: 'cliente',
    };
    it('should create a new user', async () => {
      const result = await service.create(CreateUsuarioDTO);
      expect(result).toEqual(mockUser);
      expect(mockPrismaService.usuario.findFirst).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.index();
      expect(result.result).toEqual([mockUser2]);
      expect(mockPrismaService.usuario.findMany).toHaveBeenCalled();
    });
  });
});
