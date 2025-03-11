"use client";

import { login } from "@/utils/auth";

const page = () => {

  return (
    <>
      <div>Page</div>
      <button onClick={() => login()}>Click here</button>
    </>
  )
}

export default page
