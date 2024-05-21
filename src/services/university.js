const get = (country = 'United Arab Emirates') => {
  const url = `${import.meta.env.VITE_UNIVERSITY_SERVICE_BASE_URL}/search?country=${country}`
  return fetch(url).then((res) => res.json());
}

export {
  get,
}