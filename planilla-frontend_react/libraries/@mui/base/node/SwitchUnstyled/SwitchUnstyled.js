"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _useSwitch = _interopRequireDefault(require("./useSwitch"));

var _switchUnstyledClasses = _interopRequireDefault(require("./switchUnstyledClasses"));

var _appendOwnerState = _interopRequireDefault(require("../utils/appendOwnerState"));

var _resolveComponentProps = _interopRequireDefault(require("../utils/resolveComponentProps"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["checked", "className", "component", "components", "componentsProps", "defaultChecked", "disabled", "onBlur", "onChange", "onFocus", "onFocusVisible", "readOnly", "required"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * The foundation for building custom-styled switches.
 *
 * Demos:
 *
 * - [Switch](https://mui.com/base/react-switch/)
 *
 * API:
 *
 * - [SwitchUnstyled API](https://mui.com/base/api/switch-unstyled/)
 */
const SwitchUnstyled = /*#__PURE__*/React.forwardRef(function SwitchUnstyled(props, ref) {
  var _ref, _components$Thumb, _components$Input, _components$Track;

  const {
    checked: checkedProp,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp
  } = props,
        otherProps = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const useSwitchProps = {
    checked: checkedProp,
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp
  };
  const {
    getInputProps,
    checked,
    disabled,
    focusVisible,
    readOnly
  } = (0, _useSwitch.default)(useSwitchProps);
  const ownerState = (0, _extends2.default)({}, props, {
    checked,
    disabled,
    focusVisible,
    readOnly
  });
  const stateClasses = (0, _clsx.default)(checked && _switchUnstyledClasses.default.checked, disabled && _switchUnstyledClasses.default.disabled, focusVisible && _switchUnstyledClasses.default.focusVisible, readOnly && _switchUnstyledClasses.default.readOnly);
  const Root = (_ref = component != null ? component : components.Root) != null ? _ref : 'span';
  const rootComponentProps = (0, _resolveComponentProps.default)(componentsProps.root, ownerState);
  const rootProps = (0, _appendOwnerState.default)(Root, (0, _extends2.default)({}, otherProps, rootComponentProps, {
    className: (0, _clsx.default)(_switchUnstyledClasses.default.root, stateClasses, className, rootComponentProps == null ? void 0 : rootComponentProps.className)
  }), ownerState);
  const Thumb = (_components$Thumb = components.Thumb) != null ? _components$Thumb : 'span';
  const thumbComponentProps = (0, _resolveComponentProps.default)(componentsProps.thumb, ownerState);
  const thumbProps = (0, _appendOwnerState.default)(Thumb, (0, _extends2.default)({}, thumbComponentProps, {
    className: (0, _clsx.default)(_switchUnstyledClasses.default.thumb, thumbComponentProps == null ? void 0 : thumbComponentProps.className)
  }), ownerState);
  const Input = (_components$Input = components.Input) != null ? _components$Input : 'input';
  const inputComponentProps = (0, _resolveComponentProps.default)(componentsProps.input, ownerState);
  const inputProps = (0, _appendOwnerState.default)(Input, (0, _extends2.default)({}, getInputProps(), inputComponentProps, {
    className: (0, _clsx.default)(_switchUnstyledClasses.default.input, inputComponentProps == null ? void 0 : inputComponentProps.className)
  }), ownerState);
  const Track = components.Track === null ? () => null : (_components$Track = components.Track) != null ? _components$Track : 'span';
  const trackComponentProps = (0, _resolveComponentProps.default)(componentsProps.track, ownerState);
  const trackProps = (0, _appendOwnerState.default)(Track, (0, _extends2.default)({}, trackComponentProps, {
    className: (0, _clsx.default)(_switchUnstyledClasses.default.track, trackComponentProps == null ? void 0 : trackComponentProps.className)
  }), ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Root, (0, _extends2.default)({
    ref: ref
  }, rootProps, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Track, (0, _extends2.default)({}, trackProps)), /*#__PURE__*/(0, _jsxRuntime.jsx)(Thumb, (0, _extends2.default)({}, thumbProps)), /*#__PURE__*/(0, _jsxRuntime.jsx)(Input, (0, _extends2.default)({}, inputProps))]
  }));
});
process.env.NODE_ENV !== "production" ? SwitchUnstyled.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the component is checked.
   */
  checked: _propTypes.default.bool,

  /**
   * Class name applied to the root element.
   */
  className: _propTypes.default.string,

  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component: _propTypes.default.elementType,

  /**
   * The components used for each slot inside the Switch.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .shape({
    Input: _propTypes.default.elementType,
    Root: _propTypes.default.elementType,
    Thumb: _propTypes.default.elementType,
    Track: _propTypes.default.oneOfType([_propTypes.default.elementType, _propTypes.default.oneOf([null])])
  }),

  /**
   * The props used for each slot inside the Switch.
   * @default {}
   */
  componentsProps: _propTypes.default.shape({
    input: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    thumb: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    track: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),

  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: _propTypes.default.bool,

  /**
   * If `true`, the component is disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * @ignore
   */
  onBlur: _propTypes.default.func,

  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: _propTypes.default.func,

  /**
   * @ignore
   */
  onFocus: _propTypes.default.func,

  /**
   * @ignore
   */
  onFocusVisible: _propTypes.default.func,

  /**
   * If `true`, the component is read only.
   */
  readOnly: _propTypes.default.bool,

  /**
   * If `true`, the `input` element is required.
   */
  required: _propTypes.default.bool
} : void 0;
var _default = SwitchUnstyled;
exports.default = _default;