import axios from "axios";
import React, { useEffect } from "react";
import { getUser } from "../lib/auth";

function Profile({ user }) {
  console.log(user);

  return (
    <>
      <h1>Profile of {user.name}</h1>
    </>
  );
}

export default Profile;

function isCookie(headers, name) {
  const { cookie = {} } = headers;
  if (Object.keys(cookie).length < 1) return undefined;
  else {
    const result = cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return result[0].split("=")[0];
  }
}

export async function getServerSideProps(ctx) {
  const cookN = isCookie(ctx.req.headers, "access");

  if (cookN != undefined) ssr = "using cookies";

  if (result.userID == undefined) {
    // method 1
    // ctx.res.writeHead(307, {
    //   location: "https://exp-next.web.app/login",
    // });
    // ctx.res.end();

    // method 2
    return {
      redirect: {
        statusCode: 307,
        destination: "/login",
      },
    };
  }

  return {
    props: {
      userID: result.userID,
    },
  };
}
