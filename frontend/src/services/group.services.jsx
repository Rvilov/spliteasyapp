const groupsService = () => {
  return fetch(`${import.meta.env.VITE_URL_API}/api/groups/vergrupos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export { groupsService };

const createGroupService = (name) => {
  return fetch(`${import.meta.env.VITE_URL_API}/api/groups/creargrupo`, {
    method: 'POST',
    body: JSON.stringify({
      name: name,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export { createGroupService };

const agregarGastoService = (groupId, amount, description) => {
  return fetch(
    `${import.meta.env.VITE_URL_API}/api/groups/${groupId}/registrargasto`,
    {
      method: 'POST',
      body: JSON.stringify({
        amount: amount,
        description: description,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export { agregarGastoService };

const verGrupoService = (id) => {
  return fetch(`${import.meta.env.VITE_URL_API}/api/groups/groupdetail/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export { verGrupoService };

const verGastosGrupoService = (id) => {
  return fetch(`${import.meta.env.VITE_URL_API}/api/groups/${id}/vergastos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export { verGastosGrupoService };

const calcularBalance = (id) => {
  return fetch(`${import.meta.env.VITE_URL_API}/api/groups/${id}/balance`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export { calcularBalance };

const obtenerTokenGrupo = (id) => {
  return fetch(`${import.meta.env.VITE_URL_API}/api/groups/${id}/invite`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export { obtenerTokenGrupo };

const joinGroupService = (groupToken) => {
  return fetch(
    `${import.meta.env.VITE_URL_API}/api/groups/join/${groupToken}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export { joinGroupService };

const saldarDeudaService = (groupId, settlementId) => {
  return fetch(
    `${import.meta.env.VITE_URL_API}/api/groups/${groupId}/settlements/${settlementId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export { saldarDeudaService };
