import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt"
declare module "next-auth" {
    interface User {
        name: string
    }
    interface Session {
        user: {
            name: string
        },
    }
    interface JWT {
        /** OpenID ID Token */
        idToken?: string
    }
}