import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../src/App'; 
import React from 'react'; 

test('participant ID is passed from ParticipantIDPopup to App', async () => {
  const { findByRole, getByText } = render(<App />);
  const input = await findByRole('textbox');  // Use findByRole to handle async loading
  const button = getByText('Submit');

  fireEvent.change(input, { target: { value: '12345' } });
  fireEvent.click(button);

  // Wait for expected output that indicates participant ID was handled
  await waitFor(() => {
    expect(getByText('Participant ID accepted: 12345')).toBeInTheDocument();
  });
});
