import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repositories";

describe("Create appointment", () => {
  it("should be able to create an appointment", () => {
    const startsAt = getFutureDate("2022-09-09");
    const endsAt = getFutureDate("2022-09-10");

    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    startsAt.setDate(startsAt.getDate() + 1);
    endsAt.setDate(endsAt.getDate() + 2);

    expect(
      createAppointment.execute({
        customer: "Jonh Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });
});

it("Should not be able to create an appointment with overlapping dates", () => {
  it("should be able to create an appointment", async () => {
    const startsAt = getFutureDate("2022-09-09");
    const endsAt = getFutureDate("2022-09-10");

    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    startsAt.setDate(startsAt.getDate() + 1);
    endsAt.setDate(endsAt.getDate() + 2);

    await createAppointment.execute({
      customer: "Jonh Doe",
      startsAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        customer: "Jonh Doe",
        startsAt: getFutureDate("2022-09-10"),
        endsAt: getFutureDate("2022-09-11"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "Jonh Doe",
        startsAt: getFutureDate("2022-09-14"),
        endsAt: getFutureDate("2022-09-18"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
