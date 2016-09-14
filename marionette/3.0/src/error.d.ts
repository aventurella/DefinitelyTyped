declare namespace Marionette {
    interface ErrorOptions{
        description: string;
        fileName: string;
        lineNumber: number;
        name: string;
        message: string;
        number: number;
    }

    class Error {
        constructor(message: string, options: ErrorOptions);
    }
}
