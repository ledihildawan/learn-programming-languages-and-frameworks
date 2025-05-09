import React from "react";

const SignInLayout = ({ children }: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div>{children}</div>
  );
};

export default SignInLayout;