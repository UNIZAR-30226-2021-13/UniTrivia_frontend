// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
}

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
}

// set the token and user from the session storage
export const setUserSession = (token, user) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
}

// set the token and user from the session storage
export const setToken = (token) => {
  sessionStorage.setItem('token', token);
}



export const setPlayers = (players) => {

  sessionStorage.setItem('players', JSON.stringify(players));

}

export const getPlayers = () => {
  console.log(sessionStorage.getItem('players'))
  return sessionStorage.getItem('players') || null;
}

export const setSoyAdmin = (soy) => {

  sessionStorage.setItem('soyAdmin', soy);

}

export const getSoyAdmin = () => {
  console.log(sessionStorage.getItem('soyAdmin'))
  return sessionStorage.getItem('soyAdmin') || null;
}