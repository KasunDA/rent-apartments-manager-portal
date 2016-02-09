angular.module('app.pages.rentCalculations', [
    'app.api.rentCalculationsApiService',
    'app.api.apartmentsApiService',
    'app.api.billTypesApiService',
    'app.api.billsApiService',
    'app.api.chargesApiService',
    'app.pages.rentCalculations.list',
    'app.pages.rentCalculations.edit',
    'app.pages.rentCalculations.rentCalculationForm'
]);
