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
        // ViewMixin ins also BehaviorsMixin, CommonMixin,
        // DelegateEntityEventsMixin, TriggersMixin, UIMixin
        supportsRenderLifecycle: boolean;
        supportsDestroyLifecycle: boolean;
        _parent: any;
        _isDestroyed: boolean;
        isDestroyed(): boolean;
        _isRendered: boolean;
        isRendered(): boolean;
        _isAttached: boolean;
        isAttached(): boolean;
        setElement(): this;
        delegateEvents(eventsArg: any): this;
        _getEvents(): any;
        getTriggers(): any;
        delegateEntityEvents(): this;
        undelegateEntityEvents(): this;
        _ensureViewIsIntact(): void;
        destroy(...args: any[]): this;
        bindUIElements(): this;
        unbindUIElements(): this;
        getUI(name: string): any;
        childViewEventPrefix: string;
        triggerMethod(event: string, ...args: any[]): any;
        _buildEventProxies(): void;
        _triggerEventOnParentLayout(eventName: string, ...args: any[]): void;
        _parentView(): any;

        // ViewMixin.BehaviorsMixin
        _initBehaviors(): void;
        _getBehaviorTriggers(): any;
        _getBehaviorEvents(): any;
        _proxyBehaviorViewProperties(): void;
        _delegateBehaviorEntityEvents(): void;
        _undelegateBehaviorEntityEvents(): void;
        _destroyBehaviors(): void;
        _bindBehaviorUIElements(): void;
        _unbindBehaviorUIElements(): void;
        _triggerEventOnBehaviors(): void;

        // ViewMixin.CommonMixin
        normalizeMethods(hash: string): {[key: string]: any};
        _setOptions(...args: any[]):void
        mergeOptions(options: any, keys: any): any;
        getOption(optionName: string): any;
        bindEvents(entity: any, bindings: any): any
        unbindEvents(entity: any, bindings: any): any

        // ViewMixin.DelegateEntityEventsMixin
        _delegateEntityEvents(model: any, collection: any): void
        _undelegateEntityEvents(model: any, collection: any): void

        // ViewMixin.TriggersMixin
        _getViewTriggers(view: any, triggers: any): any

        // ViewMixin.UIMixin
        _ui: any;
        normalizeUIKeys(hash: {[key: string]: string}): any;
        normalizeUIValues(hash: {[key: string]: string}, properties: any)
        _getUIBindings(): any
        _bindUIElements(): void;
        _unbindUIElements(): void;
        _getUI(name: string): any;

        // RegionMixin
        _initRegions(): void;
        _reInitRegions(): void;
        addRegion(name: string, definition: Region): any;
        addRegions(regions: Region[]): any;
        _addRegions(regionDefinitions: any): any;
        _buildRegion(definition: any): any
        _buildRegionFromDefinition(definition: any): any;
        _buildRegionFromObject(definition: any): any;
        _buildRegionFromRegionClass(RegionClass): any;
        _addRegion(region: any, name: any): void;
        removeRegion(name: string): any;
        removeRegions(): Region[];
        _removeRegion(region: any, name: any): void;
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
         * Internal method to render the template with the serialized data
         * and template context via the `Marionette.Renderer` object.
         */
        _renderTemplate(): void

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

        /**
         * called by ViewMixin destroy
         */
        _removeChildren(): void;

        _getImmediateChildren(): any;
    }
}
