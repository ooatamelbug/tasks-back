import { TaskInterface } from './../interfaces/task';
import { ReturnDataService } from './../interfaces/global';

interface TaskRepo {
    createTask (uerId: string, body: TaskInterface): Promise<ReturnDataService>;
    getTasks (uerId: string): Promise<ReturnDataService>;
}

export default TaskRepo;
