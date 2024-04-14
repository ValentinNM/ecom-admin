import Layout from "@/components/layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const {
    data: session = {}
  } = useSession();

  // console.log({session});
  
  if (!session) return
  // console.log({session});
  
  const { user: {
    name = "",
    email = "",
    image = "",
  } = {} } = session;

  return (
    <Layout>
      <div className="text-red-900 flex justify-between">
        <h2>Welcome, <b>{name}</b></h2>
        <div className="flex gap-1 bg-gray-400 text-black rounded-lg items-center">
          <img
            className="h-10 w-10 rounded-l-lg"
            src={image}
            alt="user-profile-picture">
          </img>
          <span className="px-2">{name}</span>
        </div>
      </div>
    </Layout>
  )
}
