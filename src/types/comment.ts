import User from 'types/users'

export type Comment = {
    _id: string;
    text: string;
    user: User; // or a full user object if populated
    createdAt: Date;
    updatedAt: Date;
  }

export default Comment