import { useSession, signIn, signOut } from "next-auth/react";
require('dotenv').config();

export default function Home() {

  const { data: session } = useSession();

  console.info('session', session);

  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
          className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-md"
          onClick={() => signIn('google')}
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-red-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <h1 className="text-white text-4xl">Welcome {session.user.email}</h1>
          <button
            onClick={() => signOut()}
            className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-md"
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
