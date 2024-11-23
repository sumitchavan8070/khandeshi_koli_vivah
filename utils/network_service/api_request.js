import axios from "axios";
import APIEndPoints from "./api_endpoints";

const apiClient = axios.create({
  baseURL: APIEndPoints.live,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// GET request function
export const getRequest = async (apiEndPoint) => {
  try {
    console.log(
      `^^^^^^^^^^^^^^^^^^ ${apiEndPoint} getRequest Start ^^^^^^^^^^^^^^^^^^`
    );

    const response = await apiClient.get(apiEndPoint);

    console.log(
      `^^^^^^^^^^^^^^^^^^ ${apiEndPoint} getRequest End ^^^^^^^^^^^^^^^^^^`
    );

    if (response.status !== 200) {
      throw new Error(`Failed to load data: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error(`Error in GET request to ${apiEndPoint}:`, error);
    throw error;
  }
};

export const getRequestWithParams = async (apiEndPoint, params = {}) => {
  try {
    console.log(
      `^^^^^^^^^^^^^^^^^^ ${apiEndPoint} getRequest Start ^^^^^^^^^^^^^^^^^^`
    );

    // Pass params to the GET request
    const response = await apiClient.get(apiEndPoint, { params });

    console.log(
      `^^^^^^^^^^^^^^^^^^ ${apiEndPoint} getRequest End ^^^^^^^^^^^^^^^^^^`
    );

    if (response.status !== 200) {
      throw new Error(`Failed to load data: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error(`Error in GET request to ${apiEndPoint}:`, error);
    throw error;
  }
};

// POST request function
export const postRequest = async (apiEndPoint, postData, formData = null) => {
  try {
    console.log(
      `~~~~~~~~~~~~~~~~~~~~ ${apiEndPoint} postRequest Start ~~~~~~~~~~~~~~~~~~~~ `
    );
    console.log(
      `~~~~~~~~~~~~~~~~~~~~ ${apiEndPoint} postRequest postData`,
      postData
    );

    const response = await apiClient.post(apiEndPoint, postData);

    console.log(
      `~~~~~~~~~~~~~~~~~~~~ ${apiEndPoint} postRequest End ~~~~~~~~~~~~~~~~~~~~   `
    );

    return response.data;
  } catch (error) {
    console.error(`Error in POST request to ${apiEndPoint}:`, error);
    throw error; // Rethrow to handle in calling function
  }
};
