# Omega NodeJS Client Library

Node JS implementation of client side functions for interfacing with the Fund3 Omega OEMS.

## Usage

The only class that will be used by the user is `Client.js`. A `Client` instance will be instantiated per clientId and used to communicate with Omega.  

## Messaging Patterns

Omega is designed with asynchronous communication for efficiency, hence the responses are not guaranteed to be received in order.  In addition, Omega automatically pushes balance updates and order execution status when updates are received from the exchange side, forming a two-way communication between the client and the server. 

There are two ways to attach callbacks to Omega responses:

 1. Request Id
    - If `requestIdCallback` is provided when sending a message, a one-time callback will be registered and fired when the `requestId` of the incoming message matches the `expectedRequestId` registered internally when the message was sent.  The callback will be deregistered right after being called. For example:
    ```
    client.sendLogonMessage({
        logonParams: new LogonParams({
            clientSecret: process.env.CLIENT_SECRET,
            credentials: client.accountCredentialsList
        }),
        requestIdCallback: logonAck => console.log(logonAck)
    })
    ```
    The callback will only fire when the response to this specific request is received and then unregistered.
 2. Response type
    - Alternatively, a `responseTypeCallback` can be registered to listen to responses of a specific type (e.g. the same callback will fire when `accountBalance` type messages are received).
    ```
    client.subscribeCallbackToResponseType({
        responseMessageBodyType: messageBodyTypes.ACCOUNT_DATA_REPORT,
        responseTypeCallback: accountDataReport => console.log(accountDataReport)
    })
    ```
    - The `responseTypeCallback` parameter in all `sendSomethingMessage` functions will be deprecated and should not be used.
    - Only one `responseTypeCallback` is allowed to be attached to each responseType at any given time; if new callbacks to the same type are registered without unsubscribing, the old callback will be unsubscribed and replaced with the new one.  Callbacks can be unsubscribed via:
    ```
    client.unsubscribeCallbackFromResponseType({
        responseMessageBodyType:messageBodyTypes.ACCOUNT_DATA_REPORT
    })
    ```
    
In the case that both callbacks are subscribed to a message, the `requestIdCallback` will be fired in response to the request that's sent from client side, and responseTypeCallback will be fired in response to messages sent from server side that are not triggered by a client request. 

## Methods
### Client Methods
- ready

  Arguments: None
  
  Returns a Promise indicating whether the client data (balances, openPositions and workingOrders) is updated and correctly populated from the exchange. If the promise is rejected, an object is returned with the error message and respective error values, e.g.
  ```
  {
    errorMessage: "Error occurred on some exchange accounts.",
    errorValues: [1234, 4321]
  }
  ```  
  Currently the only errorValue that will be sent is a list of erroneousAccountIds.
  
  Once Omega receives a `logon` message from the client, it responds with a `logonAck` message. If `logonAck.success` is true, the client will wait for `accountDataReport` for each account internally and update the status of `ready`, otherwise `ready` will block because no accountDataReport will be received.  Before `ready` resolves, the client state is not up to date; it is not advised to subscribe to any requestId or responseType before `ready` resolves.

- subscribeCallbackToResponseType
  
  Arguments:
  - responseMessageBodyType (constants.messageBodyTypes)
  - responseTypeCallback (function)
  
  Subscribes a callback to a specific message response type. At any given time, only one callback can be attached to one message response type.  If `subscribeCallbackToResponseType` is called when a callback is already attached to the response type, the old callback will be unsubscribed and the new one will be attached.
  
- unsubscribeCallbackFromResponseType
  
  Arguments:
  - responseMessageBodyType (constants.messageBodyTypes)
  
  Unsubscribes a callback that's currently attached to a response type. Returns true if the callback is unsubscribed; false if there was no callback registered in the first place.

### Client Requests

`requestHeader`, `requestIdCallback` are optional parameters to all client requests.  `responseTypeCallback` will be deprecated and it is not advised to pass it as a parameter. 

`requestHeader` object properties:
```
{   
    clientId: 87654321,  // Assigned by Fund3.
    senderCompId: "6da1aca2-22f9-445e-92f8-ebbdf031bb81",  // uuid in String format.
    accessToken: "Z2C3MmVkZ7AtYTd3IW00MjE3ETg3N1",  // Assigned by Omega on logon and authorizationRefresh
    requestId: 1001 
}
```
Currently, `clientId` and `senderCompId` are passed into `Client` constructor.  The client library handles the updates of `accessToken` and also generates `requestId` for all requests.  Features for user generated requestIds can be added later by request.  In most cases, it is anticipated that the default `requestHeader` in the `Client` class is used.

