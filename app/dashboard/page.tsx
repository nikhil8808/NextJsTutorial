import React from 'react'
import { currentUser } from "@clerk/nextjs/server";

const Dashboard = async () => {
      const user = await currentUser();
  return (
      <div className="p-6">
      <h1 className="text-xl font-bold">
        Welcome {user?.firstName}
      </h1>
    </div>
  )
}

export default Dashboard