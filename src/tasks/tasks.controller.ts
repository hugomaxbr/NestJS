import {
    Body,
    Controller,
    Delete,
    Get,
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
import { CreatTaskDto } from './dto/createTask.dto';
import { EditTaskDto } from './dto/editTask.dto';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipes';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    //A injeção de dependência é feita assim no typescript, ela é feita pelo construtor.
    constructor(private tasksService: TasksService) {}

    /*
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
    } */

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        console.log('controller rolou');
        return this.tasksService.getTaskById(id);
    }

    /*
    @Delete('/:id')
    deleteTaskById(@Param('id') id: string) {
        return this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    editStatusById(
        @Body('taskStatus', TaskStatusValidationPipe) taskStatus: TaskStatus,
        @Param('id') id: string
    ) {
        return this.tasksService.editStatusById(id, taskStatus);
    }

    @Put('/:id')
    editTaskById(@Param('id') id: string, @Body() editTaskDto: EditTaskDto) {
        return this.tasksService.editTaskById(id, editTaskDto);
    } */
}
