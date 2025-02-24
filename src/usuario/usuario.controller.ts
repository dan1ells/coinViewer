import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDTO, filterDTO, UpdateUsuarioDTO } from './usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @Get()
  async index() {
    return this.usuarioService.index();
  }

  @Get(':id')
  async show(@Param('id') id: number) {
    return this.usuarioService.show(id);
  }

  @Post('search')
  async search(@Body() search: object) {
    return this.usuarioService.search(search);
  }

  @Post('filter')
  async filter(@Body() filter: filterDTO) {
    return this.usuarioService.filter(filter);
  }

  @Post()
  create(@Body() user: CreateUsuarioDTO) {
    return this.usuarioService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: UpdateUsuarioDTO) {
    return this.usuarioService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuarioService.remove(id);
  }
}
