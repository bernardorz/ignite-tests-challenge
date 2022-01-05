import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

let usersRepositoryInMemory : IUsersRepository;
let createUserUseCase : CreateUserUseCase;
let authenticateUserUseCase : AuthenticateUserUseCase;


describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new InMemoryUsersRepository();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    })

    it('should be able to authenticate', async () => {

        await  createUserUseCase.execute({
             name : "bernardo rizzatti",
             email : "bernardorizzatti@gmail.com",
             password : "ber123pvp"
         })
 
 
 
         const response = await authenticateUserUseCase.execute({
             email : "bernardorizzatti@gmail.com",
             password : "ber123pvp"
         })
 
 
         expect(response.user).toHaveProperty('id');
         expect(response).toHaveProperty('token');
         
     });

    it('should not be able to authenticate with wrong e-mail', async () => {
        
        await createUserUseCase.execute({
             name : "bernardo rizzatti",
             email : "bernardorizzatti@gmail.com",
             password : "ber123pvp"
         })
 
        await expect(authenticateUserUseCase.execute({
             email : "bernardorizzatti01@gmail.com",
             password : "ber321pvp"
         })).rejects.toBeInstanceOf
         (IncorrectEmailOrPasswordError);
         
    });

    it("shouldn't show the user because he doesn't exist", async () => {
  
        await expect(
            authenticateUserUseCase.execute({email : "", password : ""})
        ).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);

    });

})