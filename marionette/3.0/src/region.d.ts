declare namespace Marionette {

    interface RegionShowOptions {
        /**
         * If you replace the current view with a new view by calling show, by
         * default it will automatically destroy the previous view. You can
         * prevent this behavior by setting this option to true.
         */
        preventDestroy?: boolean;

        /**
         * If you re-call show with the same view, by default nothing will happen
         * because the view is already in the region. You can force the view to be
         * re-shown by setting this option to true.
         */
        forceShow?: boolean;

        /**
         * Regions that are attached to the document when you execute show are
         * special in that the views that they show will also become attached
         * to the document. These regions fire a pair of triggerMethods on all
         * of the views that are about to be attached � even the nested ones.
         * This can cause a performance issue if you're rendering hundreds or
         * thousands of views at once.
         * If you think these events might be causing some lag in your app, you
         * can selectively turn them off with the triggerBeforeAttach
         * and triggerAttach properties.
         */
        triggerBeforeAttach?: boolean;

        /**
         * Regions that are attached to the document when you execute show are
         * special in that the views that they show will also become attached
         * to the document. These regions fire a pair of triggerMethods on all
         * of the views that are about to be attached � even the nested ones.
         * This can cause a performance issue if you're rendering hundreds or
         * thousands of views at once.
         * If you think these events might be causing some lag in your app, you
         * can selectively turn them off with the triggerBeforeAttach
         * and triggerAttach properties.
         */
        triggerAttach?: boolean;
    }

    interface RegionOptions{
        allowMissingEl?: any,
        parentEl?: any,
        replaceElement?: any,

        /**
         * Specifies the element for the region to manage. This may be
         * a selector string, a raw DOM node reference or a jQuery wrapped
         * DOM node.
         */
        el?: any;
    }

    /**
     * Regions provide consistent methods to manage, show and destroy views in
     * your applications and layouts. They use a jQuery selector to show your
     * views in the correct place.
     */
    class Region extends Marionette.Object {

        el: any;
        $el: any;
        currentView: Backbone.View<Backbone.Model>;

        /**
         * Build an instance of a region by passing in a configuration object and
         * a default region class to use if none is specified in the config.
         * The config object should either be a string as a jQuery DOM selector,
         * a Region class directly, or an object literal that specifies a selector,
         * a custom regionClass, and any options to be supplied to the region
         */
        static buildRegion(regionConfig: any, defaultRegionType: any): Region;

        /**
         * You can specify an el for the region to manage at the time the region
         * is instantiated.
         */
        constructor(options?: RegionOptions);

        /**
         * Renders and displays the specified view in this region.
         * @param view the view to display.
         */
        show<TModel extends Backbone.Model>(view: Backbone.View<TModel>, options?: RegionShowOptions): this;

        getEl(el: any): any;

        /**
         * Check to see if the region's el was replaced.
         */
        isReplaced(): boolean;

        /**
         * Override this method to change how the new view is appended to the `$el` that the
         * region is managing
         */
        attachHtml<TModel extends Backbone.Model>(view: Backbone.View<TModel>, shouldReplace: boolean): void;

        /**
         * Destroy the current view, if there is one. If there is no current view, it does
         * nothing and returns immediately.
         */
        empty(options: { allowMissingEl: boolean }): this;

        /**
         * Override this method to change how the region detaches current content
         */
        detachHtml(): void

        /**
         * Checks whether a view is currently present within the region. Returns `true` if there is
         * and `false` if no view is present.
         */
        hasView(): boolean;


        /**
         * Reset the region by destroying any existing view and clearing out the cached `$el`.
         * The next time a view is shown via this region, the region will re-query the DOM for
         * the region's `el`.
         */
        reset(options: any): this;

        destroy(options: any): any
    }
}
