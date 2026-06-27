import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export async function register(req: Request, res: Response) {
  const user = await authService.registerUser(req.body);
  res.status(201).json(user);
}

export async function login(req: Request, res: Response) {
  const user = await authService.loginUser(req.body);
  res.json(user);
}

export async function updateProfile(req: Request, res: Response) {
  const user = await authService.updateUserProfile(req.params.email, req.body);
  res.json(user);
}
