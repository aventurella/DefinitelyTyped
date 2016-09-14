/// <reference path="./object.d.ts" />

declare namespace Marionette{

    interface BehaviorOptions{
        collectionEvents?: any;
        events?: any;
        modelEvents?: any;
        triggers?: any;
        ui?: any;
    }

    /**
     * A Behavior is an isolated set of DOM /
     * user interactions that can be mixed into any View.
     * Behaviors allow you to blackbox View specific interactions
     * into portable logical chunks, keeping your views simple and your code DRY.
     */
    class Behavior extends Marionette.Object implements DelegateEntityEventsMixin, TriggersMixin, UIMixin {
        cidPrefix: string;
        view: any;
        defaults: any;
        triggers: any;
        ui: any;
        options: any;
        el: any;
        $el: JQuery;

        constructor(options?: any, view?: any);

        // UIMixin
        normalizeUIKeys(hash: {[key: string]: string}): any;
        normalizeUIValues(hash: {[key: string]: string}, properties: any)

        /**
         * $ is a direct proxy of the views $ lookup method.
         */
        $(selector: any): JQuery;

        destroy(): this;
        proxyViewProperties(): this;
        bindUIElements(): this;
        unbindUIElements(): this;
        getUI(name: string): any;
        delegateEntityEvents(): this;
        undelegateEntityEvents(): this;
        getEvents(): any;
        getTriggers(): any;

    }

    /**
     * Marionette.Behaviors' is a utility class that takes care of glueing your
     * behavior instances to their given View. The most important part of this
     * class is that you MUST override the class level behaviorsLookup method or
     * set the option behaviorClass for things to work properly.
     */
    class Behaviors {
        /**
         * Placeholder method to be extended by the user.
         * The method should define the object that stores the behaviors.
         * i.e.
         * ```js
         * Marionette.Behaviors.behaviorsLookup: function() {
         *     return App.Behaviors
         * }
         * ```
         * _DEPRECATED: The behaviorsLookup is deprecated pending
         * removal. See the documentation for Behavior to learn how to
         * map behaviors to views in Marionette 3.
         */
        static behaviorsLookup(): any;

        /**
         * Takes care of getting the behavior class
         * given options and a key.
         * If a user passes in options.behaviorClass
         * default to using that.
         * If a user passes in a Behavior Class directly, use that
         * Otherwise delegate the lookup to the users `behaviorsLookup` implementation.
         */
        static getBehaviorClass(options: any, key: string): any;
    }
}
