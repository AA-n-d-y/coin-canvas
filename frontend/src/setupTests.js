import '@testing-library/jest-dom';
import ResizeObserver from 'resize-observer-polyfill';

// Make the ResizeObserver polyfill available globally
global.ResizeObserver = ResizeObserver;