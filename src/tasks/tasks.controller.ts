import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { get } from 'http';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { title } from 'process';
import { CreatTaskDto } from './dto/createTask.dto';

@Controller('tasks')
export class TasksController {
  //A injeção de dependência é feita assim no typescript, ela é feita pelo construtor.
  constructor(private tasksService: TasksService) {}
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }
  @Post()
  createTask(@Body() createTaskDto : CreatTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string ) : Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete()
  deleteTaskById(@Param("id") id: string){
    return this.tasksService.deleteTaskById(id)//inserir código
  }
}
