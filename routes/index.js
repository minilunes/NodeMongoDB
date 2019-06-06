
module.exports = function (app, db) {
  var ObjectID = require('mongodb').ObjectID;


  /* GET SPA pure  html, our jQuery Mobile app */
  app.get('/', function (req, res) {
    res.sendFile('mySPA.html', { root: __dirname });
  });
  
    app.get('/toollist', async function (req, res) {
      try {
      var data = await db.collection('ToolCollection').find().toArray();
       res.send(data);
      }
      catch (err) {
        console.log('get all failed');
        console.error(err);
      }
    });


  function compare(a, b) {
    if (a.Category < b.Category) {
      return -1;
    }
    if (a.Category > b.Category) {
      return 1;
    }
    return 0;
  }

  app.post('/addTool/', (req, res) => {
    const tool = {
      Name: req.body.Name,
      Category: req.body.Category,
      Description: req.body.Description
    };
    db.collection('ToolCollection').insertOne(tool, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send("toollist");
      }
    });
});


  app.get('/findtool/:id', (req, res) => {    // was app.post)
    const theName = { Name: req.params.id };
    db.collection('ToolCollection').findOne( theName, (err, item) => {
      if (err) {
        console.log('error');
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(item)
      };
    });
  });

  app.put('/updateTool/:id', (req, res) => {
    const what_id = req.params.id;
    const tool = req.body;
    const updateName = tool.Name;
    const updateCategory = tool.Category;
    const updateDescription = tool.Description;

    db.collection('ToolCollection').updateOne({ Name: what_id }, { $set:
       { 
         Name: updateName,
         Category: updateCategory, 
         Description: updateDescription }
         }, (err, result) => {
        if (err) {
            res.send({ 'error': 'An error has occurred' });
        } else {
            res.send(tool);
        }
    });
});

  app.delete('/deleteTool/:id', (req, res) => {
    let theName = req.params.id;
    console.log(theName + ' to delete');
    let which = { 'Name': theName };
    db.collection('ToolCollection').deleteOne(which, (err, tool) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send("Tool " + theName + "deleted");
      }
      });
  })
};
