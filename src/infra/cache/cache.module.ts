import { Module } from '@nestjs/common'

import { EnvModule } from '../env'
import { CacheRepository } from './cache-repository'
import { RedisCacheRepository, RedisService } from './redis'

@Module({
  imports: [EnvModule],
  providers: [
    RedisService,
    {
      provide: CacheRepository,
      useClass: RedisCacheRepository,
    },
  ],
  exports: [CacheRepository],
})
export class CacheModule {}
