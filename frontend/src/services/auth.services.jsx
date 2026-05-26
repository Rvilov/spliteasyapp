const loginUser = (email, password) => {
  return fetch(`${import.meta.env.VITE_URL_API}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
    }),

    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export { loginUser };

const registerUser = (email, name, password) => {
  return fetch(`${import.meta.env.VITE_URL_API}/api/auth/register`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),

    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export { registerUser };
