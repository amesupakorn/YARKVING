import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

// Simple component for testing
function TestComponent() {
  return <h1>Hello Vitest</h1>
}

test('TestComponent renders correctly', () => {
  render(<TestComponent />)
  expect(screen.getByText('Hello Vitest')).toBeDefined()
})

test('Math works', () => {
  expect(1 + 1).toBe(2)
})
