// sprint 6 12/12/2019

$("#atlwdg-trigger").hide();

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
                            debugger;
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
                                    var currentStatus = data.d.results[0].CheckoutUserId;
                                    console.log(currentStatus)
                                    console.log(window.isValidForm);
                                    debugger;
                                    

                                })
                                .fail(function (jqXHR, textStatus, errorThrown) {
                                    debugger;
                                    alert("Error retrieving information from FRD Task list: " + jqXHR.responseText);
                                });
                            }
                        }
                    }    
                ]
            }
        ]
    }
)
