var bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express();

//APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static(__dirname+"public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//MONGOOSE MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTEhIWFRUVFRcVFhUVFxUVFRUQFRUXFxUVFRYYHSggGBolHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGi0fHx8tLS0tLS0tLS0tLS0tLSstLS0rLS0tLS0tLS0tLS0tLS0tLS0tLSsuKy0tLS0tKy0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAQIDBQYAB//EADYQAAEDAgQDBgYBBAMBAQAAAAEAAhEDBAUSITFBUWEGEyJxgZEyobHB0fDhFEJS8QcjcrIV/8QAGgEAAwEBAQEAAAAAAAAAAAAAAQIDBAAFBv/EACgRAAICAgEEAgEEAwAAAAAAAAABAhEDIRIEEzFRIkEUBTJh0QYjcf/aAAwDAQACEQMRAD8A11MIligYFO1XsykwSyo5SygcSApZTAnBE4eCntKjTgUAjy5NzJpKZK4DJsy7MosyTMiAmDlIHIcFODkAomJUZcm50wlFHNkgcllRBydmRFHhyXOoi5NL11HBbHp5egW1VJ3qFBslc5K2ooMyUFBo6wkvSZ1ECmuQoawtteE/+pQGZcHLqDYd/UpDcFCZkhchQbC/6gpRdIEuTc66jrLE3SjqXKDzpHOXUGyQ3BXIYlciAgaE8KJinYUlnUKGJ2RT02pXBHkFxIEocmVCo86ZCeCcFLJTKZUi4NDC5JmXPCZlKZCsdKQOSEFRkooDCQ5LmS2dm+pqIhHDBH/5BK5xX2MoSf0VpeklXFPBP8nflFUsKpDfxeaR5oIKxSZQ0qTnfCCUbTwmod4Hmr0AAabJrnLPPqn9Fo4F9lYzBeb/AGCc3BW8XFGGuldVUH1cvZXsL0VtbBP8XehQb8NqN/tV/nT9VSPVy/6I+niZdzSNxCUOWgu7JtQa6Hgs/dUHUzBHr0WrHlUyE8TiTNKUoVlVTMqBMwIfkSFqkaUyoUExqGJCVG5yjNRNQLJHFRlyY56HfUTACw9OJQTaqeayhPKkOok6VDd8uQ7x3ERpUzHqvp1lM2qpysCZZ06qV9VBMelc9CLY7eiUulObTQ7Xo63cFXkxUkx7KUJHBEZgh6pR5DNURhPUBqJO+CoiLJXhLb22cwm0pcYAV5bURTHVSzZ1jX8lMWJzYRa0QwAb+yIzqvFyZQuJ4uKY01PJeZLqaVs3LC26RY17qFELmeICztriJqGSwDydPy1RwuORn6/vks/dlLZbtKOizfdQoHXirbm9AHDyQ1vfZiR1U5Zt0PHFqy4dc/vt+Ugudv3gqp9xqesfZDvvDrH7KR5B1jNLTqqdlcLNMvDsPL3RQvY28k8c1CSwl82rKkeAdDqFUW91OgVlQqrTjy2Z546KTE8OyeJgJb9EBTqLYkAjos5i+HFhzN+E/JephzcvjIw5MdbQynUSuKFpuUocrMVHOaontU8pjyuUg8QV4QtRyLqFBVkJTBxGhyR1RRkpjis8lY5J3q5QZlyXig2LmU1EqEhSM0Wm00Z4+Q9jkrihBVhca6RQKOSJy9EULhV7npKb0/ETlsuu/wCqhdVQrHJziglsdvQ9z063pueYaJUDWErQYbbZGzx4k/ZDNlWONnY8bm/4J7Cz7sS7f6KK9vY2UV9f5RzWZr3Tnv1Og9gvDzZ3Nnr4cCSNPaVtCSfU6BUmI3oc+JkdIH/0YSYhfCjQH+Tp9huVkKPaDUnbzOvsBCk7lr0XhD7NvQIgb+pbHyRDr6mBH8wvPrrHXxp8PFziQ0DqY19lW33bimBkpmo4jSWhjKcn/wB+M+cBWxwnPSQs4qO5M195iAe/LOx+XNWNrTFMQTrMry+27QPNYOeBqCNCHSNCNjuJC1lpjpcBoeACjmwSxvZWLU18fBoataNff3lCGpMxzj8/dQOryP3fgm0qkQPX7lRGSLO1fp7k/YItj8ol26qqdQgQjq0mmY3hBsVoNpXObY/f5KytbkTDp9Roshh128GAFcG6B0dAPQj8poTFnD6Nhb1AQpHUgQQdQeCzmHX4Gk/MH7q/o1gRuvRw5k/Jgy4nFgNfBBuwx0Q1XCXtE6FXZf1CXOtizsz9syVQkaFDvqIvHDD1UvqJ+5YjVOiV1RQuCiNRMdVQ2Ac9QvK4vTHFOcMJSJpK5HR1BYCVNBXF6n3KF4COSsplc1ynYqd9JA7Y3Ila2FKmkod47gSscpA5BufCRtdL3RqLeyeAdh5lWV1dHISNoWft6/iAR2N1YZl6arB1UzZ00bZW17iQXE/6QFq4ue0DiQB5k6n0/KGxC9lhazfUDzE/hGYA+e6PHJvx0OvuAPdYEj0mqRD2iq5nkD4WDK0eXErP9ncI7173u1aHQBPLfZWOL3EU6j+riOZA0EKy7M0y2iwEQYmRzKeDpN+wydKkI7DGasLdP3ZYDHey7g892NJ/ZC9XqsceEcjxKgGFGpvKriyyxO0SklNVI8sw7AapfLt/Tb08votnh2FEbjaP5WytsHpMGoH5T61ADQCEmfNLI9jY3GCqJmDR1iP3im6z+8/4V66gOX6VGbEHYLP9FORnri9ynQdfVSP7QsDd4jcn7dd12K2hbJjy+0rzXEbkmpl1DZ2Gms8D0V+m6d5XXgXLOMY2z1HAq3eHMQY4StBc0AWyD7fdeU9mO0BpPFJ7ozGGOJ8JP+FQcJmA4cd16FaYq10gaHlyKbJh7L4sTlz+SHOfrPEfNabDa2ZgI9uKytzX1P3APzRljfBrN+O34/CgnxlYZR5RNYyrzRLCs9XryARx26/lG4XcEiCtUMm6M0serAu0NsRqNv3dZuo5bDGbbO3TdY2swgwVqjkoyTjuxhcVy4FSNhP+QhFEjASlqe5Qvclln9DcCMpUwuXJPyDuI/vk11ZDZ0xzlRpiKIYyqi2VlVMciGPS7G4lg2qnByBD07vVzetCtBVQKMhRGunU6imm7FCKD8plT4vVL2SNyoGiVLcUyGJepjcORp6SVTooamGkMEkTvJ0Ak7nmrnDaWWm554jIzmAdyVkcSq1X1cjJkSSRw5fZauzDmWzA/SBPsNT9VlppWepP6M7jNoXtFNupe4U2gSQ1uaXuPWAfdbLC7enRYAXbCOv5XnOK4iWV6bhAMu0Og6a+pVozGXHRzYJ2duP3y9k/FqKBKNm8dfM4GPUSSj6EBuZxgcVl8Cs3F2d5BAHDX/XkrfE8XZTbLgTHACYCTlSJuO6QXVxNv9mqDfiTRuql2Jh0GkJzDNPANPE8kLWLzwnyQ7GaStIKnji6bNLRu6bkQ0DcahZS2qZTror+i8Nh06RqpVJOpIZpPwx2K2oew8+HnylebX3ZzOXcHDSDy5L1KrBbIOhCp320kmJ5xxHAq+PJKDuINNUzBWPYoHV+nzVq7DnUCHtkx8XXr5rUUaR2lTOtREEeqOTNPJ+5hhUPCKChW7wb+R5KR9Q525Xf+gQD7oe/t+4JP9v2Q2DVS+oCeJgeRMj96KXHTZRUbC5qAsaDpP1/Cmwm/wBcrtxx5qqxQkAcgfl+yobatLuqDbQnFNG+c3O2AVi+0Vs6mZO3lHzWlwy501XYzX/6zH2K1xmpIw5Ibo88FyiKdZAXj3F5kewhPpIyx1sycthz6qEq1kjnoWoUsYWNyJu+SoLOkVOyjgwFIUjFMGrbYRjQp2pA1PaEroIoK4lLCUNS0hWrI5XCopu7TDSQ4IRxYVZ1tVZveCIVTSZCkq1tFOSvQ0bi7RXloo53OHie75Sj8du5ojLtAA95+qHxGmajWlu8fMbqvxa6Hcsb8RmCNvENdenGTpx1CxcXdM9iLUqZmcRpZ6ugc4jTKwTHrr9FcW1hVkf9cA75niPUT9lHQqvc3waAuPjIhumngbsNQeEnpspnWboGeq/fUl7pnkBqT5aHotFrwFtnoWH2fc0WMy68SBpmKr8epSxwETB91Yvr6A5vDAjfkqTG7kd24DiD1WfXIjbPN77tDUt3d2xwLW8RMOJ468OHojbPtg7Qu1WexqmQ7xNkHVrtdBxYT9uqCpHgvoYzpaPOlC3s9Lt8apVhvB5TxVpZ4tTYA17pOYtjUnovKrG1qB3xAg8c306r0zs7gzdKrhLiNyFh6+MXC2qZo6XUvOjW2+UCWnRwmD+6IX+qyvgnjoeY5IinHqFX4lQAMn4Dx18LvnAK8deDatsvGsDhLSEDcWrgZn8KrtcQLHRMjmNfp91cVb0FhPT1TJpiuLTM12uqN7kzvHr++SDwNsPp+Y+x+3zVX2uvw+GAnVwEHqeCubJuV1Lo4T5bJ5qoIpFF/iDw3MDr+DqCq20eCQfRHYu4HXloeUKltXgS7y/ClIMfBsMPqcuKlxANLSJyuPA7HoqvCavj6Je0NxBA5ceKri2Zs/x2Za6JzkEQQYXAoiuMzi7mojRWx+DzatkZKheESaaie1LF7DQIWrlPkXK1hoYyqiaVRUwcUXbvKvJaORahycCoKbtF3eKSdj0FtTgEG2spm1kWhQlK0hDd6kNVEIZnCjeZQr6qntbKpUAyayfogweQizAOkwPr1KHv+zvev7qkC51WC46hlNg3c88eGgMnZarBuz4jxgh37qFe1HGnDGgbSTp80iwvK/RWOXtGH7R4MyjTYyn/AGNDQdiRxOm0mZhZXuvCZ10iNhA58A3oNPM7eg9py17frG/oVgbaQ9zTrO3oNvbRZcq4yaRtwu47LHBMUlvdOPjA0GxLOGn9o6bwn3AkH9H+vqsVizizNEtc4mXDkNvLig7bFK7muHeO8MD11/j2TLp3P5JjPUq9ltiViSHaQ3XQjQHmOvVUYwdwJnXkBvEaFMrX1YgNL3ERz9/qpsIxbu5D25m7AcR1n1WyKnCPsjKCb2XfZ7BwHBx146xvxC9BtakCOQ0CyuC3lF/wHXeDvBMLQUY9vovN6icnLZWMElotbamTOu+qgxYhoJ4AagTJPUBMdespgkmDExxdHIKhFR9esHuMQSacaeHYtcODt9fTkVFLQyTsnt2Nq6hpbxB4H22UeM4jkb3Z99wT91NdXgDTljONwPaR+/xnLjvKjpGxGoO07GR8/VGEVdsqlZWNHeVWT/kOuxn7LZ4cyXN6DX3H76qno4Tkaam0EacpMaHktDgVLNPkB6jVNlkpLR0qExpjnEtGx1VeaRAA6/6U2I3NRtQt4A6H99FPbVe8IkfwfwpN15OSpFhhJI1KAxq+z1COARl/U7tmVvxHc8vJZtwgrT08K2zzury2+KLOmE97UNRqKVz1pbMqWhrgh3p7nKMhLEYauTgFyc6ilYjaCCpyjbYLTLwAMYoqjlLCaWKMXsJA15UzaiQsTSFW0ziXOpGGULKmt6kEI0AtMNw41DEaE7rfYFg4oMjdCdlbNuTPlLSdxuD1Cu61wAkk0tsKX0haziBoJXj/AG1x2tSvXFhM+EBu86aADzXqVbEQFj8arUKTjeuph9SnDWbZu8foCDtI132lW6HrIYcrclytUT6npZ5YKnVOyF9w6oxr96XhZnka1soLhlmZk+kQqe7pZXh2+qitbO4bmq1NM7S/JmJ7unDR3pPAudMcSGqwZDqck69SZPpwXn9Qrdo9HC60zN4th73yKbZe74dt95QrcNYyg1rW+PNUL3H4nQ6BJ6ZT7ndai+syacgkGJkEgiORGyqrRmamw8mBnkWANd8wfdV6Wf8Ar4/ZphHll5ekZeta6qC0w/Nw3WqdYApbCzAOy02aO3FsrhaMtmCo/c+FrRoXGfkOqbTxevOj4DgdOWkCPZGdq6M1aQEz3egjwxmdM9fh9l2F4ZDpjQ81k6iUYq39kv3SfpE+F0nvhzySRsT+8QSPQK5NYUv3Y/6+iiu7plBkCC7g3zWcrXb3uB56emYx8isMYOezm7LRwmrmaZ+7Dw+cey1fZvDGOd427/sg/P1WKw2pBEhbjBLyCB80dKVMXJdaHduML7mjnZ8MtnoS4D7oTs7AbP71Wl7VM76wrt3IZnHnT8f2WP7LV81PfoU+dJU0Sw24OyXF2AVC2PETPkCpLK0FMF7uG3UoisGh5qOEk7Dy0CCr1XvMu24AbDyCnDE5u34BlzqC4ryR1nlxJVZeN1VoWoSrSlb1SPOabeweiUQmtpp5KRsKGEJA1OJSBANHZUiXMkQsNFc6jqiKDISqWm1NHIxYokASAJ66EbGaIyxN7tTgJCE3ISgd9PgFo8B7Jd9DnmBxAO6Dw3BXVdQVusFsH0WwXaclaLODm0RTYGN2AhU97XhHXd7G4WfxC5Y7TYrJnmn4NGKINc4o1pl8OA4TEngJ5KuvL6rVuHWtChQyUS11Ws9heGVgAXuzOdl0OgEE+FT2bWPqtAGbKc8EbvaR3Y9Xlg9V2MY/b0KjLYSILpy5ZqPmH1an/p2aPdP06rG5NDZH80kLc1WFrmh2eTL3Hd7uZB4aaDgqWlUDTsB0G/ory7rCP4VUaZJ3j0Cyzk3IvCKSHULuZa7SdpVTToGjWeP7XnN5P205yB8gp7q2bvmk8z9lXuuXbHxAepXQlKDtFoOnZbOoaSE61tTOqqWYkQIkj2P1RAxqNPwAtf5S9M0dxFtiFFhIJAlrcs9JmFRXN8W+GkJM/FEj0UNa5dV3cADw+i6nRA0hw6gafVZJfKXKRGyEWbicz3STx/Knt7IAieH+0TTpiNASOP8AqUTRtRw4pXNnWDU7YDbQcyfwrnD2wRBlRst53CNtaBEfZJ5EbNbh1SW68vks2Ozptaj8o/6XuzMM/AY+B/ITMHy4q2sKjhof5V9b1muGUx1BV6U1TM3JwdoxVZklROAWjxbB4GZkRyAWWuCQYIWiqRmdMR5Q1RybVrISrWU2KTOeoXPUReonVEUg0T94l7xAmomOrqigNQaai5V/9QuR7ZxY0TKLI0QNnsjknEVHBISklIgFjqZVlhNJjnw8TPVVtMKxtbN8yAZHEKkELRvcMw2lSbLdPNDYpi7W7FRd6/uRMgwsnipdvPFS6jK1pF8OJPbCbzGM/FVlS4B3OnLioWNkTx49U2jTzENBAcSACTA1MAlZoxcnS2zU+MUXFvfULOh/U1S4Pqlwoj4gRTGjiAJjM6fNrVicJeLi+c+QRm0BM+AabRporXt5dMc+sxjHuFnTbTZo004bo8vBMzJ3Wa7EkmvJ1kyQBPrO4Xo8eMKX0Zo7k2ei4xRzCG7qiqWVTbMfIAfVWN+/Ua7JoutIAHuVgbVmiNpFV/8AmH+53pKZWoBojgrRzyeQ6Egn5cEDWM+Q489dSg5MoivNrMmNNvVIbYTrq06eRGytjSG3D+EOyho4HUIKYbIBahh01BM+RR1tRnY++n4SNokAcR5ollUN0y676mNOe2qVuzmPbQMbA9diiadv+jRSB+0A68vsVLTLeA19ZSiWdTo8wfX8hTMpxukDXfxGiKbS21j5rgC06jtv35qxsy7ioaFDjCsaACeEWxJSRY0KkiCsn2ra0GAFpw4NErH9rJc7wBxJ4AFbE3VMyuP2ZW4qQhjVVvbdl7qqfgyjm78LQYd/x8N6ryeg0CZY2xGYYOnQankEfaYDc1fhpkDmdF6lYdnreiPCweasmtaNhCssVeQckedWH/HzzrVf6BX9p2HtmbtzHrqtMXphqJ6SO5SYA3s/bgR3Y9kiO7xchaD8jxqgicyRcogT2IUj3Lly5IYJsaLnHwkLe4JbljJc0A8+a5cj9AZX4zipEhZO7ui4OSLl5s23LZ6GOKSGW7zlHks72ouXA02sMODhU1mJaZbMeRXLl7f+P44z6xKXp/0ed+rTcOnbXtf2UVXHKpZcMcc39S8Pe4/EXBxcYPIzt0CvP+PqbTUqAgGGSJ4SY0XLls/WYRhm+KrRL9Pk3i37L6pVd3jjrEmegUheB+f4XLl8yz10PfTnVpA09kHVfBA3gQTHUTouXIDRIW3GYy3YF2+8foUwou1IdAk/NcuQehmRWl5UYTnGY66g5Ty22VjYXbHOIaDm5Oiee44LlyaXsDWixYx54j6eiIFSBDh7GI+S5cpiBdISJBPn/tE0WuHIj95pFyZCMIpkhH2yRcrY/JOXgOdWAEIilQYQDASrl6UUmZp6WibQJpeuXJ2ySQw1EwvXLlJtlUkRueoXVUq5TbZRJEJrrly5LbHo/9k=",
//     body : "THIS IS A BLOG POST"
// });

