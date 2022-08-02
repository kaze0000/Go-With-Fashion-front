import React, {
  Dispatch,
  SetStateAction,
  createContext,
  ReactNode,
  useState,
} from "react";
import { User } from "../type/api/User";

import axios from "axios";

// export type LoginUserContextType = {
//   loginUser: User | null;
//   setLoginUser: Dispatch<SetStateAction<User | null>>;
// };

// export const LoginUserContext = createContext<LoginUserContextType>(
//   {} as LoginUserContextType
// );

// export const LoginUserProvider = (props: { children: ReactNode }) => {
//   const { children } = props;
//   const [loginUser, setLoginUser] = useState<User | null>(null);

//   return (
//     <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
//       {children}
//     </LoginUserContext.Provider>
//   );
// };
