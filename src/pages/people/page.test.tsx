import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TestProviders } from '@/test/provider';
import { ToastProvider } from '@/components/Toast';
import { PeoplePage } from './page';

describe('PeoplePage', () => {
  it("should render 'People' in the page", () => {
    render(
      <TestProviders>
        <ToastProvider>
          <PeoplePage />
        </ToastProvider>
      </TestProviders>
    );
    expect(screen.getByText('People')).toBeInTheDocument();
  });
});
