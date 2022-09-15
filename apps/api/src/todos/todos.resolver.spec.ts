import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { v4 as uuid } from 'uuid';
import { TodoInterface } from './dto/todos';
import { TodosResolver } from './todos.resolver';
import { TodosService } from './todos.service';
import { UserInterface } from '../users/dto/users';
import { User } from '../users/entities/user.entity';

const userId = uuid();
const todoId = uuid();

const mockUser = new User({
  id: userId,
  first_name: "test",
  last_name: "test",
  email: "test@test.com",
  password: "pass",
})

const mockTodo: TodoInterface = {
  completed: false,
  id: todoId,
  body: 'Mock Body',
  user: mockUser
};

const todosServiceMock = {
  findOne: jest.fn((user: UserInterface, id: number): TodoInterface => mockTodo),
  findAll: jest.fn((user: UserInterface): TodoInterface[] => [mockTodo]),
};

describe('TodosResolver', () => {
  let resolver: TodosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {provide: TodosService, useValue: createMock<TodosService>()},
        TodosResolver, 
        { provide: TodosService, useValue: todosServiceMock },
      ],
    }).compile();

    resolver = module.get<TodosResolver>(TodosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should query for a single todo', async () => {
    const result = await resolver.findOne(mockUser, todoId);
    expect(result.id).toEqual(todoId);
  });

  it('should query all todos', async () => {
    const result = await resolver.findAll(mockUser);
    expect(Array.isArray(result)).toEqual(true);
  });

});
