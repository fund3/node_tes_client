class RequestHeader {
  constructor({ clientId,
                senderCompId,
                accessToken = undefined,
                // RequestID defaults to -1 to prevent acting on unintentional
                // messages with TES default requestId = 0.
                requestId = -1 }) {
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
