import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_useId as useId, chainPropTypes, integerPropType } from '@mui/utils';
import { appendOwnerState } from '../utils';
import composeClasses from '../composeClasses';
import isHostComponent from '../utils/isHostComponent';
import TablePaginationActionsUnstyled from './TablePaginationActionsUnstyled';
import { getTablePaginationUnstyledUtilityClass } from './tablePaginationUnstyledClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { jsxs as _jsxs } from "react/jsx-runtime";

function defaultLabelDisplayedRows(_ref) {
  var from = _ref.from,
      to = _ref.to,
      count = _ref.count;
  return "".concat(from, "\u2013").concat(to, " of ").concat(count !== -1 ? count : "more than ".concat(to));
}

function defaultGetAriaLabel(type) {
  return "Go to ".concat(type, " page");
}

var useUtilityClasses = function useUtilityClasses() {
  var slots = {
    root: ['root'],
    toolbar: ['toolbar'],
    spacer: ['spacer'],
    selectLabel: ['selectLabel'],
    select: ['select'],
    input: ['input'],
    selectIcon: ['selectIcon'],
    menuItem: ['menuItem'],
    displayedRows: ['displayedRows'],
    actions: ['actions']
  };
  return composeClasses(slots, getTablePaginationUnstyledUtilityClass, {});
};
/**
 * A pagination for tables.
 *
 * Demos:
 *
 * - [Table pagination](https://mui.com/base/react-table-pagination/)
 *
 * API:
 *
 * - [TablePaginationUnstyled API](https://mui.com/base/api/table-pagination-unstyled/)
 */


