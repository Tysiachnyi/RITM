var Config = Config || {};

Config.ContentTypes = Config.ContentTypes || []


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
                            var userid= _spPageContextInfo.userId;
                            var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid + ")";
                            var requestHeaders = { "accept" : "application/json;odata=verbose" };
                            var loginName;
                            $.ajax({
                                url : requestUri,
                                contentType : "application/json;odata=verbose",
                                headers : requestHeaders,
                                success : onSuccess,
                                error : onError
                                });
                                function onSuccess(data, request){
                                loginName = data.d.Title;
                                return loginName;
                                }
            
                                function onError(error) {
                                console.log("error");
                                }
                            
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
                                            console.log(loginName);
                                            debugger;
                                            window.showCreateFRDDialog(loginName); 
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
                                    window.showCreateFRDDialog = function (uN) {
                                        var newScope = $scope.$new();
                                        newScope.userName = uN
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