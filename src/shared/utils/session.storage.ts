
export interface UserStorageProps {
  data: {
    refreshToken: string;
    token: string;
    username: string;
    id: string;
    name: string;
    surname: string;
    avatar: string;
  }
}


type GetUserLocalStorageReturnType = UserStorageProps | undefined;

export const SetUserLocalStorage = (_value : UserStorageProps) => {
  localStorage.setItem('user', JSON.stringify(_value));
}

export const GetUserLocalStorage = (): GetUserLocalStorageReturnType => {
  if (typeof localStorage !== 'undefined') {
    const storedUserString = localStorage.getItem('user');
    if (storedUserString) {
      const storedUser: UserStorageProps = JSON.parse(storedUserString);
      return storedUser;
    } else {
      return undefined;
    }
  }

  return undefined;
  
}