// frontend/src/setupTests.js
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Mock for ResizeObserver which is used by Chart.js
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

// Mock for matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

// Configure test-id attribute
configure({ testIdAttribute: 'data-test' });

// Mock for Chart.js animations to make tests faster
jest.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="line-chart-mock"></div>,
  Bar: () => <div data-testid="bar-chart-mock"></div>,
  Pie: () => <div data-testid="pie-chart-mock"></div>,
}));

// Mock for MUI components that use Popper (like Tooltip)
jest.mock('@mui/material/Popper', () => {
  return function DummyPopper(props) {
    return props.children;
  };
});

// Mock for window.scrollTo
window.scrollTo = jest.fn();

// Mock for Audio
window.Audio = jest.fn().mockImplementation(() => ({
  play: jest.fn(),
  pause: jest.fn(),
}));

// Setup cleanup after each test
afterEach(() => {
  jest.clearAllMocks();
});