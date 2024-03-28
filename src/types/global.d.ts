declare global {
  type UserType = "GUEST" | "MEMBER" | "MANAGER" | "ADMIN" | "SUPER_ADMIN";

  type UserTypesMap = { [key in UserType]: key };
  type GenderType = "MALE" | "FEMALE" | "OTHERS";

  type RegistrationStep =
    | "SIGN_UP"
    | "INVITED"
    | "EMAIL_VERIFICATION"
    | "EMAIL_VERIFIED"
    | "MOBILE_VERIFICATION"
    | "MOBILE_VERIFIED"
    | "FINAL_VERIFICATION"
    | "VERIFIED";

  type RegistrationSteps = {
    [P in RegistrationStep]: P;
  };

  type DatabaseRecord = {
    id: number;
    createdAt: string; //Date // immer(redux) won't allow non-serializable data
    updatedAt?: string; //Date
    deletedAt?: string; //Date
  };

  type AuthUser = {
    email: string;
    name: string;
    userType: UserType;
    image?: string;
  };

  type UserStatus =
    | "away"
    | "busy"
    | "unread"
    | "online"
    | "offline"
    | "invisible";

  type User = DatabaseRecord & {
    profilePic: string;
    email: string;
    userType: UserType;
    firstName: string;
    lastName: string;
    name: string;
    phoneNumber: string;
    address: string;
    gender: GenderType;
    registrationStep: RegistrationStep;
    onlineStatus?: UserStatus;
    isActive?: boolean;
    password?: string;
    deletedAt?: string | null;
    createdAt?: string | null;
  };

  type FileObject = DatabaseRecord & {
    name: string;
    url: string;
    externalUrl?: string;
    referenceName?: string;
    referenceId?: number;
    category?: string;
    deletedAt?: string | null;
    createdAt?: string | null;
  };

  type AuthCredentials = {
    email: string;
    password: string;
  };

  interface ApiValidationErrors {
    name?: string;
    error: string;
    errors: Record<string, string>;
  }
  interface ApiResponse<T> {
    message?: string;
    data: T;
  }

  interface Window {
    appVersion: string;
  }
}

export {};
