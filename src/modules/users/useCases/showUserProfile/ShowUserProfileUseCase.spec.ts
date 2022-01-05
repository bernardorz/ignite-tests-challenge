import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { CreateUserError } from "../createUser/CreateUserError";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let usersRepositoryInMemory : IUsersRepository;
let createUserUseCase : CreateUserUseCase;
let showUserProfileUseCase : ShowUserProfileUseCase;

describe("Show user Profile", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new InMemoryUsersRepository();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        showUserProfileUseCase = new ShowUserProfileUseCase(usersRepositoryInMemory);

    })

    it("Should be able show user profile", async () => {
        const user : ICreateUserDTO = {
            name: 'bernardo',
            email: "bernardo@gmail.com",
            password: "12345"
        }

       const craetedUser = await createUserUseCase.execute(user);

       const findUserById = await showUserProfileUseCase.execute(craetedUser.id);

       expect(findUserById.email).toBe("bernardo@gmail.com");
        
    })

    it("shouldn't show the user because he doesn't exist", async () => {
  
        await expect(
            showUserProfileUseCase.execute('1')
        ).rejects.toBeInstanceOf(ShowUserProfileError);

    });

})