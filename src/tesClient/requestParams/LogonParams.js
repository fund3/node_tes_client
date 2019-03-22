class LogonParams {
  constructor({ clientSecret, credentials }) {
    /**
     * @param clientSecret: (String) clientSecret token assigned by Fund3.
     * @param credentials: (Array[AccountCredentials]) Array of
     *     AccountCredentials for exchange accounts.
    */
    this.clientSecret = clientSecret;
    this.credentials = credentials;
  }
}

export default LogonParams;
