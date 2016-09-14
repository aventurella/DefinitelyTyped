declare namespace Marionette{

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
}
