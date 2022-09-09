import { expect, test } from "vitest";
import { Appointment } from "./appointment";
import { getFutureDate } from "../tests/utils/get-future-date";

test("create an appointment", () => {
  const startsAt = getFutureDate("2022-09-09");
  const endsAt = getFutureDate("2022-09-10");

  startsAt.setDate(startsAt.getDate() + 1);
  endsAt.setDate(endsAt.getDate() + 2);

  const appointment = new Appointment({
    customer: "Jonh Doe",
    startsAt,
    endsAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("Jonh Doe");
});

test("cannot create an appoitment with end date before start date", () => {
  const startsAt = getFutureDate("2022-09-27");
  const endsAt = getFutureDate("2022-09-10");

  startsAt.setDate(startsAt.getDate() + 2);
  endsAt.setDate(endsAt.getDate() + 1);

  expect(() => {
    return new Appointment({
      customer: "Jonh Doe",
      startsAt,
      endsAt,
    });
  }).toThrow();
});

test("cannot create an appoitment with start date before now", () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setDate(startsAt.getDate() - 1);
  endsAt.setDate(endsAt.getDate() + 3);

  expect(() => {
    return new Appointment({
      customer: "Jonh Doe",
      startsAt,
      endsAt,
    });
  }).toThrow();
});
