import { Resolver, Query, Arg, Ctx } from 'type-graphql';
import TasksEntity from '../../api/entities/task';
import { ContextEntity } from '../context';

@Resolver()
export class taskResolver {
    @Query(() => [TasksEntity], { nullable: true })
    async tasks(
        @Arg('userId') userId: string,
        @Ctx() { req, res }: ContextEntity
    ): Promise<TasksEntity[] | []> {
        return await TasksEntity.find({
            where: {
                user: userId
            },
            relations: ['user']
        });
    }
}