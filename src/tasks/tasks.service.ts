import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatTaskDto } from './dto/createTask.dto';
import { EditTaskDto } from './dto/editTask.dto';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}
    private tasks: Task[] = [];
    /*
    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(createTaskDto: CreatTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    } */
    async getTaskById(id: number): Promise<Task> {
        console.log('achou');
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            console.log('Rodou');
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }
    /* getTaskById(id: string): Task {
        const found = this.tasks.find((task) => task.id === id);
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

    getTasksWithFilters(filterDTO: GetTasksFilterDto): Task[] {
        const { status, search } = filterDTO;

        let tasks = this.getAllTasks();
        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }
        if (search) {
            tasks =
                tasks.filter((task) => task.title.includes(search)) ||
                tasks.filter((task) => task.description.includes(search));
        }
        return tasks;
    }

    deleteTaskById(id: string) {
        const found = this.getTaskById(id);
        const foundIndex = this.tasks.findIndex((task) => task.id === found.id);
        return this.tasks.splice(foundIndex, 1);
    }

    editStatusById(id: string, status: TaskStatus): Task {
        const found = this.getTaskById(id);
        found.status = status;
        return found;
    }

    editTaskById(id: string, editTaskDto: EditTaskDto): Task {
        const { title, description } = editTaskDto;
        const oldTask = this.getTaskById(id);
        if (title) {
            oldTask.title = title;
        }
        if (description) {
            oldTask.description = description;
        }
        return oldTask;
    } */
}