#### System Requests
- sendHeartbeatMessage
  
  Arguments:
  - requestHeader = this.defaultRequestHeader,
  - requestIdCallback = undefined,
  - responseTypeCallback = undefined
  
  Sends a `heartbeat` message to Omega.  
   
  Expected response type: `heartbeat`.

- sendTestMessage
  - requestHeader = this.defaultRequestHeader
  - testMessageParams
  - requestIdCallback = undefined
  - responseTypeCallback = undefined
  
  Sends a `test` message to Omega.
  
  Expected response type: `test`.
  
  Example `TestMessageParams` parameter object properties:
  ```
  {
      string: "test message",
  }
  ```

- sendGetServerTimeMessage
  - requestHeader = this.defaultRequestHeader,
  - requestIdCallback = undefined,
  - responseTypeCallback = undefined
  
  Sends a `getServerTime` request to Omega.
  
  Expected response type: `serverTime`.

#### Logon-Logoff Requests
- sendLogonMessage
  - requestHeader = this.defaultRequestHeader
  - logonParams
  - requestIdCallback = undefined
  - responseTypeCallback = undefined

  Expected response type: `logonAck`.

  Example `LogonParams` parameter object properties:
  ```
  {
      clientSecret: "exampleClientSecretToken",
      credentials: Array[AccountCredentials]
  }
  ```
  Example `AccountCredentials` object properties:
  ```
  {
      accountId: 12345678,
      apiKey: "apiKey",
      secretKey: "secretKey",
      passphrase = "passphrase" // Empty string for exchanges that do not use passphrases.
  }
  ```
  
  If `logon` is successful, `authorizationGrant` will be a property in `logonAck`. The internal logic in the client library code will update the `accessToken` within the `Client` object for authorization purpose.

- sendLogoffMessage
  - requestHeader = this.defaultRequestHeader
  - requestIdCallback = undefined
  - responseTypeCallback = undefined

  Expected response type: `logoffAck`.

#### Trading Requests
- sendPlaceSingleOrderMessage
  - requestHeader = this.defaultRequestHeader
  - placeOrderParams
  - requestIdCallback = undefined
  - responseTypeCallback = undefined
  
  Example `PlaceSingleOrderParams` object properties:
  ```
  {
      accountId = 12345678,  // Assigned by Fund3.
      clientOrderId = "clientOrderId",  // ID generated on the client side to keep track of the order.
      clientOrderLinkId = "clientOrderLinkId",  // Optional, used to group orders, e.g. orders being placed by a particular algorithm when multiple algos are trading on the same account.
      symbol = "BTC/USD",
      side = "buy",
      orderType = "limit",  // See OrderType in TradeMessage proto.
      quantity = 10.5,
      price = 1000.8,  //Optional, only required for limit, stopLossLimit, takeProfitLimit.
      stopPrice = undefined,  // Optional, only required for stopLoss, takeProfit, stopLossLimit, takeProfitLimit.
      timeInForce = "gtc",  // Optional, default to GTC, see TimeInForce in TradeMessage proto.
      expireAt = undefined,  // Optional, required for GTT only
      leverageType = undefined,  // Optional, default to None, see LeverageType in TradeMessage proto.
      leverage = undefined  // Optional, default to 0.
  }
  ```
  Expected response type: `executionReport`.
  
  Once a `placeSingleOrderMessage` is received, Omega responds with an `ExecutionReport` with an order status of `working`. Subsequently, when an event that changes the status of the order (e.g. order being `filled` or `rejected`), Omega sends an updated `executionReport` from server side without a client request.
  
- sendReplaceOrderMessage
  - requestHeader = this.defaultRequestHeader
  - replaceOrderParams
  - requestIdCallback = undefined
  - responseTypeCallback = undefined
  
  Example `ReplaceOrderParams` object properties:
  ```
  {
      accountId = 12345678,  // Assigned by Fund3.
      orderId = "orderId235Aasdf",  // OrderId coming back from Omega so that Omega can identify the desirable order to be replaced. 
      quantity = 5.5,  // Optional
      price = 5000.1,  // Optional
      stopPrice = 3000.0  // Optional
  }
  ```
  
  Expected response type: `executionReport`.
  
  Behavior of `sendReplaceOrderMessage`, if successfully received and validated (e.g. the order still exists and is not filled), is identical to that of `placeSingleOrderMessage`. 

