import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Button from '../Button';
import "@testing-library/jest-dom/extend-expect";
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

afterEach(cleanup);

test('renders without crash', () => {
    const div = document.createElement("div");
    render(<Button />, div);
});

test('render button', () => {
    const div = document.createElement("div");
    const { getByTestId } = render(<Button text="submit" />, div);
    expect(getByTestId('button')).toHaveTextContent("submit")
});


//track the snapshots 
test("snapshot test", () => {
    const nodeTree = renderer.create(<Button text="submit" />).toJSON();
    expect(nodeTree).toMatchSnapshot();
})

