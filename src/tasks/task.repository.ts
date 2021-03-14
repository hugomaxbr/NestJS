import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';
import { User } from 'src/auth/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    private logger = new Logger('TaskRepository');
    async getTasks(filterDTO: GetTasksFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDTO;

        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id });

        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere(
                '(task.title LIKE :search OR task.description LIKE :search)',
                { search: `%${search}%` }
            );
        }

        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            this.logger.error(
                `Failed to get tasks for user ${
                    user.username
                }, \n Filter: ${JSON.stringify({ filterDTO })}`,
                error.stack
            );
            throw new InternalServerErrorException();
        }
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        try {
            await task.save();
        } catch (error) {
            this.logger.verbose(
                `Failed to create a task for user ${
                    user.username
                }.\n Task: ${JSON.stringify(createTaskDto)}`,
                error.stack
            );
            throw new InternalServerErrorException();
        }

        delete task.user;
        delete task.userId;
        return task;
    }
}
