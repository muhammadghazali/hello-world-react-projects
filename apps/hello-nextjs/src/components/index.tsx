// copied from https://github.com/ianstormtaylor/slate/site/components.tsx
// and has been modified to comply with `react/display-name` ESLint rule https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md
import React, { Ref, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { cx, css } from '@emotion/css';

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
type OrNull<T> = T | null;

const _Button = (
  {
    className,
    active,
    reversed,
    ...props
  }: PropsWithChildren<
    {
      active: boolean;
      reversed: boolean;
    } & BaseProps
  >,
  ref: Ref<OrNull<HTMLSpanElement>>
) => (
  <span
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        cursor: pointer;
        color: ${reversed
          ? active
            ? 'white'
            : '#aaa'
          : active
          ? 'black'
          : '#ccc'};
      `
    )}
  />
);

export const Button = React.forwardRef(_Button);

const _EditorValue = (
  {
    className,
    value,
    ...props
  }: PropsWithChildren<
    {
      value: any;
    } & BaseProps
  >,
  ref: Ref<OrNull<null>>
) => {
  const textLines = value.document.nodes
    .map((node) => node.text)
    .toArray()
    .join('\n');
  return (
    <div
      ref={ref}
      {...props}
      className={cx(
        className,
        css`
          margin: 30px -20px 0;
        `
      )}
    >
      <div
        className={css`
          font-size: 14px;
          padding: 5px 20px;
          color: #404040;
          border-top: 2px solid #eeeeee;
          background: #f8f8f8;
        `}
      >
        Slate's value as text
      </div>
      <div
        className={css`
          color: #404040;
          font: 12px monospace;
          white-space: pre-wrap;
          padding: 10px 20px;
          div {
            margin: 0 0 0.5em;
          }
        `}
      >
        {textLines}
      </div>
    </div>
  );
};

export const EditorValue = React.forwardRef(_EditorValue);

const _Icon = (
  { className, ...props }: PropsWithChildren<BaseProps>,
  ref: Ref<OrNull<HTMLSpanElement>>
) => (
  <span
    {...props}
    ref={ref}
    className={cx(
      'material-icons',
      className,
      css`
        font-size: 18px;
        vertical-align: text-bottom;
      `
    )}
  />
);
export const Icon = React.forwardRef(_Icon);

const _Instructions = (
  { className, ...props }: PropsWithChildren<BaseProps>,
  ref: Ref<OrNull<HTMLDivElement>>
) => (
  <div
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        white-space: pre-wrap;
        margin: 0 -20px 10px;
        padding: 10px 20px;
        font-size: 14px;
        background: #f8f8e8;
      `
    )}
  />
);
export const Instruction = React.forwardRef(_Instructions);

const _Menu = (
  { className, ...props }: PropsWithChildren<BaseProps>,
  ref: Ref<OrNull<HTMLDivElement>>
) => (
  <div
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        & > * {
          display: inline-block;
        }
        & > * + * {
          margin-left: 15px;
        }
      `
    )}
  />
);
export const Menu = React.forwardRef(_Menu);

export const Portal = ({ children }) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

const _Toolbar = (
  { className, ...props }: PropsWithChildren<BaseProps>,
  ref: Ref<OrNull<HTMLDivElement>>
) => (
  <Menu
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        position: relative;
        padding: 1px 18px 17px;
        margin: 0 -20px;
        border-bottom: 2px solid #eee;
        margin-bottom: 20px;
      `
    )}
  />
);
export const Toolbar = React.forwardRef(_Toolbar);
