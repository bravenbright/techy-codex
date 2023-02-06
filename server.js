const exphbs = require('express-handlebars');
const express = require('express');

const hbs = exphbs.create({});
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// sets handlebars.js as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(require(`./controllers/blog-post-routes`));


app.listen(PORT, () => {
   console.log(`Server listening on PORT ${PORT}`)
});
