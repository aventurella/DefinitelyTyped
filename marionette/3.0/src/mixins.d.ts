/// <reference path="./region.d.ts" />
/// <reference path="./view.d.ts" />
declare namespace Marionette{

    interface BehaviorMixins{

    }

    interface CommonMixins{
        normalizeMethods(hash: string): {[key: string]: any};
        mergeOptions(options: any, keys: any): any;
        getOption(optionName: string): any;
        bindEvents(entity: any, bindings: any): any
        unbindEvents(entity: any, bindings: any): any
    }

    interface DelegateEntityEventMixins{

    }

    interface RadioMixins{
        bindRequests(channel: any, bindings: any): any;
        unbindRequests(channel: any, bindings: any): any;
        bindEvents(entity: any, bindings: any): any;
        unbindEvents(entity: any, bindings: any): any;
        getChannel(): any;
    }

    interface RegionMixins{
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

    interface TriggerMixins{

    }

    interface UIMixins{
        normalizeUIKeys(hash: {[key: string]: string}): any;
        normalizeUIValues(hash: {[key: string]: string}, properties: any)
    }

    interface ViewMixins{
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
