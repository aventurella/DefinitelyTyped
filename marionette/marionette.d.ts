// Type definitions for Marionette
// Project: https://github.com/marionettejs/
// Definitions by: Zeeshan Hamid <https://github.com/zhamid>, Natan Vivo <https://github.com/nvivo>, Sven Tschui <https://github.com/sventschui>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference path="../backbone/backbone.d.ts" />

declare namespace Marionette {

    type BaseView = Marionette.View<Backbone.Model>
    type NewableView<TModel extends Backbone.Model> = new (options?: any) => View<TModel> | CollectionView<TModel>;
    type ChildView<TModel extends Backbone.Model> = View<TModel> | CollectionView<TModel> | ((TModel) => NewableView<TModel>);


    var DEV_MODE: boolean;
    var FEATURES: any;
    var VERSION: string;

    interface BaseOptions {
      el?: any;
      events?: {[selector: string]: string};
      id?: string;
      className?: string;
      tagName?: string;
      attributes?: {[id: string]: any};
    }

    interface CollectionOptions<TModel extends Backbone.Model> extends BaseOptions {
        collection?: Backbone.Collection<TModel>;
        model?: Backbone.Model;
    }

    interface ModelOptions<TModel extends Backbone.Model> extends BaseOptions {
      model?: TModel;
    }

    function bindEvents(context: any, entity: any, bindings: any): any;
    function unbindEvents(context: any, entity: any, bindings: any): any;
    function bindRequests(context: any, channel: any, bindings: any): any;
    function unbindRequests(context: any, channel: any, bindings: any): any;
    function mergeOptions(context: any, options: any, keys: any): any;
    function getOption(context: any, optionName: string): any;
    function normalizeMethods(context: any): any;
    function extend(properties: any, classProperties?: any): any;
    function isNodeAttached(el: any): boolean;
    function deprecate(message: string | {prev: string, next: string, url: string}, test: boolean): any;
    function triggerMethod(context: any, event: string, ...args: any[]): any;
    function triggerMethodOn(context: any, event: string, ...args: any[]): any;
    function isEnabled(name: string): boolean;
    function setEnabled(name: string, state: any): void;
    function monitorViewEvents(view: any): any;

    /**
     * The Renderer object was extracted from the ItemView rendering process, in
     * order to create a consistent and re-usable method of rendering a template
     * with or without data.
     */
    class Renderer {
        /**
         *  This method returns a string containing the result of applying the
         * template using the data object as the context.
         * @param template The template to render. If this is a function this is
         * treated as a pre-compiled template and does not try to compile it again. This
         * allows any view that supports a template parameter to specify a pre-compiled
         * template function as the template setting. The template function does not
         * have to be any specific template engine. It only needs to be a function
         * that returns valid HTML as a string from the data parameter passed to
         * the function.
         */
        static render(template: any, data: any): string;
    }


    interface AppRouterOptions extends Backbone.RouterOptions {
        appRoutes?: any;
        controller?: any;
    }

    /**
     * Reduce the boilerplate code of handling route events and then calling a
     * single method on another object. Have your routers configured to call
     * the method on your object, directly.
     */
    class AppRouter extends Backbone.Router implements CommonMixin {

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
        showView(view: any, ...args: any[]);
        getView(): Backbone.View<Backbone.Model>;
        start(options?: any): this;
    }

    interface BehaviorOptions{
        collectionEvents?: any;
        events?: any;
        modelEvents?: any;
        triggers?: any;
        ui?: any;
    }

    /**
     * A Behavior is an isolated set of DOM /
     * user interactions that can be mixed into any View.
     * Behaviors allow you to blackbox View specific interactions
     * into portable logical chunks, keeping your views simple and your code DRY.
     */
    class Behavior extends Marionette.Object implements DelegateEntityEventsMixin, TriggersMixin, UIMixin {
        cidPrefix: string;
        view: any;
        defaults: any;
        triggers: any;
        ui: any;
        options: any;
        el: any;
        $el: JQuery;

        constructor(options?: any, view?: any);

        // UIMixin
        normalizeUIKeys(hash: {[key: string]: string}): any;
        normalizeUIValues(hash: {[key: string]: string}, properties: any)

        /**
         * $ is a direct proxy of the views $ lookup method.
         */
        $(selector: any): JQuery;

        destroy(): this;
        proxyViewProperties(): this;
        bindUIElements(): this;
        unbindUIElements(): this;
        getUI(name: string): any;
        delegateEntityEvents(): this;
        undelegateEntityEvents(): this;
        getEvents(): any;
        getTriggers(): any;

    }

