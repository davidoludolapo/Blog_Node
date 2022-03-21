const Blog = require("../models/blog");
const fs = require('fs')
const fm = require('formidable')

// const upload = (req, res) =>{
//     let form = new fm.IncomingForm()
//     form.parse(req, (err, body, file)=>{
//         console.log(body);
//         // let picture = file.picture.originalFilename

//         // let oldPath = file.picture.filePath
//         // let newPath = `uploads/${file.picture.originalFilename}`

//         // fs.rename(oldPath, newPath, (err, response)=>{
//         //     if (err) {
//         //         res.render('pages/create', {message: 'Upload failed'})
//         //     } else {
//         //         let formContent = new userModel({body})
//         //     }
//         // })
//     })
// }

const blog_index = (req, res) => {
    Blog.find().sort({
            createdAt: -1
        })
        .then((result) => {
            // console.log(result);
            res.render("blogs/index", {
                title: "All Blogs",
                blogs: result
            });

        })
        .catch((err) => {
            console.log(err);
        });
}
  
const blog_details = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then(result => {
            res.render('blogs/details', {
                blog: result,
                title: 'Blog Details'
            })
        })
        .catch(err => {
            res.status(404).render("404", {
    title: "Blog Not Found"
  });
        })
}

const blog_create_get = (req, res) => {
    res.render("blogs/create", {
        title: "Create a new Blog"
    });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body)
    console.log(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err);
        })
}

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.deleteOne({_id:id})
        .then(result => {
            res.json({
                redirect: '/blogs'
            });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}