declare namespace Marionette{
    type NewableView<TModel extends Backbone.Model> = new (options?: any) => View<TModel> | CollectionView<TModel>;
    type ChildView<TModel extends Backbone.Model> = View<TModel> | CollectionView<TModel> | ((TModel) => NewableView<TModel>);

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
    class CollectionView<TModel extends Backbone.Model> extends Backbone.View<Backbone.Model> implements ViewMixin{
        sort: boolean;
        viewComparator: any;
        filter: (child: TModel, index: number, collection: Backbone.Collection<TModel>) => boolean;
        _isBuffering: boolean;

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

        constructor(options?: CollectionViewOptions<TModel>);

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
        _triggerEventOnParentLayout(eventName: string, ...args: any[]): void
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

        /**
         * Instead of inserting elements one by one into the page, it's much more performant to insert
         * elements into a document fragment and then insert that document fragment into the page
         */
        _startBuffering(): void;
        _endBuffering(): void;
        _getImmediateChildren(): any;

        /**
         * Configured the initial events that the collection view binds to.
         */
        _initialEvents()

         /**
          * Handle a child added to the collection
          */
        _onCollectionAdd(child: any, collection: any, opts?: any): void;
        _onCollectionRemove(model: any): void;

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
         * Calculate and apply difference by cid between `models` and `previousModels`.
         */
        _applyModelDeltas(models: any, previousModels: any): void;

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

        /**
         * Internal method. This checks for any changes in the order of the collection.
         * If the index of any view doesn't match, it will render.
         */
        _sortViews(): void;
        /**
         * Internal method. Separated so that CompositeView can append to the childViewContainer
         * if necessary
         */
        _appendReorderedChildren(children: any): void;
        _renderChildren(): void;
        _showCollection(models: any): void;
        _filteredSortedModels(addedAt: any): any;

        getViewComparator(): any;
        _filterModels(models: any): any;
        _sortModelsBy(models: any, comparator:any): any;

        /**
         * Internal method to show an empty view in place of a collection of child views,
         * when the collection is empty
         */
        _showEmptyView(): void;

        /**
         * Internal method to destroy an existing emptyView instance if one exists. Called when
         * a collection view has been rendered empty, and then a child is added to the collection.
         */
        _destroyEmptyView()

        /**
         * Retrieve the `childView` class
         * The `childView` property can be either a view class or a function that
         * returns a view class. If it is a function, it will receive the model that
         * will be passed to the view instance (created from the returned view class)
         */
        _getChildView(child: any): any

        /**
         * First check if the `view` is a view class (the common case)
         * Then check if it's a function (which we assume that returns a view class)
         */
        _getView(view: any, child: any): any;

        /**
         * Internal method for building and adding a child view
         */
        _addChild(child: any, ChildView: any, index: any): any
        _getChildViewOptions(child: any, index: any): any;

        /**
         * Render the child's view and add it to the HTML for the collection view at a given index.
         * This will also update the indices of later views in the collection in order to keep the
         * children in sync with the collection.
        */
        addChildView(view: any, index: number): any;
        _updateIndices(view: any, increment: any, index: any): void
        _addChildView(view: any, index: any): void;

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
         * If empty, show the empty view
         */
        _checkEmpty(): void

        /**
         * You might need to override this if you've overridden attachHtml
         */
        attachBuffer(collectionView: any, buffer: any): void;

        /**
         * Create a fragment buffer from the currently buffered children
         */
        _createBuffer(): any;

        /**
         * Append the HTML to the collection's `el`. Override this method to do something other
         * than `.append`.
        */
        attachHtml(collectionView: CollectionView<TModel>, childView: any, index: number): void

        /**
         * Internal method. Check whether we need to insert the view into the correct position.
         */
        _insertBefore(childView: any, index: any): boolean;

        /**
         * Internal method. Append a view to the end of the $el
         */
        _insertAfter(childView: any): void;

        /**
         * Internal method to set up the `children` object for storing all of the child views
         */
        _initChildViewStorage(): void;

        /**
         * called by ViewMixin destroy
         */
        _removeChildren(): void;

        /**
         * Destroy the child views that this collection view is holding on to, if any
         */
        _destroyChildren(options?: {checkEmpty: boolean}): any;

        /**
         * Return true if the given child should be shown. Return false otherwise.
         * The filter will be passed (child, index, collection), where
         *  'child' is the given model
         *  'index' is the index of that model in the collection
         *  'collection' is the collection referenced by this CollectionView
         */
        _shouldAddChild(child: any, index: any): boolean;

        /**
         * Set up the child view event forwarding. Uses a "childview:" prefix in front of all forwarded events.
         */
        _proxyChildEvents(view: any): void;
    }
}
