import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { QuestionModule } from './app/question/question.module';
import { AnswerModule } from './app/answer/answer.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseTransformerInterceptor } from './core/http/response-transformer.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './app/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './env/env.validation';
import { UserModule } from './app/user/user.module';
import { AdminModule } from './app/admin/admin.module';
import { PrismaModule } from './prisma/prisma.module';
import { EventsGateway } from './events/events.gateway';
import * as redisStore from 'cache-manager-redis-store';
import env from './env/env';
import { GameModule } from './game/game.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: validateEnv,
		}),
		PrismaModule,
		QuestionModule,
		AnswerModule,
		AuthModule,
		UserModule,
		AdminModule,
		EventsGateway,
	],
	controllers: [AppController],
	providers: [
		AppService,
		PrismaService,
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseTransformerInterceptor,
		},
	],
})
export class AppModule {}
