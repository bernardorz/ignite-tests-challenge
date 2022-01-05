import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { IStatementsRepository } from "@modules/statements/repositories/IStatementsRepository";
import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { CreateUserError } from "../../../users/useCases/createUser/CreateUserError";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../../users/useCases/createUser/ICreateUserDTO";
import { CreateStatementUseCase } from "./CreateStatementUseCase";
import { OperationType } from "@modules/statements/entities/Statement";

import  { CreateStatementError } from './CreateStatementError'

let usersRepositoryInMemory : IUsersRepository;
let createUserUseCase : CreateUserUseCase;
let createStatementUseCase : CreateStatementUseCase;
let statementsRepository : IStatementsRepository;

describe("Create Statement", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new InMemoryUsersRepository();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        statementsRepository = new InMemoryStatementsRepository();
        createStatementUseCase = new CreateStatementUseCase(usersRepositoryInMemory, statementsRepository);
    })

    it("Should be able to create a deposit", async () => {
        const user : ICreateUserDTO = {
            name: 'bernardo',
            email: "bernardo@gmail.com",
            password: "12345"
        }

        const createdUser = await createUserUseCase.execute(user)



        const createdStatment = await statementsRepository.create({
            user_id : createdUser.id,
            description : "test statement",
            amount : 100,
            type : OperationType.DEPOSIT
        })

        expect(createdStatment).toHaveProperty('id');
       
    })

    it('Should be able to create a withdraw', async () => {
        const user = await createUserUseCase.execute({
          name: 'username',
          email: 'mail@mail.com',
          password: 'password'
        });
    
        await createStatementUseCase.execute({
          user_id: user.id,
          type: OperationType.DEPOSIT,
          amount: 100,
          description: 'teste'
        });
    
        const statement = await createStatementUseCase.execute({
          user_id: user.id,
          type: OperationType.WITHDRAW,
          amount: 100,
          description: 'teste'
        });
    
        expect(statement).toHaveProperty('id');
      });
    
    it("Should not be able to create a deposit because user not exist ", async () => {


        await expect(
            createStatementUseCase.execute({
            user_id: "1",
            type: OperationType.DEPOSIT,
            amount: 100,
            description: 'teste'
            })
        ).rejects.toBeInstanceOf(CreateStatementError.UserNotFound);

    })
})