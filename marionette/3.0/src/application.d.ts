declare namespace Marionette{
    interface ApplicationOptions{
        region?: any,
        regionClass?: new (options?: RegionOptions) => Region
    }

    /**
     * A container for a Marionette application.
     */
    class Application extends Marionette.Object {
        cidPrefix: string;
        _region: Region;
        regionClass: new (options?: RegionOptions) => Region

        constructor(options?: any);

        _initRegion(options: any): void;
        getRegion(): Region;
        showView(view: any, ...args: any[]);
        getView(): Backbone.View<Backbone.Model>;
        start(options?: any): this;
    }
}
