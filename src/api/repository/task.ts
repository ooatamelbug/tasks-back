import { TaskInterface } from './../interfaces/task';
import { ReturnDataService } from './../interfaces/global';

interface TaskRepo {
    createTask (uerId: string, body: TaskInterface): Promise<ReturnDataService>;
    getTasks (uerId: string): Promise<ReturnDataService>;
    editTasks (uerId: string,taskId: string, body: TaskInterface): Promise<ReturnDataService>;
    deleteTasks (uerId: string, tasksId: [string]): Promise<ReturnDataService | unknown>;
}

export default TaskRepo;
