/*global $*/
(function () {
    "use strict";
    var infoDiv = $('#info'),
        postDiv = $('#post'),
        heading = $('#heading'),
        next,
        previous,
        start,
        blogsButton = document.getElementById('bb'),
        cul,
        name,
        body,

        AddComments = function (comment, i) {
            cul = $('<ul></ul>');
            name = document.createElement("li");
            body = document.createElement("li");
            name.innerHTML = 'Name: ' + comment.name;
            body.innerHTML = 'Body: ' + comment.body;
            cul.append(name);
            cul.append(body);
            $(".cud" + i).append(cul);
        };

    start = function () {

        $.getJSON('https://jsonplaceholder.typicode.com/users?&type=json&callback=?', function (blogs) {
            infoDiv.empty();
            postDiv.empty();
            console.log(blogs);
            blogs.forEach(function (blog) {

                var ul = document.createElement("ul"),
                    liName = document.createElement("li"),
                    liWeb = document.createElement("li"),
                    liComp = document.createElement("li");
                ul.className = 'blogsUl';
                liName.innerHTML = 'Name: ' + blog.name;
                liWeb.innerHTML = 'Website: ' + blog.website;
                liComp.innerHTML = 'Company: ' + blog.company.name;

                ul.appendChild(liName);
                ul.appendChild(liWeb);
                ul.appendChild(liComp);
                //document.body.appendChild(ul);
                infoDiv.append(ul);
                ul.addEventListener('click', function () {

                    $.getJSON('https://jsonplaceholder.typicode.com/posts?userId=' +
                        blog.id + '&type=json&callback=?', function (posts) {
                            console.log(posts);
                            infoDiv.empty();

                            var start = 0,
                                finish = 3;
                            function AddPosts(start, finish) {
                                for (let i = start; i < finish; i++) {
                                    if (start > posts.length - 3) {
                                        finish = posts.length;
                                        next.style.display = 'none';
                                    }
                                    heading.text(blog.name);
                                    var ul = document.createElement("ul"),
                                        liTitle = document.createElement("li"),
                                        liBody = document.createElement("li");
                                    liTitle.innerHTML = 'Title: ' + posts[i].title;
                                    liBody.innerHTML = 'Body: ' + posts[i].body;
                                    ul.appendChild(liTitle);
                                    ul.appendChild(liBody);
                                    var commentsButton = document.createElement("div");
                                    commentsButton.className = "commentsB";
                                    commentsButton.innerHTML = 'show comments';
                                    var cdb = $("<div > </div>");
                                    //cdb.addClass("cd"+i);
                                    var cd = $("<div > </div>");
                                    cd.addClass("cd" + i);
                                    postDiv.append(cd);
                                    // var cdi = $(".cd" + i);
                                    cd.append(ul);

                                    cdb.append(commentsButton);
                                    postDiv.append(cdb);
                                    var culDiv = $('<div></div>');
                                    culDiv.addClass("cud" + i);
                                    postDiv.append(culDiv);


                                    commentsButton.addEventListener('click', function () {

                                        if (this.need !== false) {
                                            this.need = true;

                                        }
                                        if (this.show !== false) {
                                            this.show = true;
                                        }
                                        if (this.show === true) {

                                            this.innerHTML = 'Hide comments';
                                            this.show = false;
                                            $(".cud" + i).show();

                                            if (this.need === true) {

                                                if ($(".cud" + i).is(':empty')) {
                                                    $.getJSON('https://jsonplaceholder.typicode.com	/comments?postId=' +
                                                        posts[i].id + '&type=json&callback=?', function (comments) {

                                                            comments.forEach(function (comment) {
                                                                AddComments(comment, i);
                                                            });
                                                        });
                                                }
                                            }
                                            // this.need = false;
                                        } else {

                                            this.innerHTML = 'Show comments';
                                            this.show = true;
                                            $(".cud" + i).hide();
                                        }
                                    });
                                }
                            }
                            AddPosts(start, finish);
                            previous = document.createElement("button");
                            next = document.createElement("button");
                            previous.innerHTML = 'Previous';
                            next.innerHTML = 'Next';
                            document.body.appendChild(previous);
                            document.body.appendChild(next);
                            next.addEventListener('click', function () {
                                start += 3;
                                finish += 3;
                                previous.style.display = 'inline';
                                postDiv.empty();
                                AddPosts(start, finish);
                            });
                            if (start < 3) {
                                previous.style.display = 'none';
                            }

                            previous.addEventListener('click', function () {
                                start -= 3;
                                finish -= 3;
                                next.style.display = 'inline';
                                if (start < 3) {
                                    previous.style.display = 'none';
                                }
                                postDiv.empty();
                                AddPosts(start, finish);
                            });
                        });
                });
            });
        });
    };
    start();
    blogsButton.addEventListener('click', function () {
        start();
        heading.text('Blogs');
        next.style.display = 'none';
        previous.style.display = 'none';
    });
}());
