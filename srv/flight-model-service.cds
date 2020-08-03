using { flightModel } from '../db/flight-model';

service flightService @(requires: 'authenticated-user'){
  entity Customers @readonly as projection on flightModel.Customer;
}