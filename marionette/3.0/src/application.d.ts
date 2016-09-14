/// <reference path="../../../backbone/backbone.d.ts" />


declare namespace Marionette{
    /**
     * The Backbone.Marionette.Application object is the hub of your composite
     * application. It organizes, initializes and coordinates the various pieces
     * of your app. It also provides a starting point for you to call into from
     * your HTML script block, or directly from your JavaScript files if you
     * prefer to go that route. The Application is meant to be instantiated
     * directly, although you can extend it to add your own functionality.
     */
    class Application extends Backbone.Events {

        constructor(options?: any);

        /**
         * The Event Aggregator is available through this property. It is
         * convenient for passively sharing information between pieces of your
         * application as events occur.
         * Note! To access this application channel from other objects within your
         * app you are encouraged to get a handle of the systems through the
         * Wreqr API instead of the Application instance itself.
         */
        vent: Backbone.Wreqr.EventAggregator;

        /**
         * Commands are used to make any component tell another component to
         * perform an action without a direct reference to it.
         */
        commands: Backbone.Wreqr.Commands;

        /**
         * Request Response is a means for any component to request information
         * from another component without being tightly coupled.
         */
        reqres: Backbone.Wreqr.RequestResponse;

        submodules: any;

        /** Command execution, facilitated by Backbone.Wreqr.Commands */
        execute(...args: any[]): void;

        /** Request/response, facilitated by Backbone.Wreqr.RequestResponse */
        request(...args: any[]): any;

        /** Deprecated! Initializers, you should use events to manage start-up logic. */
        addInitializer(initializer: any): void;

        /**
         * Once you have your application configured, you can kick everything off
         * by calling this method.
         * @param options This parameter will be passed to each of your initializer functions, as well as the initialize events. This allows you to provide extra configuration for various parts of your app throughout the initialization sequence.
         */
        start(options?: any): void;

        /** Deprecated! nstead of using the Application as the root of your view tree, you should use a Layout View.*/
        addRegions(regions: any): any;

        /** Deprecated! nstead of using the Application as the root of your view tree, you should use a Layout View.*/
        emptyRegions(): void;

        /** Deprecated! nstead of using the Application as the root of your view tree, you should use a Layout View.*/
        removeRegion(region: Region): void;

        /** Deprecated! nstead of using the Application as the root of your view tree, you should use a Layout View.*/
        getRegion(regionName: string): Region;

        /**
         * Called just before the Application starts and before the initializers are executed.
         */
        onBeforeStart(options?: any): void;

        /**
         * Called after the Application has started and after the initializers have been executed.
         */
        onStart(options?: any): void;
    }
}
