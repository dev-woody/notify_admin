import FullCalendar from "@fullcalendar/react";
import { RefObject } from "react";

export type calendarRef = RefObject<FullCalendar | null>;

// setting earliest / latest available time in minutes since Midnight
export const earliestTime = 540;
export const latestTime = 1320;

export const months = [
  {
    value: "1",
    label: "1월",
  },
  {
    value: "2",
    label: "2월",
  },
  {
    value: "3",
    label: "3월",
  },
  {
    value: "4",
    label: "4월",
  },
  {
    value: "5",
    label: "5월",
  },
  {
    value: "6",
    label: "6월",
  },
  {
    value: "7",
    label: "7월",
  },
  {
    value: "8",
    label: "8월",
  },
  {
    value: "9",
    label: "9월",
  },
  {
    value: "10",
    label: "10월",
  },
  {
    value: "11",
    label: "11월",
  },
  {
    value: "12",
    label: "12월",
  },
];

const getRandomDays = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const currentDate = new Date();

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  backgroundColor?: string;
  description: string;
}

export const initialEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Daily Standup Meeting",
    start: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      12,
      15
    ),
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      13,
      0
    ),
    backgroundColor: "#AEC6E4",
    description: "This is a daily meeting to go over today's tasks.",
  },
  {
    id: "2",
    title: "Client Lunch",
    start: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
      16,
      30
    ),
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
      17,
      30
    ),
    backgroundColor: "#FFD1DC",
    description: "Lunch at Cracker Barrel with integration clients.",
  },
  {
    id: "3",
    title: "Counselor Meetup",
    start: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      18,
      0
    ),
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      18,
      45
    ),
    backgroundColor: "#B2E0B2",
    description: "Conversation with counselor about progression.",
  },
  {
    id: "4",
    title: "Team Retreat",
    start: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 3,
      8,
      0
    ),
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 3,
      18,
      45
    ),
    backgroundColor: "#FFB3BA",
    description: "Team bonding and strategic planning.",
  },
  {
    id: "5",
    title: "Time Management Workshop",
    start: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 5,
      10,
      0
    ),
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 5,
      15,
      30
    ),
    backgroundColor: "#FFDFBA",
    description:
      "Improve your productivity with effective time management techniques.",
  },
  {
    id: "6",
    title: "Health and Wellness Fair",
    start: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + getRandomDays(20, 24),
      9,
      0
    ),
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + getRandomDays(25, 29),
      15,
      0
    ),
    backgroundColor: "#B9FBC0",
    description: "Explore health resources and wellness activities.",
  },
  {
    id: "7",
    title: "Book Club Discussion",
    start: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + getRandomDays(30, 34),
      18,
      0
    ),
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + getRandomDays(35, 39),
      20,
      0
    ),
    backgroundColor: "#C3B1E1",
    description: "Discussing this month's book selection with the club.",
  },
  {
    id: "8",
    title: "Creative Writing Workshop",
    start: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + getRandomDays(40, 44),
      14,
      0
    ),
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + getRandomDays(45, 49),
      16,
      0
    ),
    backgroundColor: "#B2E7E0",
    description: "Join us for a weekend of creative writing exercises.",
  },
  {
    id: "9",
    title: "Charity Fundraiser",
    start: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + getRandomDays(50, 54),
      19,
      0
    ),
    end: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + getRandomDays(55, 59),
      22,
      0
    ),
    backgroundColor: "#F6C9D8",
    description: "An evening of fun to raise funds for a good cause.",
  },
];
