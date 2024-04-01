import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const options = {
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET
}

console.info('options', options);


export default NextAuth({
  providers: [
    GoogleProvider({
      ...options
    })
  ]
})