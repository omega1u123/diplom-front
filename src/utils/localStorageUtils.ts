interface LocalStorageData {
  accessToken?: string;
  refreshToken?: string;
}

export const saveToLocalStorage = (data: LocalStorageData) => {
  if (data.accessToken) {
    localStorage.setItem("accessToken", data.accessToken);
  }
  if (data.refreshToken) {
    localStorage.setItem("refreshToken", data.refreshToken);
  }
};

export const removeFromLocalStorage = (keys: string[]) => {
  keys.forEach((key) => {
    localStorage.removeItem(key);
  });
};