- sendCancelOrderMessage
  - requestHeader = this.defaultRequestHeader
  - cancelOrderParams
  - requestIdCallback = undefined
  - responseTypeCallback = undefined

  Example `CancelOrderParams` object properties:
  ```
  { 
      accountId = 12345678,  // Assigned by Fund3.
      orderId = "orderId235Aasdf",  // OrderId coming back from Omega so that Omega can identify the desirable order to be cancelled. 
  }
  ```

  Expected response type: `executionReport`.
  
  Behavior of `sendCancelOrderMessage`, if successfully received and validated (e.g. the order still exists and is not filled), is different from that of `placeSingleOrderMessage` and `sendReplaceOrderMessage`; only one `executionReport` will come back with order status `canceled`. 
  
- sendGetOrderStatusMessage
  - requestHeader = this.defaultRequestHeader
  - getOrderStatusParams
  - requestIdCallback = undefined
  - responseTypeCallback = undefined

  Example `GetOrderStatusParams` object properties:
  ```
  { 
      accountId = 12345678,  // Assigned by Fund3.
      orderId = "orderId235Aasdf",  // OrderId coming back from Omega so that Omega can identify the desirable order to be fetched. 
  }
  ```

  Expected response type: `executionReport`.

#### Account Requests
- sendGetAccountDataMessage
  - requestHeader = this.defaultRequestHeader
  - getAccountDataParams
  - requestIdCallback = undefined
  - responseTypeCallback = undefined

  Example `GetAccountDataParams` object properties:
  ```
  { 
      accountId = 12345678,  // Assigned by Fund3.
  }
  ```

  Expected response type: `accountDataReport`.
  
- sendGetAccountBalancesMessage
  - requestHeader = this.defaultRequestHeader
  - getAccountBalancesParams
  - requestIdCallback = undefined
  - responseTypeCallback = undefined
  
  Example `GetAccountBalancesParams` object properties:
  ```
  { 
      accountId = 12345678,  // Assigned by Fund3.
  }
  ```

  Expected response type: `accountBalancesReport`.
  
- sendGetOpenPositionsMessage
  - requestHeader = this.defaultRequestHeader
  - getOpenPositionsParams
  - requestIdCallback = undefined
  - responseTypeCallback = undefined

  Example `GetOpenPositionsParams` object properties:
  ```
  { 
      accountId = 12345678,  // Assigned by Fund3.
  }
  ```

  Expected response type: `openPositionsReport`.

- sendGetWorkingOrdersMessage
  - requestHeader = this.defaultRequestHeader
  - getWorkingOrdersParams
  - requestIdCallback = undefined
  - responseTypeCallback = undefined

  Example `GetWorkingOrdersParams` object properties:
  ```
  { 
      accountId = 12345678,  // Assigned by Fund3.
  }
  ```

  Expected response type: `workingOrdersReport`.

- sendGetCompletedOrdersMessage
  - requestHeader = this.defaultRequestHeader
  - getCompletedOrdersParams
  - requestIdCallback = undefined
  - responseTypeCallback = undefined

  Example `GetCompletedOrdersParams` object properties:
  ```
  { 
      accountId = 12345678,  // Assigned by Fund3.
      count = undefined,  // Optional, number of returned orders (most recent ones).
      since = undefined  // Optional, UNIX timestamp, only the orders after this timestamp will be returned if it is set. 
  }
  ```
  If both 'count' and 'since' are omitted, orders for last 24h will be returned.

  Expected response type: `completedOrdersReport`.
  
- sendGetExchangePropertiesMessage
  - requestHeader = this.defaultRequestHeader
  - getExchangePropertiesParams
  - requestIdCallback = undefined
  - responseTypeCallback = undefined

  Example `GetExchangePropertiesParams` object properties:
  ```
  { 
      exchange = "kraken",  // See Exchange proto.
  }
  ```

  Expected response type: `exchangePropertiesReport`.
