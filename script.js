/**
 * Created by karina on 20/02/17.
 */
"use strict";
var books = [];

var updateHTML = function () {

    $(".books").empty();
    var source = $('#templateBooks').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < books.length; i++) {

        var newHTML = template(books[i]);
        $('#books').append(newHTML);
    }

};


var fetch = function (inputValue, searchLength) {
    var searchURL = 'https://www.googleapis.com/books/v1/volumes?q=' + inputValue;

   // if (searchType == "isbn") {
     //   searchURL = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + inputValue;
    //}


    $.ajax({
        method: "GET",
        url: searchURL,
        dataType: "json",
        success: function (data) {

            for (var i = 0; i < searchLength; i++) {
                var dataObj = {
                    myISBN: data.items[i].volumeInfo.industryIdentifiers["0"].identifier,
                    tittle: data.items[i].volumeInfo.title,
                    description: data.items[i].volumeInfo.description,
                    authors: data.items[i].volumeInfo.authors,
                    image: data.items[i].volumeInfo.imageLinks.thumbnail
                };

                books.push(dataObj);

            }

            updateHTML()

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};

$(".search-isbn").on("click", function () {
    var inputValue = $("#isbn").val();
    fetch(inputValue, 10);
});

$("body").on("click", ".book-with-isbn", function () {
    alert("clicked")
    var isbn = $(this).data();
    fetch(isbn, 1)
});

/*

 var showBook = function () {
 $(".books").empty();
 var dataObj = {
 myISBN: data.items[0].volumeInfo.isbn,
 tittle: data.items[0].volumeInfo.title,
 description: data.items[0].volumeInfo.description,
 authors: data.items[0].volumeInfo.authors,
 image: data.items[0].volumeInfo.imageLinks.thumbnail
 };
 var source = $('#templateBooks').html();
 var template = Handlebars.compile(source);
 var newHTML = template(dataObj);
 $('#books').append(newHTML);
 $('#book-with-isbn-' + dataObj.myISBN).on('click', onBookClick);

 };

 var booksByTitle = {};
 booksByTitle["bookName"] = dataObj;
 console.log(booksByTitle["bookName"]);


 function onBookClick(event) {
 event.stopPropagation();
 var divElement = event.target;
 //var bookName = divElement.getAttribute("bookName");
 var bookName = $(divElement).attr("bookName");

 var dataObj = booksByTitle[bookName];
 showBook(dataObj);
 }*/