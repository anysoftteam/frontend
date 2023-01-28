import { User } from 'src/interfaces/services/models/User';
import { UserRole } from 'src/common/enums/app/role.enum';
import { http } from 'src/services/http/HttpService';
import { StorageKey } from 'src/common/enums/storage-key.enum';

interface getUserArgs {
  role: UserRole;
  page?: number;
  per_page?: number;
  created_by?: number;
}

interface getUserByIdArgs {
  role: UserRole;
  id: number;
}

interface createUserArgs {
  role: UserRole;
  user: User;
  pass: string;
}

interface updateUserArgs {
  role: UserRole;
  user: User;
  pass?: string;
}

export class UserService {
  static async getAllUsers(args: getUserArgs) {
    if (args.role === UserRole.ROOT) throw new Error('Неправильна роль');

    return http.get<
      { page?: number; per_page?: number },
      { entities: User[]; count: number }
    >(`/${args.role}${args.created_by ? `/${args.created_by}/created` : ''}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem(StorageKey.TOKEN)}`,
        'Content-Type': 'multipart/form-data; charset=utf-8',
      },
      params: {
        page: args.page,
        per_page: args.per_page,
      },
    });

    // get /registrator?page=&per_page=
    // get /admin?page=&per_page
  }

  static async getUserById(args: getUserByIdArgs) {
    if (args.role === UserRole.ROOT) throw new Error('Неправильна роль');

    return http.get<null, User>(`/${args.role}/${args.id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem(StorageKey.TOKEN)}`,
        'Content-Type': 'multipart/form-data; charset=utf-8',
      },
    });
    // get /registrator/:id
    // get /admin/:id
  }

  static async createUser(args: createUserArgs) {
    const req: Record<string, any> = { pass: args.pass };

    if (args.role === UserRole.ADMIN || args.role === UserRole.REGISTRATOR)
      req[args.role] = args.user;
    else throw new Error('Неправильна роль');

    type r = typeof req;
    return http.post<r, number>(`/${args.role}`, req, {
      headers: {
        authorization: `Bearer ${localStorage.getItem(StorageKey.TOKEN)}`,
      },
    });

    // post /registrator
    // post /admin
  }

  static async updateUser(args: updateUserArgs) {
    const req: Record<string, any> = { pass: args.pass };
    if (args.role === UserRole.ROOT) throw new Error('Неправильна роль');
    req[args.role] = args.user;
    type t = typeof req;
    return http.put<t, number>(
      `/${args.role}`,
      {
        ...req,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem(StorageKey.TOKEN)}`,
        },
      },
    );

    // put /registrator
    // put /admin
  }

  static async login(email: string, pass: string) {
    return http.post<
      { email: string; pass: string },
      { token: string; user: { id: number; role: string } }
    >('/login', { email, pass });
  }
}
