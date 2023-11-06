# PdfFormFilling

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## get pdf file from .net core api
```c#
[HttpGet("{fileName}")]
public IActionResult GetPdfFile(string fileName)
{

    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "Files");
    string filePath = Path.Combine(folderPath, fileName);
    
    // Check if the file exists
    if (!System.IO.File.Exists(filePath))
    {
        return NotFound(); // Or return an appropriate error response
    }

    // Set the content type for the response
    var contentType = "application/pdf";

    // Return the PDF file as a FileStreamResult
    var fileStream = System.IO.File.OpenRead(filePath);
    return File(fileStream, contentType, fileName);
}
```
