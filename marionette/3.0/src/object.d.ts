declare namespace Marionette{

    interface ObjectOptions {
      channelName?: any;
      radioEvents?: any;
      radioRequests?: any;
    }

    /**
     * A base class which other classes can extend from. Object incorporates many
     * backbone conventions and utilities like initialize and Backbone.Events.
     */
    class Object extends Backbone.Events implements CommonMixin, RadioMixin {
        cidPrefix: string;
        _isDestroyed: boolean;
        isDestroyed(): boolean;

        /**
         * Initialize is called immediately after the Object has been instantiated,
         * and is invoked with the same arguments that the constructor received.
         */
        isDestroyed(): boolean
        /**
         * this is a noop method intended to be overridden by classes that extend from this base
         */
        initialize(options?: ObjectOptions): void;

        // CommonMixins
        normalizeMethods(hash: string): {[key: string]: any};
        _setOptions(...args: any[]):void
        mergeOptions(options: any, keys: any): any;
        getOption(optionName: string): any;
        bindEvents(entity: any, bindings: any): any
        unbindEvents(entity: any, bindings: any): any

        // RadioMixins
        _initRadio(): void;
        _destroyRadio():void;
        getChannel(): any;
        bindEvents(entity: any, bindings: any): any;
        unbindEvents(entity: any, bindings: any): any;
        bindRequests(channel: any, bindings: any): any;
        unbindRequests(channel: any, bindings: any): any;

        triggerMethod(event: string, ...args: any[]): any;
        /**
         * Objects have a destroy method that unbind the events that are directly
         * attached to the instance. Invoking the destroy method will trigger a
         * "before:destroy" event and corresponding onBeforeDestroy method call.
         * These calls will be passed any arguments destroy was invoked with.
         * @param args any arguments to pass to the "before:destory" event and call to
         * onBeforeDestroy.
         */
        destroy(...args: any[]): void;
    }
}
