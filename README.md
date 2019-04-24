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
    - The `responseTypeCallback` parameter in all `sendSomethingMessage` functions will be deprecated and is not should not be used.
    - Only one `responseTypeCallback` is allowed to be attached to each responseType at any given time; if new callbacks to the same type are registered without unsubscribing, the old callback will be unsubscribed and replaced with the new one.  Callbacks can be unsubscribed via:
    ```
    client.unsubscribeCallbackFromResponseType({
        responseMessageBodyType:messageBodyTypes.ACCOUNT_DATA_REPORT
    })
    ```
    
In the case that both callbacks are subscribed to a message, the `requestIdCallback` will be fired in response to the request that's sent from the client side, and responseTypeCallback will be fired in response to messages sent from server side that are not triggered by a client request. 

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
#### System Requests
- sendHeartbeatMessage
  
  Arguments:
  - requestHeader = this.defaultRequestHeader,
  - requestIdCallback = undefined,
  - responseTypeCallback = undefined
  
  Sends a `heartbeat` message to Omega.  
   
  Expected response type: `heartbeat`.
  
  `heartbeat` message content:
  ```
  {}
  ```
    
- sendTestMessage
  - requestHeader = this.defaultRequestHeader
  - testMessageParams
  - requestIdCallback = undefined
  - responseTypeCallback = undefined
  
  Sends a `test` message to Omega.
  
  Expected response type: `test`.
  
  `test` message content:
  ```
  {string: "test message"}
  ```

- sendGetServerTimeMessage
  - requestHeader = this.defaultRequestHeader,
  - requestIdCallback = undefined,
  - responseTypeCallback = undefined
  
  Sends a `getServerTime` request to Omega.

#### Logon-Logoff Requests
- sendLogonMessage = ({
        requestHeader = this.defaultRequestHeader,
        logonParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    })
- sendLogoffMessage = ({
        requestHeader = this.defaultRequestHeader,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    })
    
#### Trading Requests
- sendPlaceSingleOrderMessage = ({
        requestHeader = this.defaultRequestHeader,
        placeOrderParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    })
- sendReplaceOrderMessage = ({
        requestHeader = this.defaultRequestHeader,
        replaceOrderParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    })
- sendCancelOrderMessage = ({
        requestHeader = this.defaultRequestHeader,
        cancelOrderParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    })
- sendGetOrderStatusMessage = ({
        requestHeader = this.defaultRequestHeader,
        getOrderStatusParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    })

#### Account Requests
- sendGetAccountDataMessage = ({
        requestHeader = this.defaultRequestHeader,
        getAccountDataParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    })
- sendGetAccountBalancesMessage = ({
        requestHeader = this.defaultRequestHeader,
        getAccountBalancesParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    })
- sendGetOpenPositionsMessage = ({
        requestHeader = this.defaultRequestHeader,
        getOpenPositionsParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    })
- sendGetWorkingOrdersMessage = ({
        requestHeader = this.defaultRequestHeader,
        getWorkingOrdersParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    })
- sendGetCompletedOrdersMessage = ({
        requestHeader = this.defaultRequestHeader,
        getCompletedOrdersParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    })
- sendGetExchangePropertiesMessage = ({
        requestHeader = this.defaultRequestHeader,
        getExchangePropertiesParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    })
