const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const mongoose=require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const url="mongodb+srv://shreyanarayan062:Shreya1234@cluster1.g5law4k.mongodb.net/blogDB;";



mongoose.connect(url,{
    useNewUrlParser : true,
    useUnifiedTopology :true,
});

const itemSchema={
    title:String,
    content:String
};

const BlogItem=mongoose.model("BlogItem",itemSchema);


let posts=[];

app.get("/",function(req,res)//by using app.get we can send our response to home route.it means when we get home route send this response 
{

    BlogItem.find()
    .then(function (foundItems) {
      res.render("home", { homeSC: homeStartingContent, newPost: foundItems });
    })
    .catch(function (err) {
      console.error("Error while fetching blog items:", err);
    });
});


app.get("/about",function(req,res)
{
   
    res.render("about",{aboutC:aboutContent})
});


app.get("/contact",function(req,res)
{
    res.render("contact",{contactC:contactContent})
});


app.get("/compose",function(req,res)
{
    res.render("compose");
});


app.post("/compose",function(req,res)
{

    const post= new BlogItem//creating new item of mongoose model Blogitem
    ({
        title: req.body.title,
        content: req.body.postContent,
    });

    post.save();
    res.redirect("/");
});




app.get("/posts/:postId", (req, res) => {
  const requestedPostId = req.params.postId;

  BlogItem.findOne({ _id: requestedPostId })
    .then((post) => {
      if (post) {
        res.render("post", {
          title: post.title,
          content: post.content,
        });
      } else {
        res.status(404).send("Post not found");
      }
    })
    .catch((error) => {
      console.error("Error while fetching post:", error);
      res.status(500).send("Internal Server Error");
    });
});

  
app.listen(3006, function() {
  console.log("Server started on port 3006");
});




// app.get("/posts/:postId",function(req,res)
// {
//     const requestedPostId=(req.params.postId);//converting to lowercase using lodash 
    
//     posts.findOne({_id: requestedPostId}, function(err, post){
//         res.render("post", {
//           title: post.title,
//           content: post.content
//         });
//       });
    
//     });