import { Appointment } from "../entities/appointment";

export interface appointmentsRepository {
  create(appointment: Appointment): Promise<void>;
  findOverLappingAppointment(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | null>;
}
