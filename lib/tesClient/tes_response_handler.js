"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tes_connection = require("../../lib/tes_client/tes_connection");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TesResponseHandler =
/*#__PURE__*/
function () {
  function TesResponseHandler() {
    _classCallCheck(this, TesResponseHandler);
  }

  _createClass(TesResponseHandler, [{
    key: "heartbeatHandler",
    // system
    value: function heartbeatHandler() {
      console.log('received heartbeat');
    }
  }, {
    key: "testHandler",
    value: function testHandler(message) {
      console.log(message);
    }
  }, {
    key: "systemHandler",
    value: function systemHandler(_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          errorCode = _ref2[0],
          message = _ref2[1];

      console.log(errorCode, message);
    } // logon-logoff

  }, {
    key: "logonAckHandler",
    value: function logonAckHandler(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 3),
          success = _ref4[0],
          message = _ref4[1],
          clientAccounts = _ref4[2];

      console.log(success, message, clientAccounts);
    }
  }, {
    key: "logoffAckHandler",
    value: function logoffAckHandler(_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          success = _ref6[0],
          message = _ref6[1];

      console.log(success, message);
    } // trading

  }, {
    key: "executionReportHandler",
    value: function executionReportHandler(_ref7) {
      var _ref8 = _slicedToArray(_ref7, 17),
          orderID = _ref8[0],
          clientOrderID = _ref8[1],
          clientOrderLinkID = _ref8[2],
          exchangeOrderID = _ref8[3],
          accountInfo = _ref8[4],
          symbol = _ref8[5],
          side = _ref8[6],
          orderType = _ref8[7],
          quantity = _ref8[8],
          price = _ref8[9],
          timeInForce = _ref8[10],
          leverageType = _ref8[11],
          leverage = _ref8[12],
          orderStatus = _ref8[13],
          filledQuantity = _ref8[14],
          avgFillPrice = _ref8[15],
          rejectionReason = _ref8[16];

      console.log(orderID, clientOrderID, clientOrderLinkID, exchangeOrderID, accountInfo, symbol, side, orderType, quantity, price, timeInForce, leverageType, leverage, orderStatus, filledQuantity, avgFillPrice, rejectionReason);
    }
  }, {
    key: "accountDataReportHandler",
    value: function accountDataReportHandler(_ref9) {
      var _ref10 = _slicedToArray(_ref9, 4),
          accountInfo = _ref10[0],
          balances = _ref10[1],
          openPositions = _ref10[2],
          orders = _ref10[3];

      console.log(accountInfo, balances, openPositions, orders);
    }
  }, {
    key: "accountBalancesReportHandler",
    value: function accountBalancesReportHandler(_ref11) {
      var _ref12 = _slicedToArray(_ref11, 2),
          accountInfo = _ref12[0],
          balances = _ref12[1];

      console.log(balances);
    }
  }, {
    key: "openPositionsReportHandler",
    value: function openPositionsReportHandler() {}
  }, {
    key: "workingOrdersReport",
    value: function workingOrdersReport() {}
  }, {
    key: "completedOrdersReport",
    value: function completedOrdersReport() {}
  }, {
    key: "exchangePropertiesReport",
    value: function exchangePropertiesReport() {}
  }]);

  return TesResponseHandler;
}();

var tesResponseCallbackObject = (0, _tes_connection.messageHandlerCallbackObjectFactory)({
  heartbeatHandler: function heartbeatHandler() {
    return console.log("Overrode heartbeat handler!");
  },
  logonAckHandler: function logonAckHandler() {
    return console.log("Overrode logonAck handler!");
  },
  accountBalancesReportHandler: function accountBalancesReportHandler() {
    return console.log("Overrode accountBalancesReport handler!");
  }
});
var _default = TesResponseHandler;
exports.default = _default;