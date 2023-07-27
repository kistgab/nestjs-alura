import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UniqueEmail } from '../validations/unique-email.validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  name: string;

  @IsOptional()
  @IsEmail(undefined, { message: 'O e-mail deve ser válido!' })
  @UniqueEmail({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @IsOptional()
  @MinLength(6, { message: 'A Senha deve ter pelo menos 6 caracteres' })
  password: string;
}
