import "@testing-library/jest-dom/extend-expect";
import Button from "../index";

import { render, screen, fireEvent } from "@testing-library/react";

describe("Button component", () => {
  // Тест на проверку рендеринга текста внутри кнопки
  test("renders button with correct text", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument(); // Проверяем, что элемент кнопки присутствует в документе
  });

  // Тест на проверку применения корректного класса для варианта кнопки (variant)
  test("applies correct variant class", () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const buttonElement = screen.getByText(/secondary button/i);
    expect(buttonElement).toHaveClass("bg-gray-600"); // Проверяем, что у кнопки есть класс для серого фона
  });

  // Тест на проверку применения корректного класса для размера кнопки (size)
  test("applies correct size class", () => {
    render(<Button size="lg">Large Button</Button>);
    const buttonElement = screen.getByText(/large button/i);
    expect(buttonElement).toHaveClass("px-5 py-3 text-lg"); // Проверяем, что у кнопки есть классы для большого размера
  });

  // Тест на проверку отключения кнопки при переданном пропе disabled
  test("disables the button when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByText(/disabled button/i);
    expect(buttonElement).toBeDisabled(); // Проверяем, что кнопка отключена
    expect(buttonElement).toHaveClass("opacity-50 cursor-not-allowed"); // Проверяем, что применены стили для отключенной кнопки
  });

  // Тест на проверку срабатывания onClick при клике на кнопку
  test("triggers onClick event when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement); // Имитация клика на кнопку
    expect(handleClick).toHaveBeenCalledTimes(1); // Проверяем, что обработчик был вызван один раз
  });

  // Снепшот-тест для проверки рендеринга компонента
  test("matches snapshot", () => {
    const { asFragment } = render(
      <Button variant="primary" size="md">
        Snapshot Button
      </Button>,
    );
    expect(asFragment()).toMatchSnapshot(); // Проверяем, что рендеринг соответствует предыдущему снепшоту
  });
});
