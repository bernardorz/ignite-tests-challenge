import { Request, Response } from "express";
import { container } from "tsyringe";
import { TransferOperationUseCase } from "./TransferOperationUseCase";



class TransferOperationController {

 async handle(request: Request, response: Response): Promise<Response> {
  const sender_id = request.user.id;
  const { user_id } = request.params;
  const { amount, description } = request.body;

  const transferOperationUseCase = container.resolve(TransferOperationUseCase);

  const transfer = await transferOperationUseCase.execute({
   sender_id,
   user_id,
   amount,
   description
  })

  return response.json(transfer)
 }
}
export { TransferOperationController }