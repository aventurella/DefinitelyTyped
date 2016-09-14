// Type definitions for Marionette
// Project: https://github.com/marionettejs/
// Definitions by: Zeeshan Hamid <https://github.com/zhamid>, Natan Vivo <https://github.com/nvivo>, Sven Tschui <https://github.com/sventschui>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference path="../../../backbone/backbone.d.ts" />
/// <reference path="./application.d.ts" />
/// <reference path="./app-router.d.ts" />
/// <reference path="./child-view-container.d.ts" />
/// <reference path="./object.d.ts" />
/// <reference path="./region.d.ts" />
/// <reference path="./behavior.d.ts" />
/// <reference path="./template-cache.d.ts" />
/// <reference path="./view.d.ts" />
/// <reference path="./collection-view.d.ts" />
/// <reference path="./composite-view.d.ts" />


declare namespace Marionette {
    var DEV_MODE: boolean;
    var FEATURES: any;
    var VERSION: string;

    interface ViewOptions {
      el?: any;
      events?: {[selector: string]: string};
      id?: string;
      className?: string;
      tagName?: string;
      attributes?: {[id: string]: any};
    }

    interface CollectionOptions<TModel extends Backbone.Model> extends ViewOptions {
        collection?: Backbone.Collection<any>;
    }

    interface ModelOptions<TModel extends Backbone.Model> extends ViewOptions {
      model?: TModel;
    }

    /**
     * Retrieve an object's attribute either directly from the object, or
     * from the object's this.options, with this.options taking precedence.
     */
    function getOption(target: any, optionName: string): any;

    /**
     * Trigger an event and a corresponding method on the target object.
     * All arguments that are passed to the triggerMethod call are passed along
     * to both the event and the method, with the exception of the event name not
     * being passed to the corresponding method.
     */
    function triggerMethod(name: string, ...args: any[]): any;

    /**
     * Invoke triggerMethod on a specific context.
     * This is useful when it's not clear that the object has triggerMethod defined.
     */
    function triggerMethodOn(ctx: any, name: string, ...args: any[]): any;

    /**
     * Monitor a view's state, and after it has been rendered and shown in the DOM,
     * trigger a "dom:refresh" event every time it is re-rendered.
     */
    function MonitorDOMRefresh(view: Backbone.View<Backbone.Model>): void;

    /**
     * This method is used to bind a backbone "entity" (collection/model) to methods on a target object.
     * @param target An object that must have a listenTo method from the EventBinder object.
     * @param entity The entity (Backbone.Model or Backbone.Collection) to bind the events from.
     * @param bindings a hash of { "event:name": "eventHandler" } configuration. Multiple handlers can be separated by a space. A function can be supplied instead of a string handler name.
     */
    function bindEntityEvents(target: any, entity: any, bindings: any): void;

    /**
     * This method can be used to unbind callbacks from entities' (collection/model) events. It's the opposite of bindEntityEvents
     * @param target An object that must have a listenTo method from the EventBinder object.
     * @param entity The entity (Backbone.Model or Backbone.Collection) to bind the events from.
     * @param bindings a hash of { "event:name": "eventHandler" } configuration. Multiple handlers can be separated by a space. A function can be supplied instead of a string handler name.
     */
    function unbindEntityEvents(target: any, entity: any, bindings: any): void;


    interface RegionDefaults {
        /**
         * A selector string indicating which element to assign the region two.
         */
        selector?: string;

        /**
         * A selector string, a jQuery object, or an HTML node indicating which element
         * the region should use.
         */
        el?: any;

        /**
         * A custom region class.
         */
        regionClass?: any;

        /**
         * Ordinarily regions enforce the presence of a backing DOM element. In
         * some instances it may be desirable to allow regions to be instantiated
         * and used without an element, such as when regions defined by a parent
         * LayoutView class are used by only some of its subclasses. In these
         * instances, the region can be defined with this option set to true,
         * suppressing the missing element error and causing show calls to the
         * region to be treated as no-ops.
         */
        allowMissingEl?: boolean;
    }

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
}

declare module 'backbone.marionette' {
    import Backbone = require('backbone');

    export = Marionette;
}
