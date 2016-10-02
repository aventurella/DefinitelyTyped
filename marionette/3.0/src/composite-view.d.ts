declare namespace Marionette{
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
}
