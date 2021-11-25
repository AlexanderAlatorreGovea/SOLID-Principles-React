import axios from "axios";

// with dependency inversion

// domain/ApiClient.ts
export interface ApiClient {
  createUser: (user: User) => Promise<void>;
  getUserByEmail: (email: string) => Promise<User>;
}

export function HttpClient(): ApiClient {
  return {
    createUser: async (user: User) => {
      return axios.post();
    },
    getUserByEmail: async (email: string) => {
      return axios.get();
    },
  };
}

//user ApiClient abstraction here

const SignUpService =
  (client: ApiClient) => async (email: string, password: string) => {
    const existingUser = await client.getUserByEmail(email);

    if (existingUser) {
      throw new Error("Email already used");
    }

    return client.createUser({
      email,
      password,
    });
  };

//we can use the new implementation like so
const signup = SignUpService(HttpClient());
signup("bob@bob.com", "");

// infra
// export const HttpClient = {
//   createUser: async (_user: User) => {
//     return axios.post();
//   },
//   getUserByEmail: async (_email: string) => axios.get(),
// };

// domain/SignUpService.ts

// export async function signup(email: string, password: string) {
//   const existingUser = await HttpClient.getUserByEmail(email);

//   if (existingUser) {
//     throw new Error("Email already used");
//   }

//   return HttpClient.createUser({
//     email,
//     password,
//   });
// }
