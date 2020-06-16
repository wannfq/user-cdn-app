import { UserController, IGetUsersQueryParam } from './';
import { UserService, ICollection } from '../services';
import { User } from '../entities';
import * as faker from 'faker';
import { ICreateUserBodyParam } from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  let mockUserService: UserService;

  beforeEach(async () => {
    mockUserService = {} as UserService;
  });

  describe('health', () => {
    it('should return OK response', () => {
      userController = new UserController(mockUserService);
      const response = userController.health();
      expect(response).toStrictEqual({
        message: 'OK',
      });
    });
  });

  describe('getUsers', () => {
    it('should return user data from user service with', async () => {
      const queryParam: IGetUsersQueryParam = {
        page: faker.random.number(2),
        perPage: faker.random.number(4),
      };
      const mockResult: ICollection<User> = {
        data: [],
        count: faker.random.number(10),
      };
      mockUserService.getUsers = async (limit?: number, offset?: number) => {
        expect(limit).toBe(queryParam.perPage);
        queryParam.page && queryParam.perPage
          ? expect(offset).toBe((queryParam.page - 1) * queryParam.perPage)
          : expect(offset).toBeUndefined;
        return mockResult;
      };
      const userController = new UserController(mockUserService);
      const response = await userController.getUsers(queryParam);
      expect(response).toStrictEqual({
        message: 'OK',
        data: mockResult.data,
        count: mockResult.count,
      });
    });

    it('should return error message if user service throw exception', async () => {
      const queryParam: IGetUsersQueryParam = {
        page: faker.random.number(2),
        perPage: faker.random.number(4),
      };
      const mockMessage: string = faker.hacker.phrase();
      mockUserService.getUsers = async (limit?: number, offset?: number) => {
        throw new Error(mockMessage);
      };
      const userController = new UserController(mockUserService);
      const response = await userController.getUsers(queryParam);
      expect(response).toStrictEqual({
        error: mockMessage,
      });
    });
  });

  describe('createUser', () => {
    it('should create new user entity based on body', async () => {
      const bodyParam: ICreateUserBodyParam = {
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        username: faker.internet.userName(),
      };
      mockUserService.createUser = async (user: User) => {
        const newUser = new User();
        newUser.email = bodyParam.email;
        newUser.phone = bodyParam.phone;
        newUser.username = bodyParam.username;
        newUser.skillsets = null;
        newUser.hobby = null;
        expect(user).toStrictEqual(newUser);
        return;
      };
      const userController = new UserController(mockUserService);
      const response = await userController.createUser(bodyParam);
      expect(response).toStrictEqual({
        message: 'OK',
      });
    });
  });

  describe('delete', () => {
    it('should update new user entity based on body', async () => {
      const idParam: number = faker.random.number();
      mockUserService.softDeleteUser = async (id: number) => {
        expect(id).toBe(idParam);
        return;
      };
      const userController = new UserController(mockUserService);
      const response = await userController.deleteUser(idParam);
      expect(response).toStrictEqual({
        message: 'OK',
      });
    });
  });
});
