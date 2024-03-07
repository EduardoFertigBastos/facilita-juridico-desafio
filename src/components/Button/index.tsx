import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  IconButton,
  Button as MUIButton, ButtonProps as MUIButtonProps, Tooltip,
} from '@mui/material';

import Link from 'next/link';

type ExtraProps = {
  href?: string;
  label?: string;
  icon?: boolean;
  loading?: boolean;
};

type ButtonProps = MUIButtonProps & ExtraProps;

const tooltipProps = {
  enterDelay: 200,
  enterNextDelay: 200,
  leaveDelay: 100,
  PopperProps: {
    className: 'tooltip-buttons-custom',
  },
};

const ButtonComponents = {
  simple: MUIButton,
  icon: IconButton,
  loading: LoadingButton
};
const Button: React.FC<ButtonProps> = ({
  href = '',
  label = '',
  icon = false,
  children,
  loading,
  ...rest
}) => {
  rest.variant = rest.variant || 'contained';
  const { disabled } = rest;
  const itShouldHaveLink = !!href && !disabled;
  const itShouldHaveTooltip = !!label;

  const SelectedButtonComponent = ButtonComponents[getTypeButton()] as any;

  function getTypeButton() {
    if (loading) {
      return 'loading';
    }

    if (icon) {
      return 'icon';
    }

    return 'simple';
  }

  function simpleButton() {
    if (disabled) {
      return (
        <span>
          <SelectedButtonComponent {...rest} loading={loading ? loading : undefined}>
            {children}
          </SelectedButtonComponent>
        </span>
      );
    }

    return (
      <SelectedButtonComponent {...rest} loading={loading ? loading : undefined}>
        {children}
      </SelectedButtonComponent>
    );
  }

  function linkButton() {
    return (
      <Link href={href} passHref>
        {simpleButton()}
      </Link>
    );
  }

  function tooltipButton() {
    return (
      <Tooltip title={label} {...tooltipProps}>
        {itShouldHaveLink ? linkButton() : simpleButton()}
      </Tooltip>
    );
  }

  if (itShouldHaveTooltip) {
    return tooltipButton();
  }

  if (itShouldHaveLink) {
    return linkButton();
  }

  return simpleButton();
};

export default Button;
