# some header

### another header 

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

**this is a list:**
- first item
- second item
- third item
  - otheri items
  - some other items
    - also some other items
    - another item

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

| Syntax | Description | someheader |
| --------- | --------- | --------- |
| Header | Title |
| Paragraph | Text |

term
: definition and some text 

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>

https://www.youtube.com/watch?v=kPRA0W1kECg&t=263s

<a href="http://www.youtube.com/watch?feature=player_embedded&v=fWubJgIWyxQ
" target="_blank"><img src="http://img.youtube.com/vi/fWubJgIWyxQ/0.jpg"
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/fWubJgIWyxQ/0.jpg)](http://www.youtube.com/watch?v=fWubJgIWyxQ)