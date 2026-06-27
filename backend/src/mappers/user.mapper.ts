import { User } from '@prisma/client';
import { UserDto } from '../types/user';

export function toUserDto(user: User): UserDto {
  return {
    id: user.id,
    nombre: user.nombre,
    apellido: user.apellido ?? undefined,
    email: user.email,
    ocupacion: user.ocupacion ?? undefined,
    createdAt: user.createdAt.toISOString()
  };
}
