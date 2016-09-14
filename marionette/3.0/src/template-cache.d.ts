declare namespace Marionette{

    /**
     * The TemplateCache provides a cache for retrieving templates from script blocks
     * in your HTML. This will improve the speed of subsequent calls to get a template.
     */
    class TemplateCache {
        /**
         * To use the TemplateCache, call the get method on TemplateCache directly. Internally, instances of the TemplateCache class will be created and stored but you do not have to manually create these instances yourself. get will return a compiled template function.
         */
        static get(templateId: string): any;

        /**
         * You can clear one or more, or all items from the cache using the clear
         * method. Clearing a template from the cache will force it to re-load
         * from the DOM the next time it is retrieved.
         * @param  the templateId used for loading / caching of the templates to clear. If none specified, all templates will be cleared from the cache.
         */
        static clear(...templateId: string[]): void;

        /**
         * The default template retrieval is to select the template contents from the
         * DOM using jQuery. If you wish to change the way this works, you can
         * override this method on the TemplateCache object.
         */
        loadTemplate(templateId: string): any;

        /**
         * he default template compilation passes the results from loadTemplate to
         * the compileTemplate function, which returns an underscore.js compiled
         * template function. When overriding compileTemplate remember that it
         * must return a function which takes an object of parameters and values
         * and returns a formatted HTML string.
         */
        compileTemplate(rawTemplate: any): any;
    }
}
