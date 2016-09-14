/// <reference path="../../../backbone/backbone.d.ts" />

declare namespace Marionette{
    interface AppRouterOptions extends Backbone.RouterOptions {
        /**
         * The appRoutes.
         */
        appRoutes?: any;

        /**
         * The controller to associate with this router.
         */
        controller?: any;
    }

    /**
     * Reduce the boilerplate code of handling route events and then calling a
     * single method on another object. Have your routers configured to call
     * the method on your object, directly.
     */
    class AppRouter extends Backbone.Router {

        /**
         * Configure an AppRouter with appRoutes. The route definition
         * is passed on to Backbone's standard routing handlers. This means
         * that you define routes like you normally would. However, instead of
         * providing a callback method that exists on the router, you provide a
         * callback method that exists on the controller, which you specify for
         * the router instance (see below.)
         */
        constructor(options?: AppRouterOptions);

        /**
         * You can specify a controller with the multiple routes at runtime with
         * this method. However, In this case the current controller of AppRouter
         * will not change.
         */
        processAppRoutes(controller: any, appRoutes: any): void;

        /**
         * Adds an app route at runtime to this instance. It works the same as the
         * built-in router.route() call from Backbone's Router, but has all the
         * same semantics and behavior of the appRoutes configuration.
         */
        appRoute(route: string, methodName: string): void;
    }
}
