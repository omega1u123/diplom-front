interface LocalStorageData {
  accessToken?: string;
  refreshToken?: string;
  login?: string;
}

export const saveToLocalStorage = (data: LocalStorageData) => {
  if (data.accessToken) {
    localStorage.setItem('accessToken', data.accessToken);
  }
  if (data.refreshToken) {
    localStorage.setItem('refreshToken', data.refreshToken);
  }
  if (data.login) {
    localStorage.setItem('login', data.login);
  }
};

export const removeFromLocalStorage = (keys: string[]) => {
  keys.forEach((key) => {
    localStorage.removeItem(key);
  });
};
