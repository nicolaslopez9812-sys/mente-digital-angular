import { Request, Response } from 'express';
import * as cursoService from '../services/curso.service';

export async function index(_req: Request, res: Response) {
  res.json(await cursoService.listCursos());
}

export async function show(req: Request, res: Response) {
  res.json(await cursoService.getCurso(Number(req.params.id)));
}

export async function store(req: Request, res: Response) {
  const curso = await cursoService.createCurso(req.body);
  res.status(201).json(curso);
}

export async function update(req: Request, res: Response) {
  res.json(await cursoService.updateCurso(Number(req.params.id), req.body));
}

export async function destroy(req: Request, res: Response) {
  await cursoService.deleteCurso(Number(req.params.id));
  res.status(204).send();
}
