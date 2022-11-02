function SecurityRoleOnChange(executionContext) {
var formContext = executionContext.getFormContext();
var roleConfiguration='';

//Returns Array of Selected OptionSet Text: ["One", "Two","Six"]
var selectedTexts = formContext.getAttribute("cr127_securityrole").getText();
var businessUnit=formContext.getAttribute("cr127_businessunit").getValue();
var buId=null;
if(businessUnit!=null)
{
	buId=businessUnit[0].id;
}
buId=buId.replace('{','').replace('}','');
for(var i=0;i<selectedTexts.length;i++)
{
Xrm.WebApi.online.retrieveMultipleRecords("role", "?$select=roleid&$filter=(name eq '"+selectedTexts[i]+"' and _businessunitid_value eq "+buId+")").then(
	function success(results) {
		console.log(results);
		for (var i = 0; i < results.entities.length; i++) {
			var result = results.entities[i];
			// Columns
			var roleid = result["roleid"]; // Guid
			roleConfiguration=roleConfiguration+roleid+",";
			formContext.getAttribute("cr127_roleconfiguration").setValue(roleConfiguration);
		}
	},
	function(error) {
		console.log(error.message);
	}
);
}
}
