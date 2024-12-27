import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { envSchema, EnvModule } from './env'
import { AuthModule } from './auth'
import { EventsModule } from './events'
import { HttpModule } from './http'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    EnvModule,
    EventsModule,
  ],
})
export class AppModule {}
