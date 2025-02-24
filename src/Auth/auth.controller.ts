import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from 'src/usuario/usuario.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() body: loginDTO) {
    return this.authService.login(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile() {
    return { message: 'This is a protected route' };
  }
}
