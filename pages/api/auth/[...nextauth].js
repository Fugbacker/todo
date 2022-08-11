import NextAuth from "next-auth/next"
import CredentialProvider from "next-auth/providers/credentials"

export default NextAuth ({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "Name"},
        password: { label: "Password", type: "Password"},
      },
      authorize: (credentials) => {
        if (credentials.username === 'admin1' && credentials.password === '321') {
          return {
            id: 2,
            name: 'admin',
            email: 'admin@admin.ru'
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id === user.id
      }
      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id === token.id
      }
      return session
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  }
})