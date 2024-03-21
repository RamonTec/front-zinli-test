export const ErrorMessages = {
  emailExist: 'Email already exists',
  emailNotVerified: 'Email is not verified',
  errorNetwork: 'ERR_NETWORK',
  userNotExist: 'User not exist',
};

export interface QueryResponse<T> {
  loading: boolean;
  error?: Error;
  data?: T;
  refetch: () => void;
}

export type UserModel = {
  username?: string;
  name?: string;
  surname?: string;
}

export type PostModel = {
  _id?: string,
  image?: string,
  message: string,
  likes?: string,
  author: string,
  create_at: Date,
  location: string,
  status: 'drafted' | 'deleted' | 'published'
}


export type MediaFile = {
  mediaId: string;

}