    /**
     * Marionette.Behaviors' is a utility class that takes care of glueing your
     * behavior instances to their given View. The most important part of this
     * class is that you MUST override the class level behaviorsLookup method or
     * set the option behaviorClass for things to work properly.
     */
    class Behaviors {
        /**
         * Placeholder method to be extended by the user.
         * The method should define the object that stores the behaviors.
         * i.e.
         * ```js
         * Marionette.Behaviors.behaviorsLookup: function() {
         *     return App.Behaviors
         * }
         * ```
         * _DEPRECATED: The behaviorsLookup is deprecated pending
         * removal. See the documentation for Behavior to learn how to
         * map behaviors to views in Marionette 3.
         */
        static behaviorsLookup(): any;

        /**
         * Takes care of getting the behavior class
         * given options and a key.
         * If a user passes in options.behaviorClass
         * default to using that.
         * If a user passes in a Behavior Class directly, use that
         * Otherwise delegate the lookup to the users `behaviorsLookup` implementation.
         */
        static getBehaviorClass(options: any, key: string): any;
    }



    class Container {

        constructor(initialViews?: BaseView[]);

        add(view: BaseView, customIndex?: number): void;
        findByModel<TModel extends Backbone.Model>(model: TModel): View<TModel>;
        findByModel(model: any): any;
        findByModelCid(modelCid: string): BaseView;
        findByCustom(index: number): BaseView;
        findByIndex(index: number): BaseView;
        findByCid(cid: string): BaseView;
        remove(view: BaseView): void;

        // mixins from underscore (copied from underscore)
        all(iterator: (element: BaseView, index: number) => boolean, context?: any): boolean;
        any(iterator: (element: BaseView, index: number) => boolean, context?: any): boolean;
        contains(value: any): boolean;
        detect(iterator: (item: any) => boolean, context?: any): any;
        each(iterator: (element: BaseView, index: number, list?: any) => void, context?: any): any;
        every(iterator: (element: BaseView, index: number) => boolean, context?: any): boolean;
        filter(iterator: (element: BaseView, index: number) => boolean, context?: any): BaseView[];
        find(iterator: (element: BaseView, index: number) => boolean, context?: any): BaseView;
        first(): BaseView;
        forEach(iterator: (element: BaseView, index: number, list?: any) => void, context?: any): void;
        include(value: any): boolean;
        initial(): BaseView;
        initial(n: number): BaseView[];
        invoke(methodName: string, args?: any[]): any;
        isEmpty(object: any): boolean;
        last(): BaseView;
        last(n: number): BaseView[];
        map<U>(iterator: (element: BaseView, index: number, context?: any) => U, context?: any): U[];
        pluck(attribute: string): any[];
        reject(iterator: (element: BaseView, index: number) => boolean, context?: any): BaseView[];
        rest(): BaseView;
        rest(n: number): BaseView[];
        reduce(iterator: any, memo?: any, context?: any);
        select(iterator: any, context?: any): any[];
        some(iterator: (element: BaseView, index: number) => boolean, context?: any): boolean;
        toArray(): any[];
        without(...values: any[]): BaseView[];
    }

    interface CollectionViewOptions<TModel extends Backbone.Model> extends CollectionOptions<TModel> {
        behaviors?: any;
        childView?: ChildView<TModel>;
        childViewEventPrefix?: string;
        childViewEvents?: any;
        childViewOptions?: any;
        childViewTriggers?: any;
        collectionEvents?: any;
        events?: any;
        filter?: (child: TModel, index: number, collection: Backbone.Collection<TModel>) => boolean;
        emptyView?: any;
        emptyViewOptions?: any;
        modelEvents?: any;
        triggers?: any;
        ui?: any;
        viewComparator?: any;

        /**
         * By default the CollectionView will maintain a sorted collection's order
         * in the DOM. This behavior can be disabled by specifying {sort: false}
         * on initialize.
         */
        sort?: boolean;

        /**
         * This option is useful when you have performance issues when you
         * resort your CollectionView. Without this option, your CollectionView
         * will be completely re-rendered, which can be costly if you have a
         * large number of elements or if your ChildViews are complex. If this
         * option is activated, when you sort your Collection, there will be no
         * re-rendering, only the DOM nodes will be reordered. This can be a
         * problem if your ChildViews use their collection's index in their
         * rendering. In this case, you cannot use this option as you need to
         * re-render each ChildView.
         *
         * If you combine this option with a filter that changes the views that
         * are to be displayed, reorderOnSort will be bypassed to render new
         * children and remove those that are rejected by the filter.
         */
        reorderOnSort?: boolean;
    }

    /**
     * The CollectionView will loop through all of the models in the specified
     * collection, render each of them using a specified childView, then append
     * the results of the child view's el to the collection view's el. By
     * default the CollectionView will maintain a sorted collection's order in the
     * DOM. This behavior can be disabled by specifying {sort: false} on
     * initialize.
     */
    class CollectionView<TModel extends Backbone.Model> extends Backbone.View<Backbone.Model> {
        sort: boolean;
        viewComparator: any;
        filter: (child: TModel, index: number, collection: Backbone.Collection<TModel>) => boolean;

