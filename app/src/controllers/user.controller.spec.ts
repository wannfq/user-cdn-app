import { Test, TestingModule } from '@nestjs/testing';
import { UserController, IGetUsersQueryParam } from './';
import { UserService, ICollection } from '../services';
import { User } from '../entities';
import faker from 'faker';
import { response } from 'express';

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
      console.log(response);
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
      const response = await userController.getUsers(queryParam);
      expect(response).toStrictEqual({
        message: mockMessage,
      });
    });
  });
});
