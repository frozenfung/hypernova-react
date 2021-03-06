Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderReactStatic = exports.renderReact = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _hypernova = require('hypernova');

var _hypernova2 = _interopRequireDefault(_hypernova);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var renderReact = exports.renderReact = function renderReact(name, component) {
  return (0, _hypernova2['default'])({
    server: function () {
      function server() {
        return function (props) {
          var contents = _server2['default'].renderToString(_react2['default'].createElement(component, props));
          return (0, _hypernova.serialize)(name, contents, props);
        };
      }

      return server;
    }(),
    client: function () {
      function client() {
        var payloads = (0, _hypernova.load)(name);

        if (payloads) {
          payloads.map(function (payload) {
            var node = payload.node;
            var data = payload.data;

            var element = _react2['default'].createElement(component, data);
            _reactDom2['default'].render(element, node);
          });
        }

        return component;
      }

      return client;
    }()
  });
};

var renderReactStatic = exports.renderReactStatic = function renderReactStatic(name, component) {
  return (0, _hypernova2['default'])({
    server: function () {
      function server() {
        return function (props) {
          return _server2['default'].renderToStaticMarkup(_react2['default'].createElement(component, props));
        };
      }

      return server;
    }(),
    client: function () {
      function client() {}

      return client;
    }()
  });
};