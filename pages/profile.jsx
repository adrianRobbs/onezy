import axios from "axios";
import React, { useEffect } from "react";

function Profile({ userID }) {
  return (
    <>
      <h1>Profile user is {userID}</h1>
    </>
  );
}

export default Profile;

export async function getServerSideProps(ctx) {
  const { signedCookies = {} } = ctx.req;

  if (signedCookies["__session"] == undefined) {
    return {
      redirect: {
        statusCode: 302,
        destination: "/login",
      },
    };
  }

  return {
    props: {
      userID: signedCookies["__session"].name,
    },
  };
}
