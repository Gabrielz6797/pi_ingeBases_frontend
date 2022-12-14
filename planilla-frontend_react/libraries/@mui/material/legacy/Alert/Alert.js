import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";

var _CloseIcon;

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { darken, lighten } from '@mui/system';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import Paper from '../Paper';
import alertClasses, { getAlertUtilityClass } from './alertClasses';
import IconButton from '../IconButton';
import SuccessOutlinedIcon from '../internal/svg-icons/SuccessOutlined';
import ReportProblemOutlinedIcon from '../internal/svg-icons/ReportProblemOutlined';
import ErrorOutlineIcon from '../internal/svg-icons/ErrorOutline';
import InfoOutlinedIcon from '../internal/svg-icons/InfoOutlined';
import CloseIcon from '../internal/svg-icons/Close';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var variant = ownerState.variant,
      color = ownerState.color,
      severity = ownerState.severity,
      classes = ownerState.classes;
  var slots = {
    root: ['root', "".concat(variant).concat(capitalize(color || severity)), "".concat(variant)],
    icon: ['icon'],
    message: ['message'],
    action: ['action']
  };
  return composeClasses(slots, getAlertUtilityClass, classes);
};

var AlertRoot = styled(Paper, {
  name: 'MuiAlert',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, styles[ownerState.variant], styles["".concat(ownerState.variant).concat(capitalize(ownerState.color || ownerState.severity))]];
  }
})(function (_ref) {
  var theme = _ref.theme,
      ownerState = _ref.ownerState;
  var getColor = theme.palette.mode === 'light' ? darken : lighten;
  var getBackgroundColor = theme.palette.mode === 'light' ? lighten : darken;
  var color = ownerState.color || ownerState.severity;
  return _extends({}, theme.typography.body2, {
    backgroundColor: 'transparent',
    display: 'flex',
    padding: '6px 16px'
  }, color && ownerState.variant === 'standard' && _defineProperty({
    color: getColor(theme.palette[color].light, 0.6),
    backgroundColor: getBackgroundColor(theme.palette[color].light, 0.9)
  }, "& .".concat(alertClasses.icon), {
    color: theme.palette.mode === 'dark' ? theme.palette[color].main : theme.palette[color].light
  }), color && ownerState.variant === 'outlined' && _defineProperty({
    color: getColor(theme.palette[color].light, 0.6),
    border: "1px solid ".concat(theme.palette[color].light)
  }, "& .".concat(alertClasses.icon), {
    color: theme.palette.mode === 'dark' ? theme.palette[color].main : theme.palette[color].light
  }), color && ownerState.variant === 'filled' && {
    color: '#fff',
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette[color].dark : theme.palette[color].main
  });
});
var AlertIcon = styled('div', {
  name: 'MuiAlert',
  slot: 'Icon',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.icon;
  }
})({
  marginRight: 12,
  padding: '7px 0',
  display: 'flex',
  fontSize: 22,
  opacity: 0.9
});
var AlertMessage = styled('div', {
  name: 'MuiAlert',
  slot: 'Message',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.message;
  }
})({
  padding: '8px 0',
  minWidth: 0,
  overflow: 'auto'
});
var AlertAction = styled('div', {
  name: 'MuiAlert',
  slot: 'Action',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.action;
  }
})({
  display: 'flex',
  alignItems: 'flex-start',
  padding: '4px 0 0 16px',
  marginLeft: 'auto',
  marginRight: -8
});
var defaultIconMapping = {
  success: /*#__PURE__*/_jsx(SuccessOutlinedIcon, {
    fontSize: "inherit"
  }),
  warning: /*#__PURE__*/_jsx(ReportProblemOutlinedIcon, {
    fontSize: "inherit"
  }),
  error: /*#__PURE__*/_jsx(ErrorOutlineIcon, {
    fontSize: "inherit"
  }),
  info: /*#__PURE__*/_jsx(InfoOutlinedIcon, {
    fontSize: "inherit"
  })
};
var Alert = /*#__PURE__*/React.forwardRef(function Alert(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiAlert'
  });

  var action = props.action,
      children = props.children,
      className = props.className,
      _props$closeText = props.closeText,
      closeText = _props$closeText === void 0 ? 'Close' : _props$closeText,
      color = props.color,
      icon = props.icon,
      _props$iconMapping = props.iconMapping,
      iconMapping = _props$iconMapping === void 0 ? defaultIconMapping : _props$iconMapping,
      onClose = props.onClose,
      _props$role = props.role,
      role = _props$role === void 0 ? 'alert' : _props$role,
      _props$severity = props.severity,
      severity = _props$severity === void 0 ? 'success' : _props$severity,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'standard' : _props$variant,
      other = _objectWithoutProperties(props, ["action", "children", "className", "closeText", "color", "icon", "iconMapping", "onClose", "role", "severity", "variant"]);

  var ownerState = _extends({}, props, {
    color: color,
    severity: severity,
    variant: variant
  });

  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsxs(AlertRoot, _extends({
    role: role,
    elevation: 0,
    ownerState: ownerState,
    className: clsx(classes.root, className),
    ref: ref
  }, other, {
    children: [icon !== false ? /*#__PURE__*/_jsx(AlertIcon, {
      ownerState: ownerState,
      className: classes.icon,
      children: icon || iconMapping[severity] || defaultIconMapping[severity]
    }) : null, /*#__PURE__*/_jsx(AlertMessage, {
      ownerState: ownerState,
      className: classes.message,
      children: children
    }), action != null ? /*#__PURE__*/_jsx(AlertAction, {
      ownerState: ownerState,
      className: classes.action,
      children: action
    }) : null, action == null && onClose ? /*#__PURE__*/_jsx(AlertAction, {
      ownerState: ownerState,
      className: classes.action,
      children: /*#__PURE__*/_jsx(IconButton, {
        size: "small",
        "aria-label": closeText,
        title: closeText,
        color: "inherit",
        onClick: onClose,
        children: _CloseIcon || (_CloseIcon = /*#__PURE__*/_jsx(CloseIcon, {
          fontSize: "small"
        }))
      })
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" ? Alert.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action: PropTypes.node,

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Close'
   */
  closeText: PropTypes.string,

  /**
   * The color of the component. Unless provided, the value is taken from the `severity` prop.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   */
  color: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['error', 'info', 'success', 'warning']), PropTypes.string]),

  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   * Set to `false` to remove the `icon`.
   */
  icon: PropTypes.node,

  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping: PropTypes.shape({
    error: PropTypes.node,
    info: PropTypes.node,
    success: PropTypes.node,
    warning: PropTypes.node
  }),

  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: PropTypes.func,

  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: PropTypes.string,

  /**
   * The severity of the alert. This defines the color and icon used.
   * @default 'success'
   */
  severity: PropTypes.oneOf(['error', 'info', 'success', 'warning']),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),

  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['filled', 'outlined', 'standard']), PropTypes.string])
} : void 0;
export default Alert;