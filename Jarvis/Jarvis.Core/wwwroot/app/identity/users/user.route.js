(function () {
    'use strict';

    angular
        .module('identity')
        .component('uiUserRead', {
            templateUrl: ['componentService', function (componentService) {
                return componentService.getTemplateUrl('uiUserRead', '/app/identity/users/user-read.template.html');
            }],
            controller: 'userReadController',
            bindings: {
                context: '='
            }
        })
        .component('uiUserCreate', {
            templateUrl: ['componentService', function (componentService) {
                return componentService.getTemplateUrl('uiUserCreate', '/app/identity/users/user-create.template.html');
            }],
            controller: 'userCreateController',
            bindings: {
                context: '='
            }
        })
        .component('uiUserUpdate', {
            templateUrl: ['componentService', function (componentService) {
                return componentService.getTemplateUrl('uiUserUpdate', '/app/identity/users/user-update.template.html');
            }],
            controller: 'userUpdateController',
            bindings: {
                context: '='
            }
        })
        .config(function ($stateProvider) {
            $stateProvider.state('identity.backend.user', {
                url: '/user',
                redirectTo: 'identity.backend.user.read',
                resolve: {
                    userService: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('/app/jarvis/identity/users/user.service.js');
                    }]
                }
            });

            $stateProvider.state('identity.backend.user.read', {
                url: '/read',
                component: 'uiUserRead',
                data: {
                    authorize: ['User_Read'],
                },
                resolve: {
                    userReadController: ['$ocLazyLoad', 'componentService', function ($ocLazyLoad, componentService) {
                        return $ocLazyLoad.load(componentService.getControllerUrl('uiUserRead', '/app/identity/users/user-read.controller.js'));
                    }]
                }
            });

            $stateProvider.state('identity.backend.user.create', {
                component: 'uiUserCreate',
                url: '/create',
                data: {
                    authorize: ['User_Create'],
                },
                resolve: {
                    userCreateController: ['$ocLazyLoad', 'componentService', function ($ocLazyLoad, componentService) {
                        return $ocLazyLoad.load(componentService.getControllerUrl('uiUserCreate', '/app/identity/users/user-create.controller.js'));
                    }],
                    roleService: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('/app/jarvis/identity/roles/role.service.js');
                    }]
                }
            });

            $stateProvider.state('identity.backend.user.update', {
                component: 'uiUserUpdate',
                url: '/update/:id',
                data: {
                    authorize: ['User_Update'],
                },
                resolve: {
                    userUpdateController: ['$ocLazyLoad', 'componentService', function ($ocLazyLoad, componentService) {
                        return $ocLazyLoad.load(componentService.getControllerUrl('uiUserUpdate', '/app/identity/users/user-update.controller.js'));
                    }],
                    roleService: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('/app/jarvis/identity/roles/role.service.js');
                    }]
                }
            });
        });
}());