import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Calendar, { Calendar as CalendarNamed, type CalendarProps } from "./Calendar";

const meta: Meta<typeof CalendarNamed> = {
  title: "Components/Calendar",
  component: CalendarNamed,
  parameters: {
    layout: "centered",
    docs: {
      page: () => null as any, // replaced by MDX page
    },
  },
  argTypes: {
    selectedDate: {
      control: false,
      description: "Currently selected date",
    },
    onDateSelect: {
      action: "dateSelected",
      description: "Callback when a date is selected",
    },
    minDate: { control: "date", description: "Minimum selectable date" },
    maxDate: { control: "date", description: "Maximum selectable date" },
    weekStartsOn: {
      control: { type: "radio" },
      options: [0, 1, 2, 3, 4, 5, 6],
      description: "0=Sunday ... 6=Saturday",
    },
    showOutsideDays: {
      control: "boolean",
      description: "Show days from adjacent months",
    },
    showMonthYearPickers: {
      control: "boolean",
      description: "Show native selects to pick month and year",
    },
    disableAnimation: {
      control: "boolean",
      description: "Disable transition animations between months",
    },
    month: { control: false, description: "Visible month (controlled)" },
    onMonthChange: {
      action: "monthChanged",
      description: "When visible month changes",
    },
    locale: { control: false, description: "date-fns locale" },
    className: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof CalendarNamed>;

const UncontrolledComponent = (args: Partial<CalendarProps>) => {
  const [selected, setSelected] = useState<Date | null>(new Date());
  return <Calendar {...args} selectedDate={selected} onDateSelect={setSelected} />;
};

export const Uncontrolled: Story = {
  render: args => <UncontrolledComponent {...args} />,
  args: {
    showOutsideDays: true,
  } as Partial<CalendarProps>,
};

const WithMinMaxComponent = (args: Partial<CalendarProps>) => {
  const [selected, setSelected] = useState<Date | null>(new Date());
  const today = new Date();
  const min = new Date(today.getFullYear(), today.getMonth(), 5);
  const max = new Date(today.getFullYear(), today.getMonth(), 25);
  return (
    <Calendar
      {...args}
      selectedDate={selected}
      onDateSelect={setSelected}
      minDate={min}
      maxDate={max}
    />
  );
};

export const WithMinMax: Story = {
  render: args => <WithMinMaxComponent {...args} />,
};

const ControlledMonthComponent = (args: Partial<CalendarProps>) => {
  const [selected, setSelected] = useState<Date | null>(null);
  const [month, setMonth] = useState<Date>(new Date());
  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        {...args}
        month={month}
        onMonthChange={setMonth}
        selectedDate={selected}
        onDateSelect={setSelected}
      />
      <div className="text-sm text-gray-600">
        Visible Month:{" "}
        {month.toLocaleString(undefined, {
          month: "long",
          year: "numeric",
        })}
      </div>
    </div>
  );
};

export const ControlledMonth: Story = {
  render: args => <ControlledMonthComponent {...args} />,
};
