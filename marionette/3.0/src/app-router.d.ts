/// <reference path="../../../backbone/backbone.d.ts" />

declare namespace Marionette{

    interface AppRouterOptions extends Backbone.RouterOptions {
        appRoutes?: any;
        controller?: any;
    }

    /**
     * Reduce the boilerplate code of handling route events and then calling a
     * single method on another object. Have your routers configured to call
     * the method on your object, directly.
     */
    class AppRouter extends Backbone.Router implements CommonMixins{

        /**
         * Configure an AppRouter with appRoutes. The route definition
         * is passed on to Backbone's standard routing handlers. This means
         * that you define routes like you normally would. However, instead of
         * providing a callback method that exists on the router, you provide a
         * callback method that exists on the controller, which you specify for
         * the router instance (see below.)
         */
        constructor(options?: AppRouterOptions);

        // CommonMixins
        normalizeMethods(hash: string): {[key: string]: any};
        mergeOptions(options: any, keys: any): any;
        getOption(optionName: string): any;
        bindEvents(entity: any, bindings: any): any
        unbindEvents(entity: any, bindings: any): any

        /**
         * Similar to route method on a Backbone Router but
         * method is called on the controller
         */
        appRoute(route: string, methodName: string): this;

        /**
         * Internal method to process the `appRoutes` for the
         * router, and turn them in to routes that trigger the
         */
        processAppRoutes(controller: any, appRoutes: any): this;

        triggerMethod(event: string, ...args: any[]): any;

    }
}
