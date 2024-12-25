import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const todos = await prisma.todo.findMany();
    return res.status(200).json(todos);
  }

  if (req.method === 'POST') {
    const { title, userId } = req.body;
    const todo = await prisma.todo.create({
      data: { title, userId },
    });
    return res.status(201).json(todo);
  }

  if (req.method === 'PUT') {
    const { id, completed } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    return res.status(200).json(updatedTodo);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    await prisma.todo.delete({
      where: { id },
    });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
