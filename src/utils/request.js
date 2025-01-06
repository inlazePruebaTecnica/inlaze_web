const request = async (
  endpoint,
  token = null,
  options = {
    method: "GET",
  }
) => {
  try {
    let url = "http://localhost:3010/api/" + endpoint;

    let headers = {
      "Content-type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const res = await fetch(url, {
      headers,
      mode: "cors",
      ...options,
    });
    const req = await res.json();
    return req;
  } catch (error) {
    console.log(error);
    return { error: "Error en la petición" };
  }
};

export default request;