        constructor(options?: CollectionViewOptions<TModel>);

        /**
         * This can be a function or a class. Importantly, it can be a function
         * that returns any class. The implication is that the underlying
         * storage Container needs to store these views as genericly as possible
         * You can see in the documentation here:
         * https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.collectionview.md#collectionviews-childview
         * that it can return a FooView or a BarView.
         *
         * It is this abaility that drove the type def choices for Container.
         */
        childView: ChildView<TModel>

        /**
         * There may be scenarios where you need to pass data from your parent
         * collection view in to each of the childView instances. To do this,
         * provide a childViewOptions definition on your collection view as an
         * object literal. This will be passed to the constructor of your childView
         * as part of the options.
         *
         * You can also specify the childViewOptions as a function, if you need to
         * calculate the values to return at runtime. The model will be passed
         * into the function should you need access to it when calculating
         * childViewOptions. The function must return an object, and the attributes of
         * the object will be copied to the childView instance's options.
         */
        childViewOptions: (model: TModel, index: number) => any | any;

        /**
         * You can customize the event prefix for events that are forwarded through
         * the collection view. To do this, set the childViewEventPrefix on the
         * collection view.
         */
        childViewEventPrefix: string;

        /**
         * You can specify a childEvents hash or method which allows you to
         * capture all bubbling childEvents without having to manually set bindings.
         * The keys of the hash can either be a function or a string that is the
         * name of a method on the collection view.
         */
        childEvents: any;

        /**
         * When a collection has no children, and you need to render a view other than
         * the list of childViews, you can specify an emptyView attribute on your collection
         * view.
         */
        emptyView: View<any> | CollectionView<any> | (new (options?: any) => View<any> | CollectionView<any>);

        /**
         * Similar to childView and childViewOptions, there is an emptyViewOptions
         * property that will be passed to the emptyView constructor. It can be
         * provided as an object literal or as a function. If emptyViewOptions
         * aren't provided the CollectionView will default to passing the
         * childViewOptions to the emptyView.
         */
        emptyViewOptions: any | ((model: Backbone.Model, index: number) => any);

        /**
         * The CollectionView uses Backbone.BabySitter to store and manage its
         * child views. This allows you to easily access the views within the
         * collection view, iterate them, find them by a given indexer such as the
         * view's model or collection, and more.
         */
        children: Container;

        /**
         * The render method of the collection view is responsible for rendering the
         * entire collection. It loops through each of the children in the collection
         * and renders them individually as an childView.
         */
        render(): this;

        /**
         * An efficient rendering used for filtering. Instead of modifying the whole DOM for the
         * collection view, we are only adding or removing the related childrenViews.
         */
        setFilter(filter: any, options?: {preventRender: boolean}): this;

        /**
         * `removeFilter` is actually an alias for removing filters.
         */
        removeFilter(options: any): any;

        /**
         * Reorder DOM after sorting. When your element's rendering do not use their index,
         * you can pass reorderOnSort: true to only reorder the DOM after a sort instead of
         * rendering all the collectionView.
        */
        reorder(): this;

        /**
        * Render view after sorting. Override this method to change how the view renders
        * after a `sort` on the collection.
        */
        resortView(): this;

        getViewComparator(): any;

        /**
         * Render the child's view and add it to the HTML for the collection view at a given index.
         * This will also update the indices of later views in the collection in order to keep the
         * children in sync with the collection.
        */
        addChildView(view: any, index: number): any;

        /**
         * Build a `childView` for a model in the collection.
         */
        buildChildView(child: any, ChildViewClass: any, childViewOptions: any): any;

        /**
         * Remove the child view and destroy it. This function also updates the indices of later views
         * in the collection in order to keep the children in sync with the collection.
        */
        removeChildView(view: any): any;

        /**
         * check if the collection is empty or optionally whether an array of pre-processed models is empty
         */
        isEmpty(options: any): boolean;

        /**
         * Append the HTML to the collection's `el`. Override this method to do something other
         * than `.append`.
        */
        attachHtml(collectionView: CollectionView<TModel>, childView: any, index: number): void
    }

    interface CompositeViewOptions<TModel extends Backbone.Model> extends CollectionOptions<TModel> {
        childViewContainer: any;
        template: any;
        templateContext: any;
    }

    /**
     * CompositeView is Deprecated. It extends CollectionView but it's API
     * is different.
     */
    class CompositeView<TModel extends Backbone.Model> extends CollectionView<TModel> {

        constructor(options?: CompositeViewOptions<TModel>);

        // Select View Mixins
        serializeModel(): any;
        getTemplate(): any;
        mixinTemplateContext(): any;
        attachElContent(html: any): this;

        /**
         * Return the serialized model
         */
        serializeData(): any;

