import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';

@Module({
  imports:[UserModule,JwtModule.register({global:true})],
  controllers: [AuthController],
  providers: [AuthService,TokensService],

})
export class AuthModule {}
