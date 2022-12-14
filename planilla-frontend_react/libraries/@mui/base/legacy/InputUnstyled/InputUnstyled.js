import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import appendOwnerState from '../utils/appendOwnerState';
import isHostComponent from '../utils/isHostComponent';
import resolveComponentProps from '../utils/resolveComponentProps';
import classes from './inputUnstyledClasses';
import useInput from './useInput';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

/**
 *
 * Demos:
 *
 * - [Input](https://mui.com/base/react-input/)
 *
 * API:
 *
 * - [InputUnstyled API](https://mui.com/base/api/input-unstyled/)
 */
var InputUnstyled = /*#__PURE__*/React.forwardRef(function InputUnstyled(props, forwardedRef) {
  var _ref, _components$Input;

  var ariaDescribedby = props['aria-describedby'],
      ariaLabel = props['aria-label'],
      ariaLabelledby = props['aria-labelledby'],
      autoComplete = props.autoComplete,
      autoFocus = props.autoFocus,
      className = props.className,
      component = props.component,
      _props$components = props.components,
      components = _props$components === void 0 ? {} : _props$components,
      _props$componentsProp = props.componentsProps,
      componentsProps = _props$componentsProp === void 0 ? {} : _props$componentsProp,
      defaultValue = props.defaultValue,
      disabled = props.disabled,
      endAdornment = props.endAdornment,
      error = props.error,
      id = props.id,
      maxRows = props.maxRows,
      minRows = props.minRows,
      _props$multiline = props.multiline,
      multiline = _props$multiline === void 0 ? false : _props$multiline,
      name = props.name,
      onClick = props.onClick,
      onChange = props.onChange,
      onKeyDown = props.onKeyDown,
      onKeyUp = props.onKeyUp,
      onFocus = props.onFocus,
      onBlur = props.onBlur,
      placeholder = props.placeholder,
      readOnly = props.readOnly,
      required = props.required,
      rows = props.rows,
      _props$type = props.type,
      type = _props$type === void 0 ? 'text' : _props$type,
      startAdornment = props.startAdornment,
      value = props.value,
      other = _objectWithoutProperties(props, ["aria-describedby", "aria-label", "aria-labelledby", "autoComplete", "autoFocus", "className", "component", "components", "componentsProps", "defaultValue", "disabled", "endAdornment", "error", "id", "maxRows", "minRows", "multiline", "name", "onClick", "onChange", "onKeyDown", "onKeyUp", "onFocus", "onBlur", "placeholder", "readOnly", "required", "rows", "type", "startAdornment", "value"]);

  var _useInput = useInput({
    disabled: disabled,
    defaultValue: defaultValue,
    error: error,
    onBlur: onBlur,
    onClick: onClick,
    onChange: onChange,
    onFocus: onFocus,
    required: required,
    value: value
  }),
      getRootProps = _useInput.getRootProps,
      getInputProps = _useInput.getInputProps,
      focused = _useInput.focused,
      formControlContext = _useInput.formControlContext,
      errorState = _useInput.error,
      disabledState = _useInput.disabled;

  var ownerState = _extends({}, props, {
    disabled: disabledState,
    error: errorState,
    focused: focused,
    formControlContext: formControlContext,
    multiline: multiline,
    type: type
  });

  var rootStateClasses = clsx(disabledState && classes.disabled, errorState && classes.error, focused && classes.focused, Boolean(formControlContext) && classes.formControl, multiline && classes.multiline, Boolean(startAdornment) && classes.adornedStart, Boolean(endAdornment) && classes.adornedEnd);
  var inputStateClasses = clsx(disabledState && classes.disabled, multiline && classes.multiline);
  var propsToForward = {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoComplete: autoComplete,
    autoFocus: autoFocus,
    id: id,
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp,
    name: name,
    placeholder: placeholder,
    readOnly: readOnly,
    type: type
  };
  var Root = (_ref = component != null ? component : components.Root) != null ? _ref : 'div';
  var rootComponentsProps = resolveComponentProps(componentsProps.root, ownerState);
  var rootProps = appendOwnerState(Root, _extends({}, getRootProps(_extends({}, other, rootComponentsProps)), {
    className: clsx(classes.root, rootStateClasses, className, rootComponentsProps == null ? void 0 : rootComponentsProps.className)
  }), ownerState);
  rootProps.ref = useForkRef(rootProps.ref, useForkRef(rootComponentsProps == null ? void 0 : rootComponentsProps.ref, forwardedRef));
  var Input = (_components$Input = components.Input) != null ? _components$Input : 'input';
  var inputComponentsProps = resolveComponentProps(componentsProps.input, ownerState);
  var inputProps = appendOwnerState(Input, _extends({}, getInputProps(_extends({}, inputComponentsProps, propsToForward)), {
    className: clsx(classes.input, inputStateClasses, inputComponentsProps == null ? void 0 : inputComponentsProps.className)
  }), ownerState);
  inputProps.ref = useForkRef(inputProps.ref, inputComponentsProps == null ? void 0 : inputComponentsProps.ref);

  if (multiline) {
    var _components$Textarea, _components$Textarea2;

    var hasHostTextarea = isHostComponent((_components$Textarea = components.Textarea) != null ? _components$Textarea : 'textarea');

    var _inputProps = inputProps,
        ownerStateInputProps = _inputProps.ownerState,
        inputPropsWithoutOwnerState = _objectWithoutProperties(_inputProps, ["ownerState"]);

    if (rows) {
      if (process.env.NODE_ENV !== 'production') {
        if (minRows || maxRows) {
          console.warn('MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.');
        }
      }
    }

    inputProps = _extends({}, !hasHostTextarea && {
      minRows: rows || minRows,
      maxRows: rows || maxRows
    }, hasHostTextarea ? inputPropsWithoutOwnerState : inputProps, {
      type: undefined
    });
    Input = (_components$Textarea2 = components.Textarea) != null ? _components$Textarea2 : 'textarea';
  }

  return /*#__PURE__*/_jsxs(Root, _extends({}, rootProps, {
    children: [startAdornment, /*#__PURE__*/_jsx(Input, _extends({}, inputProps)), endAdornment]
  }));
});
process.env.NODE_ENV !== "production" ? InputUnstyled.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * @ignore
   */
  'aria-describedby': PropTypes.string,

  /**
   * @ignore
   */
  'aria-label': PropTypes.string,

  /**
   * @ignore
   */
  'aria-labelledby': PropTypes.string,

  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,

  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: PropTypes.bool,

  /**
   * @ignore
   */
  children: PropTypes.node,

  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Input: PropTypes.elementType,
    Root: PropTypes.elementType,
    Textarea: PropTypes.elementType
  }),

  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),

  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,

  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: PropTypes.bool,

  /**
   * Trailing adornment for this input.
   */
  endAdornment: PropTypes.node,

  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,

  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,

  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: PropTypes.number,

  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: PropTypes.number,

  /**
   * If `true`, a `textarea` element is rendered.
   * @default false
   */
  multiline: PropTypes.bool,

  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,

  /**
   * @ignore
   */
  onBlur: PropTypes.func,

  /**
   * @ignore
   */
  onChange: PropTypes.func,

  /**
   * @ignore
   */
  onClick: PropTypes.func,

  /**
   * @ignore
   */
  onFocus: PropTypes.func,

  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,

  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,

  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,

  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,

  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,

  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.number,

  /**
   * Leading adornment for this input.
   */
  startAdornment: PropTypes.node,

  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOf(['button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week']),

  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any
} : void 0;
export default InputUnstyled;