import axios from "axios";

export async function post(url, values) {
  try {
    const response = await axios.post(url, values);
    return [null, response.data];
  } catch (err) {
    if (err.response) {
      const errorNew = err.response.data;
      const status = err.response.status;
      return [Object.assign(errorNew.error, { status }), null];
    }
    return [{ message: "Service Unavaible", status: 503 }, null];
  }
}

export async function get(url) {
  try {
    const response = await axios.get(url);
    return [null, response.data];
  } catch (err) {
    if (err.response) {
      const errorNew = err.response.data;
      const status = err.response.status;
      return [Object.assign(errorNew.error, { status }), null];
    }
    return [{ message: "Service Unavaible", status: 503 }, null];
  }
}

export default {
  post,
  get,
};