//RESTFUL ROUTES
app.get("/", function(req, res){
    res.redirect("/blogs");
});

//INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if (err) {
            console.log("ERROR!");
        } else {
            //console.log(blogs);
            res.render("index", {blogs: blogs});
        }
    });
    //res.render("index");
});

//NEW ROUTE
app.get("/blogs/new", function(req, res){
        res.render("new");
    });

//CREATE ROUTE
app.post("/blogs", function(req, res){
    //create blog
    console.log(req.body);
    //req.body.blog.body = req.sanitize(req.body.blog.body)
    console.log("=====================");
    console.log(req.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

//SHOW ROUTE
app.get("/blogs/:id", function(req, res){
  //res.send("SHOW PAGE!"); 
  Blog.findById(req.params.id, function(err, foundBlog){
      if(err) {
          res.redirect("/blogs");
      } else {
          res.render("show", {blog: foundBlog});
      }
  });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    //res.render("edit");
    Blog.findById(req.params.id, function(err, foundBlog){
      if(err) {
          res.redirect("/blogs");
      } else {
          res.render("edit", {blog: foundBlog});
      }
    });
});

//UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    //res.send("UPDATE ROUTE!");
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updateBlog){
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id)
        }
    });
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    //res.send("YOU HAVE REACHED THE DESTROY ROUTE
    //destroy blog and redirect somewhere
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("SERVER IS RUNNING!");
});