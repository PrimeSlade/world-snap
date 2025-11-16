import { Category } from 'generated/prisma/enums';

export class User {
  id: number;
  name: string;
  email: string;
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
