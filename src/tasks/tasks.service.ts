import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreatTaskDto } from './dto/createTask.dto';
import { EditTaskDto } from './dto/editTask.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto : CreatTaskDto): Task {
    const {title, description} = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string) : Task {
    return this.tasks.find(task => task.id === id);
  }

  deleteTaskById(id: string) {
    const found = this.getTaskById(id);
    const foundIndex = this.tasks.findIndex(task => task.id === found.id)
    return this.tasks.splice(foundIndex, 1);
  }

  editTaskById(id : string, editTaskDto : EditTaskDto) {
    const oldTask = this.getTaskById(id);
    return this.tasks.forEach(task => task.id === oldTask.id ? { ...oldTask, task   } : task );
  }

}
