export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  company: {
    id: string;
    name: string;
    status: string;
  } | null;
};

export type LoginDto = {
  email: string;
  password: string;
  fcmToken?: string;
};

export type LoginResponse = {
  status: boolean;
  code: string;
  message: string;
  data?: {
    status: boolean;
    accessToken: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: {
        code: string;
        permissions: {
          allowed: boolean;
          feature: { code: string };
        }[];
      };
      company: {
        id: string;
        name: string;
        status: string;
      } | null;
    };
  };
};

export type SetPasswordDto = {
  token: string;
  password: string;
};

export type SetPasswordResponse = {
  status: boolean;
  message: string;
};