var TablePaginationUnstyled = /*#__PURE__*/React.forwardRef(function TablePaginationUnstyled(props, ref) {
  var _componentsProps$sele, _componentsProps$sele2, _ref2, _componentsProps$root, _components$Select, _componentsProps$sele3, _components$Actions, _componentsProps$acti, _components$MenuItem, _componentsProps$menu, _components$SelectLab, _componentsProps$sele4, _components$Displayed, _componentsProps$disp, _components$Toolbar, _componentsProps$tool, _components$Spacer, _componentsProps$spac;

  var component = props.component,
      _props$components = props.components,
      components = _props$components === void 0 ? {} : _props$components,
      _props$componentsProp = props.componentsProps,
      componentsProps = _props$componentsProp === void 0 ? {} : _props$componentsProp,
      className = props.className,
      colSpanProp = props.colSpan,
      count = props.count,
      _props$getItemAriaLab = props.getItemAriaLabel,
      getItemAriaLabel = _props$getItemAriaLab === void 0 ? defaultGetAriaLabel : _props$getItemAriaLab,
      _props$labelDisplayed = props.labelDisplayedRows,
      labelDisplayedRows = _props$labelDisplayed === void 0 ? defaultLabelDisplayedRows : _props$labelDisplayed,
      _props$labelRowsPerPa = props.labelRowsPerPage,
      labelRowsPerPage = _props$labelRowsPerPa === void 0 ? 'Rows per page:' : _props$labelRowsPerPa,
      onPageChange = props.onPageChange,
      onRowsPerPageChange = props.onRowsPerPageChange,
      page = props.page,
      rowsPerPage = props.rowsPerPage,
      _props$rowsPerPageOpt = props.rowsPerPageOptions,
      rowsPerPageOptions = _props$rowsPerPageOpt === void 0 ? [10, 25, 50, 100] : _props$rowsPerPageOpt,
      other = _objectWithoutProperties(props, ["component", "components", "componentsProps", "className", "colSpan", "count", "getItemAriaLabel", "labelDisplayedRows", "labelRowsPerPage", "onPageChange", "onRowsPerPageChange", "page", "rowsPerPage", "rowsPerPageOptions"]);

  var ownerState = props;
  var classes = useUtilityClasses();
  var colSpan;

  if (!component || component === 'td' || !isHostComponent(component)) {
    colSpan = colSpanProp || 1000; // col-span over everything
  }

  var getLabelDisplayedRowsTo = function getLabelDisplayedRowsTo() {
    if (count === -1) {
      return (page + 1) * rowsPerPage;
    }

    return rowsPerPage === -1 ? count : Math.min(count, (page + 1) * rowsPerPage);
  };

  var selectId = useId((_componentsProps$sele = componentsProps.select) == null ? void 0 : _componentsProps$sele.id);
  var labelId = useId((_componentsProps$sele2 = componentsProps.select) == null ? void 0 : _componentsProps$sele2['aria-labelledby']);
  var Root = (_ref2 = component != null ? component : components.Root) != null ? _ref2 : 'td';
  var rootProps = appendOwnerState(Root, _extends({
    colSpan: colSpan,
    ref: ref
  }, other, componentsProps.root, {
    className: clsx(classes.root, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className, className)
  }), ownerState);
  var Select = (_components$Select = components.Select) != null ? _components$Select : 'select';
  var selectProps = appendOwnerState(Select, _extends({
    value: rowsPerPage,
    id: selectId
  }, componentsProps.select, {
    onChange: function onChange(e) {
      return onRowsPerPageChange && onRowsPerPageChange(e);
    },
    'aria-label': rowsPerPage.toString(),
    'aria-labelledby': [labelId, selectId].filter(Boolean).join(' ') || undefined,
    className: clsx(classes.select, (_componentsProps$sele3 = componentsProps.select) == null ? void 0 : _componentsProps$sele3.className)
  }), ownerState);
  var Actions = (_components$Actions = components.Actions) != null ? _components$Actions : TablePaginationActionsUnstyled;
  var actionsProps = appendOwnerState(Actions, _extends({
    page: page,
    rowsPerPage: rowsPerPage,
    count: count,
    onPageChange: onPageChange,
    getItemAriaLabel: getItemAriaLabel
  }, componentsProps.actions, {
    className: clsx(classes.actions, (_componentsProps$acti = componentsProps.actions) == null ? void 0 : _componentsProps$acti.className)
  }), ownerState);
  var MenuItem = (_components$MenuItem = components.MenuItem) != null ? _components$MenuItem : 'option';
  var menuItemProps = appendOwnerState(MenuItem, _extends({}, componentsProps.menuItem, {
    className: clsx(classes.menuItem, (_componentsProps$menu = componentsProps.menuItem) == null ? void 0 : _componentsProps$menu.className),
    value: undefined
  }), ownerState);
  var SelectLabel = (_components$SelectLab = components.SelectLabel) != null ? _components$SelectLab : 'p';
  var selectLabelProps = appendOwnerState(SelectLabel, _extends({}, componentsProps.selectLabel, {
    className: clsx(classes.selectLabel, (_componentsProps$sele4 = componentsProps.selectLabel) == null ? void 0 : _componentsProps$sele4.className),
    id: labelId
  }), ownerState);
  var DisplayedRows = (_components$Displayed = components.DisplayedRows) != null ? _components$Displayed : 'p';
  var displayedRowsProps = appendOwnerState(DisplayedRows, _extends({}, componentsProps.displayedRows, {
    className: clsx(classes.displayedRows, (_componentsProps$disp = componentsProps.displayedRows) == null ? void 0 : _componentsProps$disp.className)
  }), ownerState);
  var Toolbar = (_components$Toolbar = components.Toolbar) != null ? _components$Toolbar : 'div';
  var toolbarProps = appendOwnerState(Toolbar, _extends({}, componentsProps.toolbar, {
    className: clsx(classes.toolbar, (_componentsProps$tool = componentsProps.toolbar) == null ? void 0 : _componentsProps$tool.className)
  }), ownerState);
  var Spacer = (_components$Spacer = components.Spacer) != null ? _components$Spacer : 'div';
  var spacerProps = appendOwnerState(Spacer, _extends({}, componentsProps.spacer, {
    className: clsx(classes.spacer, (_componentsProps$spac = componentsProps.spacer) == null ? void 0 : _componentsProps$spac.className)
  }), ownerState);
  return /*#__PURE__*/_jsx(Root, _extends({}, rootProps, {
    children: /*#__PURE__*/_jsxs(Toolbar, _extends({}, toolbarProps, {
      children: [/*#__PURE__*/_jsx(Spacer, _extends({}, spacerProps)), rowsPerPageOptions.length > 1 && /*#__PURE__*/_jsx(SelectLabel, _extends({}, selectLabelProps, {
        children: labelRowsPerPage
      })), rowsPerPageOptions.length > 1 && /*#__PURE__*/_jsx(Select, _extends({}, selectProps, {
        children: rowsPerPageOptions.map(function (rowsPerPageOption) {
          return /*#__PURE__*/_createElement(MenuItem, _extends({}, menuItemProps, {
            key: typeof rowsPerPageOption !== 'number' && rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption,
            value: typeof rowsPerPageOption !== 'number' && rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption
          }), typeof rowsPerPageOption !== 'number' && rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption);
        })
      })), /*#__PURE__*/_jsx(DisplayedRows, _extends({}, displayedRowsProps, {
        children: labelDisplayedRows({
          from: count === 0 ? 0 : page * rowsPerPage + 1,
          to: getLabelDisplayedRowsTo(),
          count: count === -1 ? -1 : count,
          page: page
        })
      })), /*#__PURE__*/_jsx(Actions, _extends({}, actionsProps))]
    }))
  }));
});
process.env.NODE_ENV !== "production" ? TablePaginationUnstyled.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * @ignore
   */
  children: PropTypes.node,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * @ignore
   */
  colSpan: PropTypes.number,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * The components used for each slot inside the TablePagination.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Actions: PropTypes.elementType,
    DisplayedRows: PropTypes.elementType,
    MenuItem: PropTypes.elementType,
    Root: PropTypes.elementType,
    Select: PropTypes.elementType,
    SelectLabel: PropTypes.elementType,
    Spacer: PropTypes.elementType,
    Toolbar: PropTypes.elementType
  }),

  /**
   * The props used for each slot inside the TablePagination.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    actions: PropTypes.object,
    displayedRows: PropTypes.object,
    menuItem: PropTypes.object,
    root: PropTypes.object,
    select: PropTypes.object,
    selectLabel: PropTypes.object,
    spacer: PropTypes.object,
    toolbar: PropTypes.object
  }),

  /**
   * The total number of rows.
   *
   * To enable server side pagination for an unknown number of items, provide -1.
   */
  count: PropTypes.number.isRequired,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
   * @returns {string}
   * @default function defaultGetAriaLabel(type: ItemAriaLabelType) {
   *   return `Go to ${type} page`;
   * }
   */
  getItemAriaLabel: PropTypes.func,

  /**
   * Customize the displayed rows label. Invoked with a `{ from, to, count, page }`
   * object.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default function defaultLabelDisplayedRows({ from, to, count }: LabelDisplayedRowsArgs) {
   *   return `${from}???${to} of ${count !== -1 ? count : `more than ${to}`}`;
   * }
   */
  labelDisplayedRows: PropTypes.func,

  /**
   * Customize the rows per page label.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Rows per page:'
   */
  labelRowsPerPage: PropTypes.node,

  /**
   * Callback fired when the page is changed.
   *
   * @param {React.MouseEvent<HTMLButtonElement> | null} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onPageChange: PropTypes.func.isRequired,

  /**
   * Callback fired when the number of rows per page is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   */
  onRowsPerPageChange: PropTypes.func,

  /**
   * The zero-based index of the current page.
   */
  page: chainPropTypes(integerPropType.isRequired, function (props) {
    var count = props.count,
        page = props.page,
        rowsPerPage = props.rowsPerPage;

    if (count === -1) {
      return null;
    }

    var newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);

    if (page < 0 || page > newLastPage) {
      return new Error('MUI: The page prop of a TablePaginationUnstyled is out of range ' + "(0 to ".concat(newLastPage, ", but page is ").concat(page, ")."));
    }

    return null;
  }),

  /**
   * The number of rows per page.
   *
   * Set -1 to display all the rows.
   */
  rowsPerPage: integerPropType.isRequired,

  /**
   * Customizes the options of the rows per page select field. If less than two options are
   * available, no select field will be displayed.
   * Use -1 for the value with a custom label to show all the rows.
   * @default [10, 25, 50, 100]
   */
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  })]).isRequired)
} : void 0;
export default TablePaginationUnstyled;