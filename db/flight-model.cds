namespace flightModel;

define entity Customer {
	key CustomerNumber : Integer;
	CustomerName       : String(25);
	AddressForm        : String(15);
	Street             : String(30);
	POBox              : String(10);
	PostalCode         : String(10);
	City               : String(25);
	CountryCode        : String(3);	
	Region             : String(3);
	Phone              : String(30);
	CustomerType       : String(1);
	DiscountRate       : Integer;
	LanguageKey        : String(1);
	Email              : String(40);
	WebUserName        : String(25);
}