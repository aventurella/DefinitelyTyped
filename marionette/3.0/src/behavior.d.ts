/// <reference path="./object.d.ts" />

declare namespace Marionette{
    /**
     * A Behavior is an isolated set of DOM / user interactions that can be mixed
     * into any View or another Behavior. Behaviors allow you to blackbox View
     * specific interactions into portable logical chunks, keeping your views
     * simple and your code DRY.
     */
    class Behavior extends Marionette.Object {
        constructor(options?: any, view?: any);

        options: any;

        /**
         * Behaviors can have their own ui hash, which will be mixed into the ui
         * hash of its associated View instance. ui elements defined on either the
         * Behavior or the View will be made available within events and triggers.
         * They also are attached directly to the Behavior and can be accessed within
         * Behavior methods as this.ui.
         */
        ui: any;

        /**
         * Any triggers you define on the Behavior will be triggered in response to the appropriate event on the view.
         */
        triggers: any;

        /**
         * modelEvents will respond to the view's model events.
         */
        modelEvents: any;

        /**
         * collectionEvents will respond to the view's collection events.
         */
        collectionEvents: any;

        /**
         * The behaviors key allows a behavior to group multiple behaviors
         * together.
         */
        behaviors: any;

        /**
         * defaults can be a hash or function to define the default options for
         * your behavior. The default options will be overridden depending on
         * what you set as the options per behavior (this works just like a
         * backbone.model).
         */
        defaults: any;

        /**
         * el is a direct proxy of the view's el
         */
        el: any;

        /**
         * $el is a direct proxy of the view's el cached as a jQuery selector.
         */
        $el: JQuery;

        /** A reference to the view instance that the behavior is on. */
        view: any;

        /**
         * $ is a direct proxy of the views $ lookup method.
         */
        $(selector: any): JQuery;
    }

    /**
     * Marionette.Behaviors' is a utility class that takes care of glueing your
     * behavior instances to their given View. The most important part of this
     * class is that you MUST override the class level behaviorsLookup method or
     * set the option behaviorClass for things to work properly.
     */
    class Behaviors {
        /**
         * This method defines where your behavior classes are stored. Override this to provide another lookup.
         */
        static behaviorsLookup(): any;

        /**
         * This method has a default implementation that is simple to override. It
         * is responsible for the lookup of single behavior from within the
         * Behaviors.behaviorsLookup or elsewhere. Note that it should return the type of the
         * class to instantiate, not an instance of that class.
         */
        static getBehaviorClass(options: any, key: string): any;
    }
}
