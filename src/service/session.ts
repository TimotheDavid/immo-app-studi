const TOKEN_KEY = "token";

function getToken(): string {
  const token = sessionStorage.getItem(TOKEN_KEY);
  if (token == null) {
    return "";
  }
  return token;
}

function createToken(token: string): string {
  if (sessionStorage.getItem(TOKEN_KEY)) {
    return sessionStorage.getItem(TOKEN_KEY) ?? " ";
  }
  sessionStorage.setItem(TOKEN_KEY, token);
  return "";
}

export { getToken, createToken };
