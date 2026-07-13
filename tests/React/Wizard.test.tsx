/**
 * Project: Kadoorie Livewire Components
 * File: Wizard.test.tsx
 * User: dappelbe
 * Created: 2026-07-13
 * Last updated by: dappelbe
 * Last updated on: 2026-07-13
 * Version: 0.1.0
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, expect, it, vi } from 'vitest';
import { Wizard, WizardStep } from '../../resources/react/src/ui/Wizard';

const steps = [
  { id: 'account', label: 'Account' },
  { id: 'profile', label: 'Profile' },
  { id: 'review', label: 'Review' },
];

function renderWizard(props: Partial<React.ComponentProps<typeof Wizard>> = {}) {
  return render(
    <Wizard id="signup" steps={steps} {...props}>
      <WizardStep step="account">Account fields</WizardStep>
      <WizardStep step="profile">Profile fields</WizardStep>
      <WizardStep step="review">Review</WizardStep>
    </Wizard>
  );
}

describe('Wizard', () => {
  it('shows the first step and moves with Next/Back', async () => {
    renderWizard();
    expect(screen.getByTestId('wizard-step-account')).toBeVisible();
    expect(screen.getByTestId('wizard-step-profile')).not.toBeVisible();
    expect(screen.getByTestId('wizard-status')).toHaveTextContent('Step 1 of 3');
    expect(screen.getByTestId('wizard-back')).toBeDisabled();

    await userEvent.click(screen.getByTestId('wizard-next'));
    expect(screen.getByTestId('wizard-step-profile')).toBeVisible();
    expect(screen.getByTestId('wizard-status')).toHaveTextContent('Step 2 of 3');

    await userEvent.click(screen.getByTestId('wizard-back'));
    expect(screen.getByTestId('wizard-step-account')).toBeVisible();
  });

  it('marks the current step and gates future steps in linear mode', () => {
    renderWizard();
    expect(screen.getByTestId('wizard-marker-account')).toHaveAttribute('aria-current', 'step');
    expect(screen.getByTestId('wizard-marker-review')).toBeDisabled();
  });

  it('calls onFinish from the last step', async () => {
    const onFinish = vi.fn();
    renderWizard({ onFinish, defaultStep: 'review' });
    expect(screen.getByTestId('wizard-next')).toHaveTextContent('Finish');

    await userEvent.click(screen.getByTestId('wizard-next'));
    expect(onFinish).toHaveBeenCalledWith(2, 'review');
  });

  it('has no axe violations', async () => {
    const { container } = renderWizard();
    expect(await axe(container)).toHaveNoViolations();
  });
});
