import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { EditTaskDto } from './dto/editTask.dto';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipes';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    //A injeção de dependência é feita assim no typescript, ela é feita pelo construtor.
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(
        @Query(ValidationPipe)
        filterDTO: GetTasksFilterDto
    ): Promise<Task[]> {
        return this.tasksService.getTasks(filterDTO);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    editStatusById(
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @Param('id', ParseIntPipe) id: number
    ): Promise<Task> {
        return this.tasksService.editStatusById(id, status);
    }
}
