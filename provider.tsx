"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Userdetails } from "./types";
import { UserContext } from "./context/UserContext";

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  const [userDetail, setuserdetail] = useState<any>();

  const checkUserAndAddToDb = async () => {
    const result = await axios.post("/api/users");
    setuserdetail(result.data);
    console.log(result.data);
  };
  useEffect(() => {
    user && checkUserAndAddToDb();
  }, [user]);

  return (
    <div>
      <UserContext.Provider value={{ userDetail, setuserdetail }}>
        {children}
      </UserContext.Provider>
    </div>
  );
}

export default Provider;
