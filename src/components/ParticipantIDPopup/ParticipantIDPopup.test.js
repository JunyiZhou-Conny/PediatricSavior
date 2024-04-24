import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ParticipantIDPopup from './ParticipantIDPopup';

test('input changes and submit button calls onSubmit with participant ID', () => {
  const handleSubmit = jest.fn();
  render(<ParticipantIDPopup onSubmit={handleSubmit} onClose={() => {}} />);

  // Simulate user typing a participant ID
  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: '12345' }
  });

  // Simulate user clicking submit
  fireEvent.click(screen.getByText('Submit'));

  // Check if handleSubmit was called with the right argument
  expect(handleSubmit).toHaveBeenCalledWith('12345');
});
