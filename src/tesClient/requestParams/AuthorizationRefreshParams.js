class AuthorizationRefreshParams {
  constructor({ refreshToken }) {
    /**
     * @param refreshToken: (String) refreshToken to refresh auth on TES.
    */
    this.refreshToken = refreshToken;
  }
}

export default AuthorizationRefreshParams;
