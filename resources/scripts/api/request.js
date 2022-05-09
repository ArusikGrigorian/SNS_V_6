const request = async (url, method, requiredData) => {
  let response;

  //fetching data
  try {
    if (requiredData instanceof FormData) {
      response = await fetch(url, {
        method,
        headers: {},
        body: requiredData,
      });
    } else {
      response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requiredData),
      });
    }

    //getting data json
    const data = await response.json();

    //checking data status
    if (data.success) {
      return {
        success: true,
        ...data,
      };
    } else {
      return {
        success: false,
        ...data,
      };
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

export default request;
