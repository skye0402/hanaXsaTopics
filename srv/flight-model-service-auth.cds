using { flightService } from './flight-model-service';

// extend the previously defined service by authentication check
annotate flightService with @(requires: 'authenticated-user');

// extend the entity by authorization check on scope and attribute
annotate flightService.Customers with @(restrict: [
	{ grant: 'READ', to: 'Display', where: 'CountryCode = $user.country'}
]);