        /**
        * Renders the view.
        */
        render(): this;

        renderChildren(): void

        /**
         * You might need to override this if you've overridden attachHtml
         */
        attachBuffer(compositeView: any, buffer: any): void;

        /**
         * Internal method to ensure an `$childViewContainer` exists, for the
         * `attachHtml` method to use.
         */
        getChildViewContainer(containerView: any, childView: any): JQuery

        /**
         * Internal method to reset the `$childViewContainer` on render
         */
        resetChildViewContainer(): void
    }

    interface ErrorOptions{
        description: string;
        fileName: string;
        lineNumber: number;
        name: string;
        message: string;
        number: number;
    }

    class Error {
        constructor(message: string, options: ErrorOptions);
    }

    interface BehaviorMixin{

    }

    interface CommonMixin{
        normalizeMethods(hash: string): {[key: string]: any};
        mergeOptions(options: any, keys: any): any;
        getOption(optionName: string): any;
        bindEvents(entity: any, bindings: any): any
        unbindEvents(entity: any, bindings: any): any
    }

    interface DelegateEntityEventsMixin {

    }

    interface RadioMixin{
        bindRequests(channel: any, bindings: any): any;
        unbindRequests(channel: any, bindings: any): any;
        bindEvents(entity: any, bindings: any): any;
        unbindEvents(entity: any, bindings: any): any;
        getChannel(): any;
    }

    interface RegionMixin{
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
    }

    interface TriggersMixin{

    }

    interface UIMixin{
        normalizeUIKeys(hash: {[key: string]: string}): any;
        normalizeUIValues(hash: {[key: string]: string}, properties: any)
    }

    interface ViewMixin{
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
    }

    interface ObjectOptions {
      channelName?: any;
      radioEvents?: any;
      radioRequests?: any;
    }

    /**
     * A base class which other classes can extend from. Object incorporates many
     * backbone conventions and utilities like initialize and Backbone.Events.
     */
    class Object extends Backbone.Events implements CommonMixin, RadioMixin {
        /**
         * Initialize is called immediately after the Object has been instantiated,
         * and is invoked with the same arguments that the constructor received.
         */
        isDestroyed(): boolean
        initialize(options?: ObjectOptions): void;

        // CommonMixins
        normalizeMethods(hash: string): {[key: string]: any};
        mergeOptions(options: any, keys: any): any;
        getOption(optionName: string): any;
        bindEvents(entity: any, bindings: any): any
        unbindEvents(entity: any, bindings: any): any

        // RadioMixins
        bindRequests(channel: any, bindings: any): any;
        unbindRequests(channel: any, bindings: any): any;
        bindEvents(entity: any, bindings: any): any;
        unbindEvents(entity: any, bindings: any): any;
        getChannel(): any;

        triggerMethod(event: string, ...args: any[]): any;
        /**
         * Objects have a destroy method that unbind the events that are directly
         * attached to the instance. Invoking the destroy method will trigger a
         * "before:destroy" event and corresponding onBeforeDestroy method call.
         * These calls will be passed any arguments destroy was invoked with.
         * @param args any arguments to pass to the "before:destory" event and call to
         * onBeforeDestroy.
         */
        destroy(...args: any[]): void;
    }

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

    /**
     * The TemplateCache provides a cache for retrieving templates from script blocks
     * in your HTML. This will improve the speed of subsequent calls to get a template.
     */
    class TemplateCache {
        static templateCaches: any;

        /**
         * To use the TemplateCache, call the get method on TemplateCache directly. Internally, instances of the TemplateCache class will be created and stored but you do not have to manually create these instances yourself. get will return a compiled template function.
         */
        static get(templateId: string, options: any): any;

        /**
         * You can clear one or more, or all items from the cache using the clear
         * method. Clearing a template from the cache will force it to re-load
         * from the DOM the next time it is retrieved.
         * @param  the templateId used for loading / caching of the templates to clear. If none specified, all templates will be cleared from the cache.
         */
        static clear(...args: string[]): void;

        /**
         * Internal method to load the template
         */
        load(options): any

        /**
         * Load a template from the DOM, by default. Override
         * this method to provide your own template retrieval
         * For asynchronous loading with AMD/RequireJS, consider
         * using a template-loader plugin as described here:
         * https://github.com/marionettejs/backbone.marionette/wiki/Using-marionette-with-requirejs
         */
        loadTemplate(templateId: string, options: any): any;

        /**
         * Pre-compile the template before caching it. Override
         * this method if you do not need to pre-compile a template
         * (JST / RequireJS for example) or if you want to change
         * the template engine used (Handebars, etc).
         */
        compileTemplate(rawTemplate: any, options: any): any;
    }

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

declare module 'backbone.marionette' {
    import Backbone = require('backbone');
    export = Marionette;
}
