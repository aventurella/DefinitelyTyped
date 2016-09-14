/// <reference path="../../../backbone/backbone.d.ts" />


declare namespace Marionette {
    type BaseView = Marionette.View<Backbone.Model>

    class Container {

        constructor(initialViews?: BaseView[]);

        add(view: BaseView, customIndex?: number): void;
        findByModel<TModel extends Backbone.Model>(model: TModel): View<TModel>;
        findByModel(model: any): any;
        findByModelCid(modelCid: string): BaseView;
        findByCustom(index: number): BaseView;
        findByIndex(index: number): BaseView;
        findByCid(cid: string): BaseView;
        remove(view: BaseView): void;

        // mixins from underscore (copied from underscore)

        all(iterator: (element: BaseView, index: number) => boolean, context?: any): boolean;
        any(iterator: (element: BaseView, index: number) => boolean, context?: any): boolean;
        contains(value: any): boolean;
        detect(iterator: (item: any) => boolean, context?: any): any;
        each(iterator: (element: BaseView, index: number, list?: any) => void, context?: any): any;
        every(iterator: (element: BaseView, index: number) => boolean, context?: any): boolean;
        filter(iterator: (element: BaseView, index: number) => boolean, context?: any): BaseView[];
        find(iterator: (element: BaseView, index: number) => boolean, context?: any): BaseView;
        first(): BaseView;
        forEach(iterator: (element: BaseView, index: number, list?: any) => void, context?: any): void;
        include(value: any): boolean;
        initial(): BaseView;
        initial(n: number): BaseView[];
        invoke(methodName: string, args?: any[]): any;
        isEmpty(object: any): boolean;
        last(): BaseView;
        last(n: number): BaseView[];
        map<U>(iterator: (element: BaseView, index: number, context?: any) => U, context?: any): U[];
        pluck(attribute: string): any[];
        reject(iterator: (element: BaseView, index: number) => boolean, context?: any): BaseView[];
        rest(): BaseView;
        rest(n: number): BaseView[];
        reduce(iterator: any, memo?: any, context?: any);
        select(iterator: any, context?: any): any[];
        some(iterator: (element: BaseView, index: number) => boolean, context?: any): boolean;
        toArray(): any[];
        without(...values: any[]): BaseView[];
    }
}
