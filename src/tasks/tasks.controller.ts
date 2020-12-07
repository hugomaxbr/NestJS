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
} from '@nestjs/common';
import { get } from 'http';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { title } from 'process';
import { CreatTaskDto } from './dto/createTask.dto';
import { EditTaskDto } from './dto/editTask.dto';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';

@Controller('tasks')
export class TasksController {
  //A injeção de dependência é feita assim no typescript, ela é feita pelo construtor.
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks(@Query() filterDTO : GetTasksFilterDto): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get()
  getTasksWithFilters(filterDto : GetTasksFilterDto){

  }

  @Post()
  createTask(@Body() createTaskDto: CreatTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }



  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete()
  deleteTaskById(@Param('id') id: string) {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  editStatusById(
    @Body('taskStatus') taskStatus: TaskStatus,
    @Param('id') id: string,
  ) {
    return this.tasksService.editStatusById(id, taskStatus);
  }

  @Put('/:id')
  editTaskById(@Param('id') id: string, @Body() editTaskDto: EditTaskDto) {
    return this.tasksService.editTaskById(id, editTaskDto);
  }
}
