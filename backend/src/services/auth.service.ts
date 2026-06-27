import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { HttpError } from '../lib/http-error';
import { toUserDto } from '../mappers/user.mapper';

export async function registerUser(payload: {
  nombre: string;
  apellido?: string;
  email: string;
  password: string;
}) {
  const email = payload.email?.trim().toLowerCase();

  if (!payload.nombre?.trim() || !email || !payload.password) {
    throw new HttpError(400, 'Nombre, correo y contraseña son obligatorios.');
  }

  if (payload.password.length < 8) {
    throw new HttpError(400, 'La contraseña debe tener al menos 8 caracteres.');
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new HttpError(409, 'Ya existe una cuenta con ese correo.');

  const passwordHash = await bcrypt.hash(payload.password, 10);
  const user = await prisma.user.create({
    data: {
      nombre: payload.nombre.trim(),
      apellido: payload.apellido?.trim() || null,
      email,
      passwordHash
    }
  });

  return toUserDto(user);
}

export async function loginUser(payload: { email: string; password: string }) {
  const email = payload.email?.trim().toLowerCase();
  const user = email ? await prisma.user.findUnique({ where: { email } }) : null;

  if (!user || !(await bcrypt.compare(payload.password ?? '', user.passwordHash))) {
    throw new HttpError(401, 'Correo o contraseña incorrectos.');
  }

  return toUserDto(user);
}

export async function updateUserProfile(
  email: string,
  payload: { nombre?: string; apellido?: string; ocupacion?: string }
) {
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) throw new HttpError(404, 'Usuario no encontrado.');

  const updated = await prisma.user.update({
    where: { email: user.email },
    data: {
      nombre: payload.nombre?.trim() || user.nombre,
      apellido: payload.apellido?.trim() || null,
      ocupacion: payload.ocupacion?.trim() || null
    }
  });

  return toUserDto(updated);
}
