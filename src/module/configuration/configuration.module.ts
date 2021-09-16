import { Global, Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [ConfigurationService],
  exports: [ConfigurationService]
})
export class ConfigurationModule {}
