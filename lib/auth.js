import axios from "axios";

const WINDOW_USER_SCRIPT_VARIABLE = "__USER__";

export const getUserScript = (user) => {
  return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)}`;
};

export const getServerSideToken = (req) => {
  const { signedCookies = {} } = req;

  if (!signedCookies) {
    return {};
  } else if (!signedCookies.access) {
    return {};
  }
  return { userID: signedCookies.access.id };
};

export const loginUser = async (values) => {
  try {
    const { data } = await axios.post("/api/login", values);
    return data;
  } catch (err) {
    if (err.response) {
      const { data, status, headers } = err.response;
      return data;
    }
  }
};

export const getUser = async (url) => {
  try {
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  } catch (err) {
    if (err.response) {
      const { data, status, headers } = err.response;
      return data;
    }
  }
};

export const fetchSSR = async (url, ctx) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        cookie: ctx.req.headers.cookie,
      },
      withCredentials: true,
    });
    return data;
  } catch (err) {
    if (err.response) {
      const { data, status, headers } = err.response;
      return data;
    }
  }
};
