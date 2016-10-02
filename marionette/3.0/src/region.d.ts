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
        cidPrefix: string;
        replaceElement: boolean;
        _isReplaced: boolean;
        el: any;
        $el: any;
        currentView: Backbone.View<Backbone.Model>;

        /**
         * You can specify an el for the region to manage at the time the region
         * is instantiated.
         */
        constructor(options?: RegionOptions);

        /**
         * Displays a backbone view instance inside of the region. Handles calling the `render`
         * method for you. Reads content directly from the `el` attribute. The `preventDestroy`
         * option can be used to prevent a view from the old view being destroyed on show.
         */
        show<TModel extends Backbone.Model>(view: Backbone.View<TModel>, options?: RegionShowOptions): this;
        _renderView(view: any): void;
        _attachView(view: any, options?: any): any;
        _ensureElement(options?: any): boolean;
        _ensureView(view): void;

        /**
         * Override this method to change how the region finds the DOM element that it manages. Return
         * a jQuery selector object scoped to a provided parent el or the document if none exists.
         */
        getEl(el: any): any;

        _replaceEl(view): void;
        /**
         * Restore the region's element in the DOM.
         */
        _restoreEl(): void;

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
        empty(options?: { allowMissingEl: boolean }): this;

        _removeView(view: any, options?: {preventDestroy: boolean}): void;
        _detachView(view: any): void;
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
        reset(options?: any): this;

        destroy(options?: any): any
    }
}
