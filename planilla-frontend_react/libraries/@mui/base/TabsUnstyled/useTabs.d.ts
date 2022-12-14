import * as React from 'react';
export interface UseTabsParameters {
    /**
     * The value of the currently selected `Tab`.
     * If you don't want any selected `Tab`, you can set this prop to `false`.
     */
    value?: string | number | false;
    /**
     * The default value. Use when the component is not controlled.
     */
    defaultValue?: string | number | false;
    /**
     * The component orientation (layout flow direction).
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The direction of the text.
     * @default 'ltr'
     */
    direction?: 'ltr' | 'rtl';
    /**
     * Callback invoked when new value is being set.
     */
    onChange?: (event: React.SyntheticEvent, value: number | string) => void;
    /**
     * If `true` the selected tab changes on focus. Otherwise it only
     * changes on activation.
     */
    selectionFollowsFocus?: boolean;
}
declare const useTabs: (parameters: UseTabsParameters) => {
    tabsContextValue: {
        idPrefix: string | undefined;
        value: string | number | false;
        onSelected: (e: any, newValue: any) => void;
        orientation: "horizontal" | "vertical" | undefined;
        direction: "ltr" | "rtl" | undefined;
        selectionFollowsFocus: boolean | undefined;
    };
};
export default useTabs;
