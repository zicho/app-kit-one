import type {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable
} from 'kysely';

export interface Database {
  users: UserTable;
  sessions: SessionTable;
}

export interface UserTable {
  id: Generated<number>;
  username: string;
}

export interface SessionTable {
  id: Generated<number>;
  user_id: number;
  expires_at: Date;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export type Session = Selectable<SessionTable>;
export type NewSession = Insertable<SessionTable>;
export type SessionUpdate = Updateable<SessionTable>;
