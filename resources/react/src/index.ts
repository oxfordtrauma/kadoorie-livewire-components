/**
 * Project: Kadoorie Livewire Components
 * File: index.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

// Shared library
export { cn } from './lib/cn';
export * from './lib/variants';
export * from './lib/ids';
export { getIcon, hasIcon, registerIcon } from './lib/icons';

// Core hooks
export { useControllableState } from './hooks/useControllableState';
export { useFieldState } from './hooks/useFieldState';
export type { FieldState, FieldStateOptions } from './hooks/useFieldState';
export { useDisclosure } from './hooks/useDisclosure';
export type { Disclosure } from './hooks/useDisclosure';
export { useScrollLock } from './hooks/useScrollLock';
export { useFocusTrap } from './hooks/useFocusTrap';
export { useDismiss } from './hooks/useDismiss';
export type { DismissOptions } from './hooks/useDismiss';
export { useRovingTabIndex } from './hooks/useRovingTabIndex';
export type { RovingTabIndex, RovingItemProps } from './hooks/useRovingTabIndex';
export { useDataTable } from './hooks/useDataTable';
export type {
  DataTable as DataTableState,
  UseDataTableOptions,
  DataTableRow,
  SortDirection,
} from './hooks/useDataTable';
export { httpErrorCopy } from './lib/httpErrorStatus';
export type { HttpErrorCopy } from './lib/httpErrorStatus';

// UI components — R1 form controls
export { Icon } from './ui/Icon';
export type { IconProps } from './ui/Icon';
export { Button } from './ui/Button';
export type { ButtonProps } from './ui/Button';
export { Label } from './ui/Label';
export type { LabelProps } from './ui/Label';
export { Field } from './ui/Field';
export type { FieldProps } from './ui/Field';
export { FieldContext, useInheritedFieldState } from './ui/fieldContext';
export type { FieldContextValue } from './ui/fieldContext';
export { Input } from './ui/Input';
export type { InputProps } from './ui/Input';
export { Textarea } from './ui/Textarea';
export type { TextareaProps } from './ui/Textarea';
export { Select } from './ui/Select';
export type { SelectOptions, SelectProps } from './ui/Select';
export { Choice, Checkbox, Radio } from './ui/Choice';
export type { ChoiceProps, ChoiceType, CheckboxProps, RadioProps } from './ui/Choice';
export { Toggle } from './ui/Toggle';
export type { ToggleProps } from './ui/Toggle';

// UI components — R2 feedback & overlays
export { Alert } from './ui/Alert';
export type { AlertProps } from './ui/Alert';
export { Spinner } from './ui/Spinner';
export type { SpinnerProps } from './ui/Spinner';
export { Tooltip } from './ui/Tooltip';
export type { TooltipProps, TooltipPlacement } from './ui/Tooltip';
export { Modal } from './ui/Modal';
export type { ModalProps } from './ui/Modal';
export { ToastProvider, useToast } from './ui/Toast';
export type { ToastOptions, ToastContextValue } from './ui/Toast';

// UI components — R3 layout & navigation
export { Card } from './ui/Card';
export type { CardProps } from './ui/Card';
export { Divider } from './ui/Divider';
export type { DividerProps } from './ui/Divider';
export { Badge } from './ui/Badge';
export type { BadgeProps } from './ui/Badge';
export { Avatar } from './ui/Avatar';
export type { AvatarProps } from './ui/Avatar';
export { Breadcrumbs } from './ui/Breadcrumbs';
export type { BreadcrumbsProps, BreadcrumbItem } from './ui/Breadcrumbs';
export { Tabs, TabPanel } from './ui/Tabs';
export type { TabsProps, TabPanelProps, TabItem } from './ui/Tabs';
export { Accordion, AccordionItem } from './ui/Accordion';
export type { AccordionProps, AccordionItemProps } from './ui/Accordion';
export { Nav } from './ui/Nav';
export type { NavProps, NavItem } from './ui/Nav';
export { Dropdown, DropdownItem } from './ui/Dropdown';
export type { DropdownProps, DropdownItemProps } from './ui/Dropdown';
export { EmptyState } from './ui/EmptyState';
export type { EmptyStateProps } from './ui/EmptyState';
export { Pagination } from './ui/Pagination';
export type { PaginationProps } from './ui/Pagination';

// UI components — R4 data & pages
export { DataTable } from './ui/DataTable';
export type { DataTableProps, DataTableColumn } from './ui/DataTable';
export { ErrorPage } from './ui/ErrorPage';
export type { ErrorPageProps } from './ui/ErrorPage';
export { LoginForm } from './ui/LoginForm';
export type { LoginFormProps, LoginCredentials } from './ui/LoginForm';

// UI components — R5 widgets
export { SmallBox } from './ui/SmallBox';
export type { SmallBoxProps } from './ui/SmallBox';
export { InfoBox } from './ui/InfoBox';
export type { InfoBoxProps } from './ui/InfoBox';
export { ProfileMenu } from './ui/ProfileMenu';
export type { ProfileMenuProps } from './ui/ProfileMenu';
export { Footer } from './ui/Footer';
export type { FooterProps, FooterColumn, FooterLink } from './ui/Footer';
