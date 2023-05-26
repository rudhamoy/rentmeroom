// import NextAuth from "next-auth"
// import GithubProvider from "next-auth/providers/github"
// import CredentialProvider from "next-auth/providers/credentials";
// import type { NextAuthOptions } from "next-auth";

// const MINUTE = 60;
// const HOUR = 60 * MINUTE;

// export const authOptions: NextAuthOptions = {
//     providers: [

//     ],
//     callbacks: {
//         async jwt({ token, account }) {
//             if (account) {
//                 token.accessToken = account.access_token
//             }
//             return token
//         },
//         async session({session, token, user}){
//             session.accessToken = token.accessToken
//             return session
//         }
//     }
// }

// export default NextAuth(authOptions)