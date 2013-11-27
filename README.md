Questionr
=========

A library for displaying successive questions on the client side. Questions configured in a tree like form, with questions that have answers, and answers that lead to new  questions. Questions are fed one-by-one to the user until an end node is found. When an end node has been reached, the user will be redirected to the corresponding  url.

Usage
-----

Include the [stylesheet](https://github.com/NDeBlaauw/questionr/blob/master/questionr/css/questionr.css) in the page `<head>`. Include the [javascript library](https://github.com/NDeBlaauw/questionr/blob/master/questionr/js/questionr.js) before the end of the `<body>` tag. Lastly create a Questionr instance and use the `init` method when you want the modal to open.

```html
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="questionr/css/questionr.css">
    <script src="questionr/js/questionr.js" type="text/javascript"></script>
  </head>
  <body>
    <div id="questionr">
    </div>
    <script type="text/javascript">
      var questionr = new Questionr('questionr',{%JSON OBJECT like in questionr/js/example-config.json%});
      questionr.init();
    </script>
  </body>
</html>
```

Use cases
---------

* Multi question polls
* Wizards
* Segmentation

About the project
-----------------

Currently made in vanilla JavaScript without dependencies to minimize the ease of implementing. The stylesheet is written in Less. Edit [the theme file](https://github.com/NDeBlaauw/questionr/blob/master/questionr/css/theme.less) to customize the look.
