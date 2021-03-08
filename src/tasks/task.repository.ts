import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
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

        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        await task.save();
        delete task.user;
        delete task.userId;
        return task;
    }
}
