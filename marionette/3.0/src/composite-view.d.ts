/// <reference path="../../../backbone/backbone.d.ts" />
/// <reference path="./collection-view.d.ts" />


declare namespace Marionette{
    /**
     * A CompositeView extends from CollectionView to be used as a composite view
     * for scenarios where it should represent both a branch and leaf in a tree
     * structure, or for scenarios where a collection needs to be rendered within
     * a wrapper template.
     */
    class CompositeView<TModel extends Backbone.Model, TView extends View<Backbone.Model>> extends CollectionView<TModel, TView> {

        constructor(options?: CollectionViewOptions<TModel>);

        /**
         * Each childView will be rendered using the childView's template. The
         * CompositeView's template is rendered and the childView's templates are
         * added to this.
         */
        childView: new (...args:any[]) => TView;

        /**
         * By default the composite view uses the same attachHtml method that the
         * collection view provides. This means the view will call jQuery's
         * .append to move the HTML contents from the child view instance in to
         * the collection view's el.
         * This is typically not very useful as a composite view will usually render
         * a container DOM element in which the child views should be placed.
         * This can be either a string or a function returning a string.
         */
        childViewContainer: any;

        /**
        * Renders the view.
        */
        render(): CompositeView<TModel, TView>;

        /**
         * Invoked before the model has been rendered
         */
        onBeforeRenderTemplate(): void;

        /**
         * Invoked after the model has been rendered.
         */
        onRenderTemplate(): void;

        /**
         * Invoked before the collection of models is rendered
         */
        onBeforeRenderCollection(): void;

        /**
         * Invoked after the collection of models has been rendered
         */
        onRenderCollection(): void;
    }
}
