import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma"

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.hashedPassword) return null

        const valid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!valid) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // 初回ログイン時（userが存在する時）にトークンにユーザー情報を追加
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // セッションにユーザーIDを追加
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
  },
})

export { handler as GET, handler as POST }
