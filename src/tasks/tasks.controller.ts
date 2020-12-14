import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { get } from 'http';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { title } from 'process';
import { CreatTaskDto } from './dto/createTask.dto';
import { EditTaskDto } from './dto/editTask.dto';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipes';

@Controller('tasks')
export class TasksController {
  //A injeção de dependência é feita assim no typescript, ela é feita pelo construtor.
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDTO).length) {
      return this.tasksService.getTasksWithFilters(filterDTO);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreatTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  editStatusById(
    @Body('taskStatus', TaskStatusValidationPipe) taskStatus: TaskStatus,
    @Param('id') id: string,
  ) {
    return this.tasksService.editStatusById(id, taskStatus);
  }

  @Put('/:id')
  editTaskById(@Param('id') id: string, @Body() editTaskDto: EditTaskDto) {
    return this.tasksService.editTaskById(id, editTaskDto);
  }
}
