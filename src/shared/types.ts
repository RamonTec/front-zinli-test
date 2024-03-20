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

export type recoveryPasswordType = {
  password: string;
  tfaCode: string;
  token: string;
}

export type resetPassword = {
  email: string;
}


export type MediaFile = {
  mediaId: string;

}
