const api_prod = import.meta.env.PUBLIC_PROD_API_URL;
const api_dev = import.meta.env.PUBLIC_DEV_API_URL;
const api_url = import.meta.env.MODE == 'production' ? api_prod : api_dev;

export async function sendData(data: MainFormData) {
  try {
    const response = await fetch(api_url + 'main', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return { success: true, data: result };
  } catch (error: any) {
    console.error('There was a problem with the fetch operation:', error);
    return { success: false, error: error.message };
  }
}

export async function updateData(data: SubMainFormData) {
  //console.log('hello from request')
  //console.log('data', data)
  try {
    const response = await fetch(api_url + 'update_sub_table', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    console.log('update result data', result);
    return { success: true, data: result };
  } catch (error: any) {
    console.error('There was a problem with the update operation:', error);
    return { success: false, error: error.message };
  }
}

export const getCategories = async () => {
  try {
    const response = await fetch(api_url + 'main-category');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getInfo = async (url: string) => {
  try {
    const response = await fetch(api_url + 'info?url=' + url);
    const data = await response.json();
    //const base64Image = data.data.image
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getMain = async () => {
  try {
    const response = await fetch(api_url + 'main');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getSubCategories = async () => {
  try {
    const response = await fetch(api_url + 'sub-category');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getProviders = async () => {
  try {
    const response = await fetch(api_url + 'providers');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
