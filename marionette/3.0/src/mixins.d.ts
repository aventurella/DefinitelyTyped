declare namespace Marionette{

    interface BehaviorsMixin{
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

    }

    interface CommonMixin{
        normalizeMethods(hash: string): {[key: string]: any};
        _setOptions(...args: any[]):void
        mergeOptions(options: any, keys: any): any;
        getOption(optionName: string): any;
        bindEvents(entity: any, bindings: any): any
        unbindEvents(entity: any, bindings: any): any
    }

    interface DelegateEntityEventsMixin {
        /**
         * Handle `modelEvents`, and `collectionEvents` configuration
         */
        _delegateEntityEvents(model: any, collection: any): void
        _undelegateEntityEvents(model: any, collection: any): void
    }

    interface RadioMixin{
        _initRadio(): void;
        _destroyRadio():void;
        getChannel(): any;
        bindEvents(entity: any, bindings: any): any;
        unbindEvents(entity: any, bindings: any): any;
        bindRequests(channel: any, bindings: any): any;
        unbindRequests(channel: any, bindings: any): any;
    }

    interface RegionMixin{
        /**
         * Internal method to initialize the regions that have been defined in a
         * `regions` attribute on this View.
         */
        _initRegions(): void;

        /**
         * Internal method to re-initialize all of the regions by updating
         * the `el` that they point to
         */
        _reInitRegions(): void;

        /**
         * Add a single region, by name, to the View
         */
        addRegion(name: string, definition: Region): any;

        /**
         * Add multiple regions as a {name: definition, name2: def2} object literal
         */
        addRegions(regions: Region[]): any;

        /**
         * internal method to build and add regions
         */
        _addRegions(regionDefinitions: any): any;

        /**
         * return the region instance from the definition
         */
        _buildRegion(definition: any): any

        _buildRegionFromDefinition(definition: any): any;
        _buildRegionFromObject(definition: any): any;
        _buildRegionFromRegionClass(RegionClass): any;
        _addRegion(region: any, name: any): void;

        /**
         * Remove a single region from the View, by name
         */
        removeRegion(name: string): any;

        /**
         * Remove all regions from the View
         */
        removeRegions(): Region[];
        _removeRegion(region: any, name: any): void;
        emptyRegions(): Region[];
        hasRegion(name: string): boolean;
        getRegion(name: string): Region;
        getRegions(): Region[];
        showChildView(name: string, view: View<Backbone.Model>, ...args: any[]);
        getChildView<T extends View<Backbone.Model>>(name: string): T;
    }

    interface TriggersMixin{
        /**
         * Configure `triggers` to forward DOM events to view
         * events. `triggers: {"click .foo": "do:foo"}`
         */
        _getViewTriggers(view: any, triggers: any): any
    }

    interface UIMixin{
        _ui: any;

        normalizeUIKeys(hash: {[key: string]: string}): any;
        normalizeUIValues(hash: {[key: string]: string}, properties: any)
        _getUIBindings(): any

        /**
         * This method binds the elements specified in the "ui" hash inside
         * the view's code with the associated jQuery selectors.
         */
        _bindUIElements(): void;
        _unbindUIElements(): void;
        _getUI(name: string): any;
    }

    interface ViewMixin extends BehaviorsMixin, CommonMixin, DelegateEntityEventsMixin, TriggersMixin,  UIMixin{
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
        _triggerEventOnParentLayout(eventName: string, ...args: any[]): void

        /**
         * Walk the _parent tree until we find a view (if one exists).
         * Returns the parent view hierarchically closest to this view.
         */
        _parentView(): any;
    }
}
