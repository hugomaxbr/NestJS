import { Body, Controller, Get, Post } from '@nestjs/common';
import { get } from 'http';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { title } from 'process';

@Controller('tasks')
export class TasksController {
  //A injeção de dependência é feita assim no typescript, ela é feita pelo construtor.
  constructor(private tasksService: TasksService) {}
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }
  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.createTask(title, description);
  }
}
