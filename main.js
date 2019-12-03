var Config = Config || {};

Config.ContentTypes = Config.ContentTypes || []

debugger;


Config.ContentTypes.push(
    {
        Name: "Fill_PTR_ContentType",
        Priority: 8,
        Versions: [
            {
                Name: "All",
                Priority: 9,
                Choices: [],
                Buttons: [
                    {
                        Name: "Send to line manager",
                        IsDefault: true,
                        Function: function () {
                            window.isValidForm = window.isValidForm || false;
                            var taskId = GetUrlKeyValue("ID");
                            var btn = $("input[value='Send to approve']");
                            var demandId = $("select[Title^='Demand']")[0].value;
                            var currentStatus;
                            if (!isValidForm) {
                                debugger;
                                $.ajax({
                                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/lists/getbytitle('PTR pool')/items?$filter=((Demand eq "+demandId+"))",
                                    type: "GET",
                                    headers: {
                                        "Accept": "application/json; odata=verbose"
                                    }
                                })
                                .done(function (data, textStatus, jqXHR) {
                                    currentStatus = data.d.results[0].CheckoutUserId;
                                    debugger;
                                    if(currentStatus == null){
                                        alert("TRIGGER");
                                        debugger;
                                        window.isValidForm = true;
                                        return window.isValidForm;
                                    }
                                    else{
                                        alert("Oh no your doc is in action");
                                    }
                                    console.log("first log " + window.isValidForm)

                                })
                                .fail(function (jqXHR, textStatus, errorThrown) {
                                    debugger;
                                    alert("Error retrieving information from FRD Task list: " + jqXHR.responseText);
                                });
                                console.log("second log " + window.isValidForm)

                            }
                            else{
                            var result = window.isValidForm;
                            window.isValidForm = false;
                            return result;
                            }
                        }
                    }    
                ]
            }
        ]
    }
)