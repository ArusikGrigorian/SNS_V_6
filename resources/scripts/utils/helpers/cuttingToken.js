const cutToken = (token) => {
  const tokenIndex = token.indexOf("|");
  return token.substring(tokenIndex + 1);
};

export default cutToken;
