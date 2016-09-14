/// <reference path="../../../backbone/backbone.d.ts" />


declare namespace Marionette{
    /**
     * This base view provides some common and core functionality for other views
     * to take advantage of.
     * Note: The Marionette.View class is not intended to be used directly. It
     * exists as a base view for other view classes to be extended from, and to
     * provide a common location for behaviors that are shared across all views.
     */
    class View<TModel extends Backbone.Model> extends Backbone.View<TModel> {

        constructor(options?: Backbone.ViewOptions<TModel>);

        /**
         * Defines behaviors attached to this view.
         */
        behaviors: any;

        /**
         * Defines `triggers` to forward DOM events to view
         * events. `triggers: {"click .foo": "do:foo"}`
         */
        triggers:{[key:string]:any};

        /**
         * A configuration hash for models. The left side is the event on
         * the model, and the right side is the name of the
         * method on the view or a function to handle the event. This property
         * can also be a function that returns the hash described above.
         */
        modelEvents: any;

        /**
         * A configuration hash for collections. The left side is the event on
         * the collection, and the right side is the name of the
         * method on the view or a function to handle the event. This property
         * can also be a function that returns the hash described above.
         */
        collectionEvents: any;

        /**
         * In several cases you need to access ui elements inside the view to
         * retrieve their data or manipulate them. For example you have a certain
         * div element you need to show/hide based on some state, or other ui
         * element that you wish to set a css class to it. Instead of having
         * jQuery selectors hanging around in the view's code you can define a
         * ui hash that contains a mapping between the ui element's name and its
         * jQuery selector. Afterwards you can simply access it via
         * this.ui.elementName.
         */
        ui: any;

        /**
         * There may be some cases where you need to change the template that is
         * used for a view, based on some simple logic such as the value of a
         * specific attribute in the view's model. To do this, you can provide a
         * getTemplate function on your views and use this to return the template
         * that you need.
         */
        getTemplate(): any;


        /**
         * Retrieve an object's attribute either directly from the object, or
         * from the object's this.options, with this.options taking precedence.
         */
        getOption<T>(optionName:string): T;

        mixinTemplateHelpers(target?: any): any;
        configureTriggers(): any;

        /**
         * View implements a destroy method, which is called by the region managers automatically. As part of the implementation.
         */
        destroy(...args: any[]): void;

        /**
         * In several cases you need to access ui elements inside the view to
         * retrieve their data or manipulate them. For example you have a certain
         * div element you need to show/hide based on some state, or other ui
         * element that you wish to set a css class to it. Instead of having jQuery
         * selectors hanging around in the view's code you can define a ui hash
         * that contains a mapping between the ui element's name and its jQuery
         * selector. Afterwards you can simply access it via this.ui.elementName.
         * This functionality is provided via the bindUIElements method.
         * Since View doesn't implement the render method, then if you directly
         * extend from View you will need to invoke this method from your render
         * method. In ItemView and CompositeView this is already taken care of.
         */
        bindUIElements(): any;

        unbindUIElements(): any;

        triggerMethod(name: string, ...args: any[]): any;

        /**
         * Called on the view instance when the view has been rendered and
         * displayed. This event can be used to react to when a view has been
         * shown via a region. A common use case for the onShow method is to
         * use it to add children views.
         */
        onShow(): void;

        /**
         * Triggered just after the view has been destroyed.
         */
        onDestroy(): void;

        /**
         * When destroying a view, an onBeforeDestroy method will be called, if
         * it has been provided, just before the view destroys. It will be passed
         * any arguments that destroy was invoked with.
         */
        onBeforeDestroy(...args: any[]): void;

        /**
         * Called anytime that showing the view in a Region causes it to be
         * attached to the document.
         */
        onAttach(): void;

        /**
         * Triggered right before the view is attached to the document.
         */
        onBeforeAttach(): void;

        /**
         * Triggered after the view has been rendered, has been shown in the DOM via a Marionette.Region, and has been re-rendered.
         * This event / callback is useful for DOM-dependent UI plugins such as jQueryUI or KendoUI.
         */
        onDomRefresh(): void;

        /**
         * Internal properties extended in Marionette.View.
         */
        isDestroyed: boolean;
        supportsRenderLifecycle: boolean;
        supportsDestroyLifecycle: boolean;
    }
}
