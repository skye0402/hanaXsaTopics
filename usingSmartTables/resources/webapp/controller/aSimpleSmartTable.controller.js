sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("usingSmartTables.usingSmartTables.controller.aSimpleSmartTable", {
		onInit: function () {
			this._oView = this.getView();
			this._oComponent = sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this._oView));
			this._oModel = this._oComponent.getModel("flightData");
			this._oView.setModel(this._oModel);
		},
		onInitialise: function (oEvent) {
			this.oTable = oEvent.getSource()._oTable;
			this.oTable.setEnableColumnFreeze(true);
		},
		onBeforeExport: function (oEvt) {
			var mExcelSettings = oEvt.getParameter("exportSettings");
			mExcelSettings.worker = true;
		}
	});
});