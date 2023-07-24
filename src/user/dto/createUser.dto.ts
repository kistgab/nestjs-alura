import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  name: string;

  @IsEmail(undefined, { message: 'O e-mail deve ser válido!' })
  email: string;

  @MinLength(6, { message: 'A Senha deve ter pelo menos 6 caracteres' })
  password: string;
}
