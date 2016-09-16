/// <reference path="../../../backbone/backbone.d.ts" />


declare namespace Marionette{
    interface ApplicationOptions{
        region?: any,
        regionClass?: any
    }

    /**
     * A container for a Marionette application.
     */
    class Application extends Marionette.Object {

        constructor(options?: any);

        getRegion(): Region;
        showView(view: any, ...args: any[]): Region;
        getView(): Backbone.View<Backbone.Model>;
        start(options?: any): this;
    }
}
