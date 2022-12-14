/// <reference types="react" />
import { Simplify } from '@mui/types';
import { EventHandlers } from './types';
import { OmitEventHandlers } from './omitEventHandlers';
export declare type WithClassName<T> = T & {
    className?: string;
};
export declare type WithRef<T> = T & {
    ref?: React.Ref<any>;
};
export interface MergeSlotPropsParameters<SlotProps, ExternalForwardedProps, ExternalSlotProps, AdditionalProps> {
    /**
     * A function that returns the internal props of the component.
     * It accepts the event handlers passed into the component by the user
     * and is responsible for calling them where appropriate.
     */
    getSlotProps?: (other: EventHandlers) => WithClassName<SlotProps>;
    /**
     * Props provided to the `componentsProps.*` of the unstyled component.
     */
    externalSlotProps?: WithClassName<ExternalSlotProps>;
    /**
     * Extra props placed on the unstyled component that should be forwarded to the slot.
     * This should usually be used only for the root slot.
     */
    externalForwardedProps?: WithClassName<ExternalForwardedProps>;
    /**
     * Additional props to be placed on the slot.
     */
    additionalProps?: WithClassName<AdditionalProps>;
    /**
     * Extra class name(s) to be placed on the slot.
     */
    className?: string | (string | undefined)[] | undefined;
}
export declare type MergeSlotPropsResult<SlotProps, ExternalForwardedProps, ExternalSlotProps, AdditionalProps> = {
    props: Simplify<SlotProps & OmitEventHandlers<ExternalForwardedProps> & OmitEventHandlers<ExternalSlotProps> & AdditionalProps & {
        className?: string;
    }>;
    internalRef: React.Ref<any> | undefined;
};
/**
 * Merges the slot component internal props (usually coming from a hook)
 * with the externally provided ones.
 *
 * The merge order is (the latter overrides the former):
 * 1. The internal props (specified as a getter function to work with get*Props hook result)
 * 2. Additional props (specified internally on an unstyled component)
 * 3. External props specified on the owner component. These should only be used on a root slot.
 * 4. External props specified in the `componentsProps.*` prop.
 * 5. The `className` prop - combined from all the above.
 * @param parameters
 * @returns
 */
export default function mergeSlotProps<SlotProps, ExternalForwardedProps extends Record<string, unknown>, ExternalSlotProps extends Record<string, unknown>, AdditionalProps>(parameters: MergeSlotPropsParameters<WithRef<SlotProps>, ExternalForwardedProps, ExternalSlotProps, AdditionalProps>): MergeSlotPropsResult<SlotProps, ExternalForwardedProps, ExternalSlotProps, AdditionalProps>;
