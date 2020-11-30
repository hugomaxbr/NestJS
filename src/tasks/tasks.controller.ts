import { Controller, Get } from '@nestjs/common';
import { get } from 'http';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
    //A injeção de dependência é feita assim no typescript, ela é feita pelo construtor.
    constructor(private tasksService: TasksService) {}
    @Get()
    getAllTasks(): Task [] {
        return this.tasksService.getAllTasks();
    }
}
     

