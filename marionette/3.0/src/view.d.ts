/// <reference path="../../../backbone/backbone.d.ts" />


declare namespace Marionette{
    interface ViewOptions<T extends Backbone.Model> extends ModelOptions<T>{
        behaviors?: any
        childViewEventPrefix?: any
        childViewEvents?: any
        childViewTriggers?: any
        collectionEvents?: any
        events?: any
        modelEvents?: any
        regionClass?: any
        regions?: any
        template?: any
        templateContext?: any
        triggers?: any
        ui?: any
    }

    /**
     * The standard view. Includes view events, automatic rendering
     * of Underscore templates, nested views, and more.
     */
    class View<TModel extends Backbone.Model> extends Backbone.View<TModel> implements ViewMixin, RegionMixin {

        constructor(options?: ViewOptions<TModel>);

        // ViewMixin
        supportsRenderLifecycle: boolean;
        supportsDestroyLifecycle: boolean;
        setElement(): this;
        delegateEvents(eventsArg: any): this;
        getTriggers(): any;
        delegateEntityEvents(): this;
        undelegateEntityEvents(): this;
        destroy(...args: any[]): this;
        bindUIElements(): this;
        unbindUIElements(): this;
        getUI(name: string): any;
        childViewEventPrefix: string;
        triggerMethod(event: string, ...args: any[]): any;

        // RegionMixin
        addRegion(name: string, definition: Region): any
        addRegions(regions: Region[]): any
        removeRegion(name: string): any;
        removeRegions(): Region[];
        emptyRegions(): Region[];
        hasRegion(name: string): boolean;
        getRegion(name: string): Region;
        getRegions(): Region[];
        showChildView(name: string, view: View<Backbone.Model>, ...args: any[]);
        getChildView<T extends View<Backbone.Model>>(name: string): T;

        serializeData(): any;

        /**
         * Prepares the special `model` property of a view
         * for being displayed in the template. By default
         * we simply clone the attributes. Override this if
         * you need a custom transformation for your view's model
         */
        serializeModel(): any;

        /**
         * Serialize a collection by cloning each of
         * it's model's attributes
         */
        serializeCollection(): any;

        /**
         * Render the view, defaulting to underscore.js templates.
         * You can override this in your view definition to provide
         * a very specific rendering for your view. In general, though,
         * you should override the `Marionette.Renderer` object to
         * change how Marionette renders views.
         * Subsequent renders after the first will re-render all nested views.
         */
        render(): this;

        /**
         * Get the template for this view
         * instance. You can set a `template` attribute in the view
         * definition or pass a `template: "whatever"` parameter in
         * to the constructor options.
         */
        getTemplate(): any;

        /**
         * Mix in template context methods. Looks for a
         * `templateContext` attribute, which can either be an
         * object literal, or a function that returns an object
         * literal. All methods and attributes from this object
         * are copies to the object passed in.
         */
        mixinTemplateContext(): any;

        /**
         * Attaches the content of a given view.
         * This method can be overridden to optimize rendering,
         * or to render in a non standard way.
         *
         * For example, using `innerHTML` instead of `$el.html`
         *
         * ```js
         * attachElContent(html) {
         *   this.el.innerHTML = html;
         *   return this;
         * }
         * ```
         */
        attachElContent(html: any): this;
    }
}
