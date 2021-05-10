// return the user data from the session storage
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
}

// return the token from the session storage
export const getToken = () => {
  return localStorage.getItem('token') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

// set the token and user from the session storage
export const setUserSession = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

// set the token and user from the session storage
export const setToken = (token) => {
  localStorage.setItem('token', token);
}



export const setPlayers = (players) => {

    localStorage.setItem('players', JSON.stringify(players));

}

export const getPlayers = () => {
  console.log(localStorage.getItem('players'))
  return localStorage.getItem('players') || null;
}

export const setSoyAdmin = (soy) => {

  localStorage.setItem('soyAdmin', soy);

}

export const getSoyAdmin = () => {
  console.log(localStorage.getItem('soyAdmin'))
  return localStorage.getItem('soyAdmin') || null;
}