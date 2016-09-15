/// <reference path="../../../backbone/backbone.d.ts" />


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
}
