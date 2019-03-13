class RequestHeader {
  constructor({ clientId,
                senderCompId,
                accessToken = undefined,
                // TES default requestId = 0.
                requestId = 0 }) {
    /**
     * @param clientId: (int) clientId assigned by Fund3.
     * @param senderCompId: (String) Unique uuid machine Id for TES to route
     *     messages to the correct recipient.
     * @param accessToken: (String) accessToken assigned by TES after
     *     authenticated with clientSecret.
     * @param requestId: (int) Optional id to link request and response.
    */
    this.clientID = clientId;
    this.senderCompID = senderCompId;
    this.accessToken = accessToken;
    this.requestID = requestId;
  }
}

export default RequestHeader;
