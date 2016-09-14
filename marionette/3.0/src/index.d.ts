// Type definitions for Marionette
// Project: https://github.com/marionettejs/
// Definitions by: Zeeshan Hamid <https://github.com/zhamid>, Natan Vivo <https://github.com/nvivo>, Sven Tschui <https://github.com/sventschui>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference path="../../../backbone/backbone.d.ts" />
/// <reference path="./application.d.ts" />
/// <reference path="./app-router.d.ts" />
/// <reference path="./behavior.d.ts" />
/// <reference path="./child-view-container.d.ts" />
/// <reference path="./collection-view.d.ts" />
/// <reference path="./composite-view.d.ts" />
/// <reference path="./error.d.ts" />
/// <reference path="./mixins.d.ts" />
/// <reference path="./object.d.ts" />
/// <reference path="./region.d.ts" />
/// <reference path="./template-cache.d.ts" />
/// <reference path="./view.d.ts" />


declare namespace Marionette {
    var DEV_MODE: boolean;
    var FEATURES: any;
    var VERSION: string;

    interface BaseOptions {
      el?: any;
      events?: {[selector: string]: string};
      id?: string;
      className?: string;
      tagName?: string;
      attributes?: {[id: string]: any};
    }

    interface CollectionOptions<TModel extends Backbone.Model> extends BaseOptions {
        collection?: Backbone.Collection<TModel>;
        model?: Backbone.Model;
    }

    interface ModelOptions<TModel extends Backbone.Model> extends BaseOptions {
      model?: TModel;
    }

    function bindEvents(context: any, entity: any, bindings: any): any;
    function unbindEvents(context: any, entity: any, bindings: any): any;
    function bindRequests(context: any, channel: any, bindings: any): any;
    function unbindRequests(context: any, channel: any, bindings: any): any;
    function mergeOptions(context: any, options: any, keys: any): any;
    function getOption(context: any, optionName: string): any;
    function normalizeMethods(context: any): any;
    function extend(properties: any, classProperties?: any): any;
    function isNodeAttached(el: any): boolean;
    function deprecate(message: string | {prev: string, next: string, url: string}, test: boolean): any;
    function triggerMethod(context: any, event: string, ...args: any[]): any;
    function triggerMethodOn(context: any, event: string, ...args: any[]): any;
    function isEnabled(name: string): boolean;
    function setEnabled(name: string, state: any): void;
    function monitorViewEvents(view: any): any;

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
