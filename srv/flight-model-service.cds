using { flightModel } from '../db/flight-model';

service flightService{
  entity Customers @readonly as projection on flightModel.Customer;
}