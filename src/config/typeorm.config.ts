import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Task } from '../tasks/task.entity';

export default {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'task_manager',
    entities: [User, Task],
    synchronize: false,
    logging: true,
    migrations: [__dirname + '/migrations/**/*.ts'],
    cli: {
        migrationsDir: './src/config/migrations',
    },
} as TypeOrmModuleOptions;
