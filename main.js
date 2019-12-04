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
                            var btn = $("input[value='Send to line manager']");
                            var demandId = $("select[Title^='Demand']")[0].value;
                            var currentStatus;
                            
                            if (!isValidForm) {
                                debugger;
                                $.ajax({
                                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/lists/getbytitle('PTR pool')/items?$filter=((Demand eq "+demandId+"))",
                                    type: "GET",
                                    headers: {
                                        "Accept": "application/json; odata=verbose"
                                    },
                                    success:(function (data, textStatus, jqXHR) {
                                        debugger;
                                        currentStatus = data.d.results[0].CheckoutUserId;
                                        debugger;
                                        console.log("first log ")
                                        if(currentStatus == null){
                                            window.isValidForm = true; 
                                            $(btn).click(); 
                                            return true;
                                        }
                                        else{
                                            debugger;
                                            window.showCreateFRDDialog(); 
                                        }
                                    }) 

                                })
                                .fail(function (jqXHR, textStatus, errorThrown) {
                                    debugger;
                                    alert("Error retrieving information from PTR list: " + jqXHR.responseText);
                                });
                            }
                            else{
                            var result = window.isValidForm;
                            window.isValidForm = false;
                            return result;
                            }
                        }
                    }    
                ],
                OnLoad: {
                    Function: function () {
                        requirejs(["bootstrap.min"], function () {
                            $("body").attr("ng-controller", "CreateFRD as main");
                            angular.module("app", ["ngDialog", "angular.css.injector"])
                                .controller("CreateFRD", function ($scope, ngDialog, cssInjector) {
                                    cssInjector.add("/Style Library/Styles/ngDialog.min.css");
                                    cssInjector.add("/Style Library/Styles/ngDialog-theme-plain.min.css");
                                    cssInjector.add("/Style Library/Styles/ngDialog-custom-width.css");
                                    cssInjector.add("/Style Library/Styles/approve-create-frd.css");
                                    window.showCreateFRDDialog = function (dI, aN) {
                                        var newScope = $scope.$new();
                                        newScope.demandId = dI;
                                        newScope.analyst = aN;
                                        newScope.close = function () { debugger; window.isValidForm = false; return true; }
                                        ngDialog.open({
                                            scope: newScope,
                                            template: '/Style Library/templates/ptr.checkin.component.html',
                                            className: 'ngdialog-theme-plain custom-width',
                                            cache: false
                                        });
                                    }
                                })

                            angular.bootstrap(document, ['app']);
                        });
                    }
                }
                
            }
        ]
    }
)