declare namespace Marionette{

    interface BehaviorMixin{

    }

    interface CommonMixin{
        normalizeMethods(hash: string): {[key: string]: any};
        mergeOptions(options: any, keys: any): any;
        getOption(optionName: string): any;
        bindEvents(entity: any, bindings: any): any
        unbindEvents(entity: any, bindings: any): any
    }

    interface DelegateEntityEventsMixin {

    }

    interface RadioMixin{
        bindRequests(channel: any, bindings: any): any;
        unbindRequests(channel: any, bindings: any): any;
        bindEvents(entity: any, bindings: any): any;
        unbindEvents(entity: any, bindings: any): any;
        getChannel(): any;
    }

    interface RegionMixin{
        addRegion(name: string, definition: Region): any
        addRegions(regions: Region[]): any
        removeRegion(name: string): any;
        removeRegions(): Region[];
        emptyRegions(): Region[];
        hasRegion(name: string): boolean;
        getRegion(name: string): Region;
        getRegions(): Region[];
        showChildView(name: string, view: View<Backbone.Model>, ...args: any[]);
        getChildView<T extends View<Backbone.Model>>(name: string): T;
    }

    interface TriggersMixin{

    }

    interface UIMixin{
        normalizeUIKeys(hash: {[key: string]: string}): {[key: string]: string};
        normalizeUIValues(hash: {[key: string]: string}, properties: any): {[key: string]: string};
    }

    interface ViewMixin{
        supportsRenderLifecycle: boolean;
        supportsDestroyLifecycle: boolean;
        setElement(): this;
        delegateEvents(eventsArg: any): this;
        getTriggers(): any;
        delegateEntityEvents(): this;
        undelegateEntityEvents(): this;
        destroy(...args: any[]): this;
        bindUIElements(): this;
        unbindUIElements(): this;
        getUI(name: string): any;
        childViewEventPrefix: string;
        triggerMethod(event: string, ...args: any[]): any;
    }


    // interface common{
    //     normalizeMethods(hash: string): {[key: string]: any};
    //     triggerMethod(event: string, ...args: any[]);
    //     triggerMethodOn(context: any, ...args: any[]);
    //     monitorViewEvents(view: View<Backbone.Model>);
    //     mergeOptions(options: any, keys: any): any;
    //     isNodeAttached(el: any): boolean;
    //     getOption(optionName: string): any;
    //     bindRequests(channel: any, bindings: any): any;
    //     unbindRequests(channel: any, bindings: any): any;
    //     bindEvents(entity: any, bindings: any): any
    //     unbindEvents(entity: any, bindings: any): any
    // }
}
