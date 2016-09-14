/// <reference path="../../../backbone/backbone.d.ts" />


declare namespace Backbone {
    // Backbone.BabySitter
    class ChildViewContainer<TView extends View<Backbone.Model>> {

        constructor(initialViews?: any[]);

        add(view: TView, customIndex?: number): void;
        findByModel<TModel extends Backbone.Model>(model: TModel): TView;
        findByModelCid(modelCid: string): TView;
        findByCustom(index: number): TView;
        findByIndex(index: number): TView;
        findByCid(cid: string): TView;
        remove(view: TView): void;
        call(method: any): void;
        apply(method: any, args?: any[]): void;

        //mixins from Collection (copied from Backbone's Collection declaration)

        all(iterator: (element: TView, index: number) => boolean, context?: any): boolean;
        any(iterator: (element: TView, index: number) => boolean, context?: any): boolean;
        contains(value: any): boolean;
        detect(iterator: (item: any) => boolean, context?: any): any;
        each(iterator: (element: TView, index: number, list?: any) => void, context?: any): any;
        every(iterator: (element: TView, index: number) => boolean, context?: any): boolean;
        filter(iterator: (element: TView, index: number) => boolean, context?: any): TView[];
        find(iterator: (element: TView, index: number) => boolean, context?: any): TView;
        first(): TView;
        forEach(iterator: (element: TView, index: number, list?: any) => void, context?: any): void;
        include(value: any): boolean;
        initial(): TView;
        initial(n: number): TView[];
        invoke(methodName: string, args?: any[]): any;
        isEmpty(object: any): boolean;
        last(): TView;
        last(n: number): TView[];
        lastIndexOf(element: TView, fromIndex?: number): number;
        map<U>(iterator: (element: TView, index: number, context?: any) => U, context?: any): U[];
        pluck(attribute: string): any[];
        reject(iterator: (element: TView, index: number) => boolean, context?: any): TView[];
        rest(): TView;
        rest(n: number): TView[];
        select(iterator: any, context?: any): any[];
        some(iterator: (element: TView, index: number) => boolean, context?: any): boolean;
        toArray(): any[];
        without(...values: any[]): TView[];
    }
}
