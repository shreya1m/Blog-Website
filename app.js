const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const mongoose=require("mongoose");

const homeStartingContent = "Welcome to DAILY JOURNAL, your online destination for all things blogging. We're thrilled to have you here, and we want to let you know that this is not just a place to read blogs , it's a platform where you can unleash your creativity and compose your own stories.";
const aboutContent = "Here at The Thoughtful Trail, where words meet passion and curiosity knows no bounds, I'm Shreya, the writer behind this digital canvas. I'm thrilled that you've found your way here.At The Thoughtful Trail, our mission is to delve into the beauty of Day 1 experiences, the wonders of nature, and more through the art of storytelling. Our blog reflects our insatiable curiosity about the world and our desire to inspire positive change through the stories we tell.What sets us apart is our unique perspective. We firmly believe that every story is worth telling, every voice is worth hearing, and every experience is worth sharing. We aim to provide a fresh, authentic take on the excitement of Day 1 moments, the serenity of nature, and the profound connections between the two. Our hope is that you'll not only be informed and inspired but also eager to join the conversation.We invite you to embark on this thoughtful journey with us as we explore the uncharted territories of life's beginnings and the timeless beauty of the natural world.Thank you for choosing to walk The Thoughtful Trail with us.";


const contactContent = "Have a question, a suggestion, or just want to say hello? We'd love to hear from you. Feel free to reach out to us at shreya12@gmail.com or connect on Instagram,Facebook etc. Your feedback and insights are valuable to us.Thank you for being here, and we cant wait to share more stories, knowledge, and inspiration with you. THE THOUGHFUL TRAIL is more than a blog; it's a place where dreams take flight and stories find their voice.Warmest regards,Shreya.";


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
