# some header

### another header 

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

**this is a list:**
- first item
- second item
- third item

`app.post('/location/delete/:id', function (req,res){
const id = req.params.id;
const rev = req.body.rev;
    couch.del(dbName, id, rev).then(
        function (data, headers, status){
            res.redirect('/');
        },
        function (err){
            res.send(err);
        });
});`