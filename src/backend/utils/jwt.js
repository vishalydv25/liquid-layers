const base64UrlEncode = (value) => {
  return btoa(JSON.stringify(value))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const base64UrlDecode = (value) => {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
};

export const sign = (payload) => {
  const header = {
    alg: 'none',
    typ: 'JWT',
  };

  return `${base64UrlEncode(header)}.${base64UrlEncode(payload)}.`;
};

export const verify = (token) => {
  if (!token) {
    throw new Error('Invalid token');
  }

  const parts = token.split('.');

  if (parts.length !== 3) {
    throw new Error('Invalid token');
  }

  return base64UrlDecode(parts[1]);
};