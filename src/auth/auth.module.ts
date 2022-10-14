import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { keys } from 'src/config/constants';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports:[forwardRef(()=>UserModule), PassportModule, JwtModule.register({
    secret: keys.JWT_SECRETKEY
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports:[AuthService]
})
export class AuthModule {}
