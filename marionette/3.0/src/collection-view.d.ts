/// <reference path="../../../backbone/backbone.d.ts" />
/// <reference path="./view.d.ts" />


declare namespace Marionette{
    interface CollectionViewOptions<TModel extends Backbone.Model> extends Backbone.ViewOptions<TModel> {

        behaviors?: any;
        childView?: any;
        childViewEventPrefix?: string;
        childViewEvents?: any;
        childViewOptions?: any;
        childViewTriggers?: any;
        collectionEvents?: any;
        events?: any;
        filter?: any;
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
    type NewableView<TModel extends Backbone.Model, TView extends View<Backbone.Model>> = new (options?: any) => TView;

    class CollectionView<TModel extends Backbone.Model, TView extends View<Backbone.Model>> extends View<TModel> {


        constructor(options?: CollectionViewOptions<TModel>);

        /**
         * Specify a childView in your collection view definition. This must be a
         * Backbone view object definition, not an instance. It can be any
         * Backbone.View or be derived from Marionette.ItemView
         */
        childView: TView | ((TModel) => NewableView<TModel, TView>);

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
        emptyView: () => Newable<Backbone.View<any>> | any;

        /**
         * Similar to childView and childViewOptions, there is an emptyViewOptions
         * property that will be passed to the emptyView constructor. It can be
         * provided as an object literal or as a function. If emptyViewOptions
         * aren't provided the CollectionView will default to passing the
         * childViewOptions to the emptyView.
         */
        emptyViewOptions: (model: Backbone.Model, index: number) => any | any;

        /**
         * The CollectionView uses Backbone.BabySitter to store and manage its
         * child views. This allows you to easily access the views within the
         * collection view, iterate them, find them by a given indexer such as the
         * view's model or collection, and more.
         */
        children: Backbone.ChildViewContainer<TView>;

        /**
         * The render method of the collection view is responsible for rendering the
         * entire collection. It loops through each of the children in the collection
         * and renders them individually as an childView.
         */
        render(): CollectionView<TModel, TView>;

        /**
         * The addChild method is responsible for rendering the childViews and
         * adding them to the HTML for the collectionView instance. It is also
         * responsible for triggering the events per ChildView. In most cases you
         * should not override this method.
         */
        addChild(item: any, ChildView: TView, index: Number): void;

        /** Render the child view */
        renderChildView(view: TView, index: Number): void;

        /**
         * When a custom view instance needs to be created for the childView that
         * represents a child, override the buildChildView method. This method
         * takes three parameters and returns a view instance to be used as the
         * child view.
         */
        buildChildView(child: any, ItemViewType: any, itemViewOptions: any): TView;

        /**
         * Remove the child view and destroy it. This function also updates the indices of
         * later views in the collection in order to keep the children in sync with the collection.
         */
        removeChildView(view: TView): TView;

        /**
         * Determines if the view is empty. If you want to control when the empty
         * view is rendered, you can override isEmpty.
         */
        isEmpty(): boolean;

        /**
         * If empty, show the empty view
         */
        checkEmpty(): void;

        /**
         * Destroy the child views that this collection view
         * is holding on to, if any. This returns destroyed children.
         */
        destroyChildren(): Backbone.ChildViewContainer<TView>;

        /**
         * By default the CollectionView will maintain the order of its collection
         * in the DOM. However on occasions the view may need to re-render to make
         * this possible, for example if you were to change the comparator on the
         * collection. By default CollectionView will call render when this happens,
         * but there are cases where this may not be suitable. For instance when
         * sorting the children in a CompositeView, you want to only render the
         * internal collection.
         */
        resortView(): void;

        /**
         * By default the collection view will append the HTML of each ChildView
         * into the element buffer, and then call jQuery's .append once at the end
         * to move the HTML into the collection view's el.
         * You can override this by specifying an attachHtml method in your view
         * definition.
         * @param collectionView the instance of the collection view that will receive the HTML.
         * @param childView the current child view instance.
         * @param index he index of the model that this childView instance represents,
         * in the collection that the model came from. This is useful for sorting
         * a collection and displaying the sorted list in the correct order on the
         * screen.
         */
        attachHtml(collectionView: CollectionView<TModel, TView>, childView: TView, index: number): void;

        /**
         * If you need the emptyView's class chosen dynamically, specify
         * getEmptyView.
         */
        getEmptyView(): any;

        /** Serialize a collection by serializing each of its models. */
        serializeCollection(): any;

        /**
         * Attaches the content of a given view.
        * This method can be overridden to optimize rendering,
        * or to render in a non standard way.
        *
        * For example, using `innerHTML` instead of `$el.html`
        *
        * @example
        * attachElContent: function(html) {
        *   this.el.innerHTML = html;
        *   return this;
        * }
        */
        attachElContent(html: string): View<TModel>;

        /**
         * Reorder DOM after sorting. When your element's rendering
         * do not use their index, you can pass reorderOnSort: true
         * to only reorder the DOM after a sort instead of rendering
         * all the collectionView
         */
        reorder(): void;

        /**
         * Render and show the emptyView. Similar to addChild method
         * but "add:child" events are not fired, and the event from
         * emptyView are not forwarded
         */
        addEmptyView(child: TModel, EmptyView: new (...args: any[]) => any): void;

        /**
         * Handle cleanup and other destroying needs for the collection of views
         */
        destroy(): CollectionView<TModel, TView>;

        /**
         * Set up the child view event forwarding. Uses a "childview:"
         * prefix in front of all forwarded events.
         * @param view it might be ChildView or EmptyView.
         */
        proxyChildEvents(view: any): void;

        /**
         * Called just prior to rendering the collection view.
         */
        onBeforeRender(): void;

        /**
         * Triggered after the view has been rendered. You can implement this in
         * your view to provide custom code for dealing with the view's el after
         * it has been rendered.
         */
        onRender(): void;

        /**
         * This callback function allows you to know when a child / child view
         * instance is about to be added to the collection view. It provides
         * access to the view instance for the child that was added.
         */
        onBeforeAddChild(childView: TView): void;

        /**
         * This callback function allows you to know when a child / child view
         * instance has been added to the collection view. It provides access to
         * the view instance for the child that was added.
         */
        onAddChild(childView: TView): void;

        /**
         * This callback function allows you to know when a childView instance is
         * about to be removed from the collectionView. It provides access to the
         * view instance for the child that was removed.
         */
        onBeforeRemoveChild(childView: TView): void;

        /**
         * This callback function allows you to know when a child / childView
         * instance has been deleted or removed from the collection.
         */
        onRemoveChild(childView: TView): void;
    }
}
