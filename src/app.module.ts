import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AuthModule } from './Auth/auth.module';
import { CoinModule } from './coin/coin.module';

@Module({
  imports: [UsuarioModule, AuthModule, CoinModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'login', method: RequestMethod.POST },
        { path: 'usuario', method: RequestMethod.POST },
      )
      .forRoutes('');
  }
}
