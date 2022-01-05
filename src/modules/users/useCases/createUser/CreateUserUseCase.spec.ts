import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { ICreateUserDTO } from "./ICreateUserDTO";

let usersRepositoryInMemory : IUsersRepository;
let createUserUseCase : CreateUserUseCase;

describe("Create new user", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new InMemoryUsersRepository();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })

    it("Should be able to create a new user", async () => {
        const user : ICreateUserDTO = {
            name: 'bernardo',
            email: "bernardo@gmail.com",
            password: "12345"
        }

        const createdUser = await createUserUseCase.execute(user)

        expect(createdUser).toHaveProperty("id");
        expect(createdUser.email).toBe("bernardo@gmail.com");
    })

    it('should not be able to create a new user with same email from another', async () => {
        await createUserUseCase.execute({
            name: "bernardo rizzatti",
            email: "bernardorizzatti@gmail.com",
            password: "ber123pvp"
        })

        await expect(
            createUserUseCase.execute({
                name: "bernardo rizzatti",
                email: "bernardorizzatti@gmail.com",
                password: "ber123pvp"
            })
        ).rejects.toBeInstanceOf(CreateUserError);

    });

})