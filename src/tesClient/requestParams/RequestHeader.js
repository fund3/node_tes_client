class RequestHeader {
  constructor({ clientId = undefined,
                senderCompId = undefined,
                accessToken = undefined,
                requestId = 0 }) {
    /**
     * @param clientId: (int) clientId assigned by Fund3.
     * @param senderCompId: (String) Unique uuid machine Id for TES to route
     *     messages to the correct recipient.
     * @param accessToken: (String) accessToken assigned by TES after
     *     authenticated with clientSecret.
     * @param requestId: (int) Optional id to link request and response.
    */
    if (clientId !== undefined) {
        this.clientId = clientId
    }
    if (senderCompId !== undefined) {
        this.senderCompId = senderCompId
    }
    if (accessToken !== undefined) {
        this.accessToken = accessToken
    }
    this.requestId = requestId;
  }
}

export default RequestHeader;
