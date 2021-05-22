export function getAPI<T>(endpoint: string, queryObject: object | null, apiDescription: string | null, callBackFunc: (response: T) => void) {
  const url = new URL(`${process.env.BACKEND_URL}/${endpoint}`);
  if (queryObject) {
    for (const [key, value] of Object.entries(queryObject)) {
      url.searchParams.append(key, value);
    }
  }

  fetch(url.href)
  .then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  })
  .then((parsedResponse: T) => {
    callBackFunc(parsedResponse);
  })
  .catch((err) => {
    if (apiDescription) {
      console.error(`Error on ${apiDescription}`);
    }
    console.error(err);
  });
}

export function postJsonAPI(endpoint: string, data: object, apiDescription: string | null, callBackFunc: (response: Response) => void) {
  fetch(`${process.env.BACKEND_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    callBackFunc(response);
  })
  .catch((err) => {
    if (apiDescription) {
      console.error(`Error on ${apiDescription}`);
    }
    console.error(err);
  });
}

export function postFormDataAPI(endpoint: string, formData: FormData, apiDescription: string | null, callBackFunc: (response: Response) => void) {
  fetch(`${process.env.BACKEND_URL}/${endpoint}`, {
    method: 'POST',
    body: formData,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    callBackFunc(response);
  })
  .catch((err) => {
    if (apiDescription) {
      console.error(`Error on ${apiDescription}`);
    }
    console.error(err);
  });
}
