import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'reflect-metadata';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './modules/system/users/users.module';
import { User } from './modules/system/users/entities/user.entity';
import { RefreshTokenModule } from './modules/system/refresh-token/refresh-token.module';
import { RefreshToken } from './modules/system/refresh-token/entities/refresh-token.entity';
import { StoriesModule } from './modules/public/stories/stories.module';
import { Story } from './modules/public/stories/entities/story.entity';
import { FilesModule } from './modules/system/files/files.module';
import { File } from './modules/system/files/entities/file.entity';
import { CommentsModule } from './modules/public/comments/comments.module';
import { Comment } from './modules/public/comments/entities/comment.entity';
import { RolesModule } from './modules/system/roles/roles.module';
import { Role } from './modules/system/roles/entities/role.entity';
import { UserRolesModule } from './modules/system/user-roles/user-roles.module';
import { UserRole } from './modules/system/user-roles/entities/user-role.entity';
import { PermissionsModule } from './modules/system/permissions/permissions.module';
import { RolePermissionsModule } from './modules/system/role-permissions/role-permissions.module';
import { RolePermission } from './modules/system/role-permissions/entities/role-permission.entity';
import { Permission } from './modules/system/permissions/entities/permission.entity';
import { LikeStoriesModule } from './modules/public/like-stories/like-stories.module';
import { AuthModule } from './modules/system/auth/auth.module';

require('dotenv').config();
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        User,
        RefreshToken,
        File,
        Role,
        UserRole,
        Permission,
        RolePermission,
        Story,
        Comment,
      ],
      logging: true,
      synchronize: true
    }),
    UsersModule,
    RefreshTokenModule,
    StoriesModule,
    FilesModule,
    CommentsModule,
    RolesModule,
    UserRolesModule,
    PermissionsModule,
    RolePermissionsModule,
    LikeStoriesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
