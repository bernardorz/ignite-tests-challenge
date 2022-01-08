import { Statement } from "../../entities/Statement";

export type ITransferOperationDTO =
Pick<
  Statement,
  'user_id' |
  'description' |
  'amount' |
  'type' |
  'sender_id'
>
