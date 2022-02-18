const indexCtrl = {}

indexCtrl.renderIndex = (req,res) => {
    res.render('index')
}
indexCtrl.renderHome = (req,res) => {
    res.render('home')
}

indexCtrl.renderAbout = (req,res) => {
    res.render('about')
}

module.exports = indexCtrl